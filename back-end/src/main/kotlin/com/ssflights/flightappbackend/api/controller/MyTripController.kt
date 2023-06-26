package com.ssflights.flightappbackend.api.controller

import com.ssflights.flightappbackend.domain.Flight
import com.ssflights.flightappbackend.repository.BookingRepository
import com.ssflights.flightappbackend.repository.FlightRepository
import com.ssflights.flightappbackend.repository.MyTripRepository
import com.ssflights.flightappbackend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(path = ["/api/mytrips"])
@CrossOrigin(origins = arrayOf("http://localhost:4200"))
class MyTripController(
    @Autowired
    private val myTripRepository: MyTripRepository,
    private val flightRepository: FlightRepository,
    private val userRepository:UserRepository,
    private val bookingRepository: BookingRepository
) {
    @GetMapping("/{username}")
    fun getFlightsByUserId(@PathVariable username: String): List<Flight> {

        val userId = userRepository.findByUsername(username).get().userId!!

        val myTrips = myTripRepository.findAllyByUserUserId(userId)
        val flights = mutableListOf<Flight>()

        myTrips.forEach { myTrip ->
            val flight = flightRepository.findById(myTrip.get().flight!!.flightId!!.toInt()).orElse(null)
            flight?.let { flights.add(it) }
        }
        return flights
    }
    @GetMapping("/bookings/{username}")
    fun getBookedFlights(@PathVariable username: String): List<Flight> {

        val userId = userRepository.findByUsername(username).get().userId!!

        val bookedFlights = bookingRepository.findAllyByUserUserId(userId)
        val flights = mutableListOf<Flight>()

        bookedFlights.forEach { myBooking ->
            val flight = flightRepository.findById(myBooking.get().flight!!.flightId!!.toInt()).orElse(null)
            flight?.let { flights.add(it) }
        }
        return flights
    }

    @DeleteMapping("/delete/{flightId}/{username}")
    fun deleteMethodSashko(@PathVariable flightId: Long,@PathVariable username:String): ResponseEntity<Void> {
        var userId = userRepository.findByUsername(username).get().userId!!
        return myTripRepository.findByFlightFlightIdAndUserUserId(flightId,userId).map { myTrip ->
            myTripRepository.delete(myTrip)
            ResponseEntity<Void>(HttpStatus.NO_CONTENT)
        }.orElse(ResponseEntity.notFound().build())
    }
 }
