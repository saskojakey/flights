package com.ssflights.flightappbackend.domain.dto


class UserInfoDto(
) {
    constructor(username: String, email: String, name: String, surname: String) : this() {
        this.username = username
        this.email = email
        this.name = name
        this.surname = surname
    }

    var username: String = ""

    var email: String = ""

    var name: String = ""

    var surname: String = ""

    // UserInfoDto is UserDto class without password
}