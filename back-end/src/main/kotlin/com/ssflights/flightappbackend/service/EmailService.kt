package com.ssflights.flightappbackend.service

import com.ssflights.flightappbackend.domain.dto.BookFlightPayload
import com.ssflights.flightappbackend.domain.dto.RegistrationRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service


@Service
class EmailService {

    @Autowired
    lateinit var javaMailSender: JavaMailSender

    fun sendBookingConfirmationEmail(email: String, bookingDetails: BookFlightPayload) {

        val message = SimpleMailMessage()

        message.setTo(email)

        message.setSubject("Booking Confirmation")

        message.setText("Dear ${bookingDetails.user},\n" +
                "\nYour booking for" +
                " ${bookingDetails.flightDto.fromDestination} " +
                "- ${bookingDetails.flightDto.toDestination}  " +
                "has been confirmed.\n" +
                "\nThank you for using our flight booking service!\n" +
                "\nYou have paid us ${bookingDetails.flightDto.price} EUR")

        javaMailSender.send(message)

    }

    fun registrationConfirmed(registrationRequest: RegistrationRequest) {

        var email = registrationRequest.email

        val message = SimpleMailMessage()

        message.setTo(email)

        message.setSubject("Registration Confirmation")
        message.setText("Dear ${registrationRequest.name},\n" +
                "\nThank you for creating an account.\n" +
                "\nThank you for using our flight booking service!")
        javaMailSender.send(message)
    }


}