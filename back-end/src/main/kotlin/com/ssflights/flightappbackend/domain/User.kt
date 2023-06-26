package com.ssflights.flightappbackend.domain

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "users")
class User : UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var userId: Long? = null

    @Column(unique = true)
    private var username: String? = null
    private var password: String? = null
    var name: String? = null
    var surname: String? = null
    var email: String? = null

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_role_junction",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")]
    )
    private var authorities: MutableList<Role?> = mutableListOf()


    constructor() : super() {
        authorities = mutableListOf()
    }


    constructor( username: String?, password: String?,surname: String?,email: String?,name: String?, authorities: MutableList<Role?>) : super() {
        this.username = username
        this.password = password
        this.name = name
        this.surname = surname
        this.email = email
        this.authorities = authorities

    }


    fun setAuthorities(authorities: MutableList<Role?>) {

        this.authorities = authorities

    }

    override fun getAuthorities(): Collection<GrantedAuthority?> {

        return authorities

    }

    override fun getPassword(): String {

        return password!!

    }

    @JvmName("getEmail1")
    fun getEmail(): String {

        return email!!

    }

    @JvmName("getName1")
    fun getName(): String {

        return name!!

    }

    @JvmName("getSurname1")
    fun getSurname(): String {

        return surname!!

    }

    fun setPassword(password: String?) {

        this.password = password

    }

    override fun getUsername(): String {

        return username!!

    }

    fun setUsername(username: String?) {

        this.username = username

    }

    /* If you want account locking capabilities create variables and ways to set them for the methods below */
    override fun isAccountNonExpired(): Boolean {
        // TODO Auto-generated method stub
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        // TODO Auto-generated method stub
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        // TODO Auto-generated method stub
        return true
    }

    override fun isEnabled(): Boolean {
        // TODO Auto-generated method stub
        return true
    }
}