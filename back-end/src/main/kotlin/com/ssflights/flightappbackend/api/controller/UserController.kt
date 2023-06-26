package com.ssflights.flightappbackend.api.controller

import com.ssflights.flightappbackend.domain.dto.ContactForm
import com.ssflights.flightappbackend.domain.dto.RegistrationRequest
import com.ssflights.flightappbackend.domain.dto.UserInfoDto
import com.ssflights.flightappbackend.domain.dto.UserRequest
import com.ssflights.flightappbackend.service.*
import org.springframework.http.ResponseEntity
import org.springframework.mail.SimpleMailMessage
import org.springframework.security.core.GrantedAuthority
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping(path = ["/api"])
@CrossOrigin(origins = arrayOf("http://localhost:4200"))
class UserController(
    private val registrationService: RegistrationService,
    private val userService: UserService,
    private val passwordEncoder:PasswordEncoder,
    private val loginService: LoginService,
    private val emailService: EmailService,
    ) {

    private val jwt: JwtUtils = JwtUtils

    @PostMapping("/registration")
    fun register(@RequestBody request: RegistrationRequest): ResponseEntity<String> {

        return registrationService.register(request)

    }

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: UserRequest): ResponseEntity<Map<String,String>> {

       return loginService.authenticate(loginRequest)

    }

    @GetMapping("/{username}")
    fun getUser(@PathVariable username:String):UserInfoDto{

        var user = userService.userRepository.findByUsername(username).get()
        var returnedUserInfoDto = UserInfoDto(user.username,user.getEmail(),user.getName(),user.getSurname())

        return returnedUserInfoDto
    }

    @GetMapping("/role/{username}")
    fun getRole(@PathVariable username: String): ResponseEntity<GrantedAuthority> {
        val user = userService.userRepository.findByUsername(username)
        return if(user.isPresent) {
            ResponseEntity.ok(user.get().authorities.first())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping("/send-email")
    fun sendEmail(@RequestBody form: ContactForm) {
        val message = SimpleMailMessage()
        message.setFrom("ssflights2023@gmail.com")
        message.setTo("ssflights2023@gmail.com")
        message.setSubject("New Contact Form Submission")
        message.setText(
            """
            Name: ${form.name}
            Surname: ${form.surname}
            Email: ${form.email}
            
            Message:
            ${form.message}
            """
        )

        try {
             emailService.javaMailSender.send(message)

            // Email sent successfully

            println("Email sent!")

        } catch (ex: Exception) {

            println("Error sending email: ${ex.message}")

        }

    }

    @GetMapping(path = ["confirm"])
    fun confirm(@RequestParam("token") token: String): String {
        TODO("Using the UUID token from signUp confirm email")
    }

}



