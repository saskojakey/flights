package com.ssflights.flightappbackend.service

import com.ssflights.flightappbackend.domain.Booking
import com.ssflights.flightappbackend.domain.Flight
import com.ssflights.flightappbackend.domain.MyTrip
import com.ssflights.flightappbackend.domain.Payment
import com.ssflights.flightappbackend.domain.dto.BookFlightPayload
import com.ssflights.flightappbackend.domain.dto.FlightDto
import com.ssflights.flightappbackend.repository.BookingRepository
import com.ssflights.flightappbackend.repository.FlightRepository
import com.ssflights.flightappbackend.repository.MyTripRepository
import com.ssflights.flightappbackend.repository.PaymentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service


@Service
class FlightService(
    @Autowired
    private val flightRepository: FlightRepository,
    private val bookingRepository: BookingRepository,
    private val paymentRepository: PaymentRepository,
    private val myTripRepository: MyTripRepository,
    private val userService: UserService,
    private val emailService: EmailService
) {
    fun saveFlight(request:FlightDto):ResponseEntity<String>{

        var savedFlight = Flight(
            request.fromDestination,
            request.toDestination,
            request.boardingDate,
            request.returnDate,
            request.boardingTime,
            request.returnTime,
            request.flightTime,
            request.stops,
            request.price,
            request.flightNumber,
            false
        )

        if(!flightRepository.findFlightByFlightNumber(savedFlight.flightNumber).isPresent){
            flightRepository.save(savedFlight)
        }
        return ResponseEntity.ok("{\"message\": \"Save flight method.\"}")
    }

    fun bookingLogic(payload:BookFlightPayload):ResponseEntity<String>{

        var request = payload.flightDto

        var availableSeats = 140;

        if(userService.userRepository.findByUsername(payload.user).isPresent){

            var user = userService.userRepository.findByUsername(payload.user).get()

            var savedFlight = Flight(
                request.fromDestination,
                request.toDestination,
                request.boardingDate,
                request.returnDate,
                request.boardingTime,
                request.returnTime,
                request.flightTime,
                request.stops,
                request.price,
                request.flightNumber,
                false
            )


            if(flightRepository.findFlightByFlightNumber(request.flightNumber).isPresent){

                if(flightRepository.findFlightByFlightNumber(request.flightNumber).get().isBooked){

                    return ResponseEntity.badRequest().body("{\"message\": \"Flight is fully booked !\"}")

                }

            }
            else {

                flightRepository.save(savedFlight)

            }

            var booking = Booking(user,flightRepository.findFlightByFlightNumber(request.flightNumber).get())

            var payment = Payment(savedFlight.price,booking)

            bookingRepository.save(booking)

            paymentRepository.save(payment)

            emailService.sendBookingConfirmationEmail(user.getEmail(),payload)

            return ResponseEntity.ok().body("{\"message\": \"Flight booked successfully.\"}");

        }else{

            return ResponseEntity.badRequest().body("{\"message\": \"User is not registered!\"}")

        }

    }

    fun saveFlightToMyTrips(payload:BookFlightPayload):ResponseEntity<String>{

        saveFlight(payload.flightDto)

        var user = userService.userRepository.findByUsername(payload.user).get()

        var myTrip = MyTrip(user,flightRepository.findFlightByFlightNumber(payload.flightDto.flightNumber).get())

        myTripRepository.save(myTrip)

        return ResponseEntity.ok("{\"message\": \"Saved to my trips.\"}")

    }

}