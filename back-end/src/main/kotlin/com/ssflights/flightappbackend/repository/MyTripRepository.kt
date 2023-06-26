package com.ssflights.flightappbackend.repository

import com.ssflights.flightappbackend.domain.MyTrip
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface MyTripRepository : JpaRepository<MyTrip,Long> {

    fun findAllyByUserUserId(id:Long): MutableList<Optional<MyTrip>>

    fun deleteByFlightAndUser(flightId:Long,userId:Long)

    fun findByFlightFlightIdAndUserUserId(flightId:Long,userId:Long):Optional<MyTrip>

}