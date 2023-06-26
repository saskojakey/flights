package com.ssflights.flightappbackend.domain



import jakarta.persistence.*

@Entity
@Table(name="payments")
class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val paymentId: Long? = null;

    var amount: Double = 0.0

    @OneToOne(fetch = FetchType.LAZY)
    var booking: Booking? = null

    constructor(amount:Double,booking:Booking
    ) :this(){
        this.amount = amount
        this.booking = booking
    }

    constructor()


}