package com.ecom.ecom.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.ecom.dao.UserDao;
import com.ecom.ecom.entities.User;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDao userDao;

	public UserServiceImpl() {
		
	}
	
	@Override
	public User createUser(User user) {
		return userDao.save(user);
	}

	@Override
	public String loginDetail(User user) {
		Optional<User> userOptional=userDao.findByUsernameAndUserType(user.getUsername(),user.getUserType());
		if(userOptional.isPresent()) {
			User getUser=userOptional.get();
			if(getUser.getPassword().equals(user.getPassword())) {
				if(getUser.getUserType().equals("admin")) {
					return "Login successful as Admin";	
				}
				else {
					return "Login successful as Customer";	
				}
			}
			else {
				return "Invalid username or password";
			}
		}
		else {
			return "Invalid username or password";
		}
	}

}
