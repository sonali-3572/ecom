package com.ecom.ecom.entities;

import java.sql.Date;
import java.util.Random;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="userdetails")
public class UserDetail {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "background_color", length = 50)
    private String backgroundColor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

	public UserDetail() {
		super();
	}

	public UserDetail(Long userId, String fullName, Date dateOfBirth, String address, String email,
			String backgroundColor, User user) {
		super();
		this.userId = userId;
		this.fullName = fullName;
		this.dateOfBirth = dateOfBirth;
		this.address = address;
		this.email = email;
		this.backgroundColor = generateRandomBackgroundColor();
		this.user = user;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "UserDetails [userId=" + userId + ", fullName=" + fullName + ", dateOfBirth=" + dateOfBirth
				+ ", address=" + address + ", email=" + email + ", backgroundColor=" + backgroundColor + ", user="
				+ user + "]";
	}
    
	public String generateRandomBackgroundColor() {
        Random random = new Random();
        String[] colors = {"#FF5733", "#33FF57", "#5733FF", "#33B5FF", "#B533FF","#F5F5DC","#FFE4C4","#F0FFFF","#FFD700"}; 
        return colors[random.nextInt(colors.length)];
    }
}
