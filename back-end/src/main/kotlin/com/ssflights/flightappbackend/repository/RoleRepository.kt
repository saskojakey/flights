package com.ssflights.flightappbackend.repository

import com.ssflights.flightappbackend.domain.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface RoleRepository : JpaRepository<Role?, Int?> {

    fun findByAuthority(authority: String?): Optional<Role?>?

}