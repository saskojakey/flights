package com.ssflights.flightappbackend.service

import com.ssflights.flightappbackend.domain.Role
import com.ssflights.flightappbackend.domain.User
import com.ssflights.flightappbackend.domain.dto.RegistrationRequest
import com.ssflights.flightappbackend.repository.RoleRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service


@Service
class RegistrationService(
    private val userService: UserService,
    private val roleRepository: RoleRepository,
    private val emailService: EmailService
) {
    fun register(request: RegistrationRequest): ResponseEntity<String> {

        val isValidEmail = true

        if (!isValidEmail) {

            throw IllegalStateException("email not valid")

        }

        val userRole: Role = roleRepository.findByAuthority("USER")!!.get()

        val authorities= mutableListOf<Role?>()

        authorities.add(userRole)

        val token = userService.signUp(
            User(request.username,
                request.password,
                request.surname,
                request.email,
                request.name,
                authorities
            )
        )

        emailService.registrationConfirmed(request)

        return token
    }
}
