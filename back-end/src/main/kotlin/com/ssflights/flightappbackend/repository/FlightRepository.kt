package com.ssflights.flightappbackend.repository

import com.ssflights.flightappbackend.domain.Flight
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface FlightRepository : JpaRepository<Flight, Int> {

    fun findFlightByFlightNumber(string:String):Optional<Flight>

    fun findFlightByFlightId(id:Long):Optional<Flight>

    @Query("SELECT to_destination FROM flights GROUP BY to_destination ORDER BY COUNT(*) DESC LIMIT 1", nativeQuery = true)
    fun findMostPopularDestination(): Optional<String>

}