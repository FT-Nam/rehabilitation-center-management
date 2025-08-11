package com.hinnova.rehabilitation_center_management.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {

    @Builder.Default
    int code = 1000; // 1000 = success, các mã khác tuỳ quy ước
    String message;
    T value;
    PaginationInfo paginationInfo;

}
