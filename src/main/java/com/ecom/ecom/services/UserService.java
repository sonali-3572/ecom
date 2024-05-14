package com.ecom.ecom.services;

import org.springframework.http.ResponseEntity;

import com.ecom.ecom.entities.User;

public interface UserService {
	public User createUser(User user);
	public ResponseEntity<?> loginDetail(User user);
	public String getUsername(Long userId);
	public Long getUserCount();
}
