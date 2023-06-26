package com.ssflights.flightappbackend.domain.dto

data class ContactForm(
    val name: String,
    val surname:String,
    val email: String,
    val message: String
)