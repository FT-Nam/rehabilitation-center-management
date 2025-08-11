package com.hinnova.rehabilitation_center_management.service.impl;

import com.hinnova.rehabilitation_center_management.dto.request.LoginRequest;
import com.hinnova.rehabilitation_center_management.dto.response.LoginResponse;
import com.hinnova.rehabilitation_center_management.entity.Permission;
import com.hinnova.rehabilitation_center_management.entity.Role;
import com.hinnova.rehabilitation_center_management.entity.User;
import com.hinnova.rehabilitation_center_management.exception.AppException;
import com.hinnova.rehabilitation_center_management.exception.ErrorCode;
import com.hinnova.rehabilitation_center_management.repository.UserRepository;
import com.hinnova.rehabilitation_center_management.service.AuthService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.jwt.secret}")
    private String signerKey;

    @Value("${app.jwt.access-token-validity:36000}")
    private Long validDuration;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.USER_NOT_FOUND);
                });

        boolean authenticated = passwordEncoder.matches(request.password(), user.getPassword());
        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }


        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .distinct()
                .toList();

        List<String> permissions = user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(Permission::getName)
                .distinct()
                .toList();



        String token = generateToken(user, roles, permissions);

        return new LoginResponse(token);
    }

    private String generateToken(User user, List<String> roles, List<String> permissions) {
        try {
            JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

            JWTClaimsSet.Builder claimsSet = new JWTClaimsSet.Builder()
                    .subject(user.getUsername())
                    .issuer("rehabilitation-center.com")
                    .issueTime(new Date())
                    .expirationTime(Date.from(Instant.now().plus(validDuration, ChronoUnit.SECONDS)))
                    .jwtID(UUID.randomUUID().toString())
                    .claim("roles", roles)
                    .claim("permissions", permissions);

            JWTClaimsSet jwtClaimsSet = claimsSet.build();

            com.nimbusds.jose.Payload payload = new com.nimbusds.jose.Payload(jwtClaimsSet.toJSONObject());

            JWSObject jwsObject = new JWSObject(header, payload);

            jwsObject.sign(new MACSigner(signerKey));

            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Cannot create token", e);
        }
    }
}
