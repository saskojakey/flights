package com.ssflights.flightappbackend.domain.dto

class UserDto(
) {
    constructor(username: String, email: String, name: String, surname: String,password: String) : this() {
        this.username = username
        this.email = email
        this.name = name
        this.surname = surname
        this.password = password
    }

    var username: String = ""

    var email: String = ""

    var name: String = ""

    var surname: String = ""

    var password: String = ""

}