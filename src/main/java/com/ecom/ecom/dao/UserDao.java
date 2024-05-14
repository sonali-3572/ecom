package com.ecom.ecom.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecom.ecom.entities.User;

public interface UserDao extends JpaRepository<User,Long>{
	Optional<User> findByUsernameAndUserType(String username, String userType);
	
	 @Query("SELECT COUNT(u) FROM User u WHERE u.userType = 'customer'")
	 Long countUserByUserType();
}
