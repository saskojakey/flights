package com.ssflights.flightappbackend.domain

import jakarta.persistence.*

@Entity
class MyTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null

    @ManyToOne
     var user: User? = null

    @ManyToOne
     var flight: Flight? = null

    constructor(user:User,flight:Flight
    ) :this(){
        this.user = user
        this.flight = flight
    }

    constructor()


}