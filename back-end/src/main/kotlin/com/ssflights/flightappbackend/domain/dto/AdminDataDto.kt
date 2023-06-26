package com.ssflights.flightappbackend.domain.dto

data class AdminDataDto(
    val totalMoneySpent: Double,
    val avgFlightCost: Double,
    val totalFlightsBooked: Long,
    val mostPopularDestination: String,
    val flightsInLastMonth: Int,
    val avgFlightTime: String,
    val mostExpensiveFlight: Double,
    val totalUsers: Long,
)
