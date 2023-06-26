package com.ssflights.flightappbackend.service
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import java.util.*


object JwtUtils {

    private val secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256)

    fun generateToken(username: String): String {

        val currentTimeMillis = System.currentTimeMillis()

        val expirationTimeMillis = currentTimeMillis + 3600000 // 1 hour

        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(Date(currentTimeMillis))
            .setExpiration(Date(expirationTimeMillis))
            .signWith(secretKey)
            .compact()
    }
}