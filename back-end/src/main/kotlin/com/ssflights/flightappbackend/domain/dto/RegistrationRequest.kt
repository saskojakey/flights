package com.ssflights.flightappbackend.domain.dto

import jakarta.persistence.*

class RegistrationRequest
{

    var username: String = ""

    var name: String = ""

    var surname: String = ""

    var email: String = ""

    var password: String = ""


}