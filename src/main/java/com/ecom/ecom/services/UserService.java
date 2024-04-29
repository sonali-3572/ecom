package com.ecom.ecom.services;

import com.ecom.ecom.entities.User;

public interface UserService {
	public User createUser(User user);
	public String loginDetail(User user);
}
