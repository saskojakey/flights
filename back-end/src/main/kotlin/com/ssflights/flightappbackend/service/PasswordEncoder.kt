package com.ssflights.flightappbackend.service

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Configuration
class PasswordEncoder {

    @Bean
    @Primary
    fun encode(): BCryptPasswordEncoder {

        return BCryptPasswordEncoder()

    }
}