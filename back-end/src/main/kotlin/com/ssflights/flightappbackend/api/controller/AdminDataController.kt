package com.ssflights.flightappbackend.api.controller

import com.ssflights.flightappbackend.domain.dto.AdminDataDto
import com.ssflights.flightappbackend.service.AdminDataService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/api/admin"])
@CrossOrigin(origins = arrayOf("http://localhost:4200"))
class AdminDataController(
    private val adminDataService: AdminDataService,
) {
    @GetMapping()
    fun getAdminData(): ResponseEntity<AdminDataDto> {
        return adminDataService.getAdminDataStats()
    }
}