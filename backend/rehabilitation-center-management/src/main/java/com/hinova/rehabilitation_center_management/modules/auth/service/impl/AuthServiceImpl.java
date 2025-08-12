package com.hinova.rehabilitation_center_management.modules.auth.service.impl;

import com.hinova.rehabilitation_center_management.modules.auth.dto.request.LoginRequest;
import com.hinova.rehabilitation_center_management.modules.auth.dto.response.LoginResponse;
import com.hinova.rehabilitation_center_management.modules.auth.entity.Permission;
import com.hinova.rehabilitation_center_management.modules.auth.entity.Role;
import com.hinova.rehabilitation_center_management.modules.user.entity.User;
import com.hinova.rehabilitation_center_management.shared.exception.AppException;
import com.hinova.rehabilitation_center_management.shared.exception.ErrorCode;
import com.hinova.rehabilitation_center_management.modules.user.repository.UserRepository;
import com.hinova.rehabilitation_center_management.modules.auth.service.AuthService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
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
