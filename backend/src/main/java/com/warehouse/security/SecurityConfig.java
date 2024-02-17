package com.warehouse.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> corsConfigurationSource())
                .authenticationProvider(authenticationProvider)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((requests) -> {
                    requests
                            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/v1/auth/authenticate").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/reservations/**", "/api/v1/products/**", "/api/v1/clients/**").hasAnyAuthority("USER",
                                    "VIEWER", "ADMIN")
                            .requestMatchers(HttpMethod.POST, "/api/v1/reservations", "/api/v1/products", "/api/v1/clients").hasAnyAuthority("USER"
                                    , "ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/v1/reservations/**", "/api/v1/products/**", "/api/v1/clients/**").hasAnyAuthority("USER",
                                    "ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/v1/reservations/**", "/api/v1/products/**", "/api/v1/clients/**").hasAnyAuthority(
                                    "USER", "ADMIN")
                            .requestMatchers(HttpMethod.PATCH, "/api/v1/reservations/**", "/api/v1/products/**", "/api/v1/clients/**").hasAnyAuthority("USER"
                                    , "ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/v1/accounts/{username}").access(new WebExpressionAuthorizationManager(
                                    "hasAuthority('ADMIN') or authentication.name == #username"))
                            .requestMatchers(HttpMethod.GET, "/api/v1/accounts").hasAuthority("ADMIN")
                            .requestMatchers(HttpMethod.GET, "/api/v1/accounts/{username}").access(new WebExpressionAuthorizationManager(
                                    "hasAuthority('ADMIN') or authentication.name == #username"))
                            .requestMatchers(HttpMethod.POST, "/api/v1/accounts").hasAuthority("ADMIN")
                            .requestMatchers(HttpMethod.PATCH, "/api/v1/accounts/**").hasAuthority("ADMIN");
                });
        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(System.getProperty("frontend_url")));
        configuration.setAllowedHeaders(Arrays.asList(
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.ACCEPT,
                HttpHeaders.ORIGIN
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
