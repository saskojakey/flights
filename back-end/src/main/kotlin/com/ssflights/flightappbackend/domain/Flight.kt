package com.ssflights.flightappbackend.domain

import jakarta.persistence.*

@Entity
@Table(name="flights")
class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val flightId: Long? = null;

    @Column(name="boarding_date")
    var boardingDate: String = ""

    @Column(name="return_date")
    var returnDate: String = ""

    @Column(name="boarding_time")
    var boardingTime: String = ""

    @Column(name="return_time")
    var returnTime: String = ""

    @Column(name="flight_time")
    var flightTime: String = ""

    var stops: Int = 0

    var price: Double = 0.0

    var fromDestination: String =""

    var toDestination: String=""

    var flightNumber:String = ""

    var isBooked:Boolean = false


    constructor( fromDestination:String,
                 toDestination:String,
                 boardingDate: String,
                 returnDate: String,
                 boardingTime: String,
                 returnTime: String,
                 flightTime: String,
                 stops:Int,
                 price:Double,
                 flightNumber:String,
                 isBooked:Boolean
                ) :this(){
        this.boardingDate = boardingDate;
        this.returnDate = returnDate;
        this.boardingDate = boardingDate;
        this.boardingTime = boardingTime;
        this.returnTime = returnTime;
        this.flightTime = flightTime;
        this.stops = stops;
        this.price = price;
        this.fromDestination = fromDestination
        this.toDestination = toDestination
        this.flightNumber = flightNumber
        this.isBooked = isBooked
    }

    constructor()

}