package com.ssflights.flightappbackend.api.config


import com.ssflights.flightappbackend.service.PasswordEncoder
import com.ssflights.flightappbackend.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.security.servlet.PathRequest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.WebSecurityConfigurer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity


@Configuration
@EnableWebSecurity
class WebSecurityConfig(
    @Autowired
    private val userService: UserService,
    private val passwordEncoder:PasswordEncoder
) : WebSecurityConfigurer<WebSecurity> {


    @Throws(Exception::class)
    fun configure(http: HttpSecurity) {
        http.authorizeRequests()
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll() // Allow static resources
            .anyRequest().permitAll()
            .and().csrf().disable()
            .headers().frameOptions().disable()
    }


    @Throws(Exception::class)
    override fun configure(web: WebSecurity) {
        web.ignoring()
            .anyRequest()
    }


    @Throws(Exception::class)
    fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userService)
    }


    @Bean
    fun authenticationProvider(): DaoAuthenticationProvider {
        var auth: DaoAuthenticationProvider = DaoAuthenticationProvider()
        auth.setUserDetailsService(userService)
        return auth
    }

    @Bean
    @Throws(Exception::class)
    fun authenticationManager(authConfiguration: AuthenticationConfiguration): AuthenticationManager {
        return authConfiguration.authenticationManager

    }

    override fun init(builder: WebSecurity?) {
        // TODO()
    }


}
