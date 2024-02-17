package com.warehouse.security;


import com.warehouse.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final AccountRepository accountRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return accountRepository::findByUsername;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public FilterRegistrationBean<ShallowEtagHeaderFilter> shallowEtagHeaderFilter() {
//        FilterRegistrationBean<ShallowEtagHeaderFilter> filterRegistrationBean
//                = new FilterRegistrationBean<>(new ShallowEtagHeaderFilter());
//        filterRegistrationBean.addUrlPatterns("/api/*");
//        filterRegistrationBean.setName("etagFilter");
//        return filterRegistrationBean;
//    }
}

