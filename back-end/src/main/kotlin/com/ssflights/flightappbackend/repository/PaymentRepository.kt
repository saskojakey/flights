package com.ssflights.flightappbackend.repository

import com.ssflights.flightappbackend.domain.Payment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface PaymentRepository : JpaRepository<Payment, Long> {
}