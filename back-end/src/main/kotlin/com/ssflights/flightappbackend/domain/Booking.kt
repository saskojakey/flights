package com.ssflights.flightappbackend.domain


import jakarta.persistence.*

@Entity
@Table(name="bookings")
class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val bookingId: Long? = null;

    @ManyToOne(fetch = FetchType.LAZY)
    var user: User? = null

    @ManyToOne(fetch = FetchType.LAZY)
    var flight: Flight? = null

    var numberOfSeats: Int = 140


    @OneToOne(mappedBy = "booking", cascade = [CascadeType.ALL])
    var payment: Payment? = null

    constructor(user:User,flight:Flight
    ) :this(){
        this.user = user
        this.flight = flight
        this.payment = null
        this.numberOfSeats = numberOfSeats
    }

    constructor()

}