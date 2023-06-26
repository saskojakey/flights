package com.ssflights.flightappbackend.repository
import com.ssflights.flightappbackend.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface UserRepository : JpaRepository<User,Int>  {

    fun findByUsername(username: String):Optional<User>

    fun findByEmail(email: String): Optional<User>

    fun findByUserId(id:Long):Optional<User>
}