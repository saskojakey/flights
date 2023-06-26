package com.ssflights.flightappbackend.repository

import com.ssflights.flightappbackend.domain.Booking
import com.ssflights.flightappbackend.domain.Flight
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface BookingRepository : JpaRepository<Booking,Long> {

    fun getBookingByFlight(flight:Flight): Optional<Booking>

    fun findAllyByUserUserId(id:Long): MutableList<Optional<Booking>>

}