package com.ssflights.flightappbackend.domain.dto

class FlightDto(
) {
    constructor(
        fromDestination: String,
        toDestination: String,
        boardingDate: String,
        returnDate: String,
        boardingTime: String,
        returnTime: String,
        flightTime: String,
        stops: Int,
        price: Double,
        flightNumber: String
    ) : this() {
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
    }
    var boardingDate = "";
    var returnDate = "";
    var boardingTime = "";
    var returnTime = "";
    var flightTime = "";
    var stops = 0
    var price = 0.0
    var fromDestination: String = ""
    var toDestination: String = ""
    var flightNumber = ""
}