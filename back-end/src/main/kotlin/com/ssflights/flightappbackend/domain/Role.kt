package com.ssflights.flightappbackend.domain

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority


@Entity
@Table(name = "roles")
class Role : GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id")
    var roleId: Int? = null
    private var authority: String? = null

    constructor() : super() {}

    constructor(authority: String?) {
        this.authority = authority
    }

    constructor(roleId: Int?, authority: String?) {
        this.roleId = roleId
        this.authority = authority
    }

    override fun getAuthority(): String {
        // TODO Auto-generated method stub
        return authority!!
    }

    fun setAuthority(authority: String?) {
        this.authority = authority
    }

}
