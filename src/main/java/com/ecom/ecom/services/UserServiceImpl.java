package com.ecom.ecom.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecom.ecom.dao.UserDao;
import com.ecom.ecom.dao.UserDetailDao;
import com.ecom.ecom.entities.User;
import com.ecom.ecom.entities.UserDetail;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDao userDao;

	@Autowired UserDetailDao userDetailDao;
	public UserServiceImpl() {
		
	}
	
	@Override
	public User createUser(User user) {
        Optional<User> existingUser = userDao.findByUsernameAndUserType(user.getUsername(), user.getUserType());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User already exists. Please log in.");
        }
        User newUser=userDao.save(user);
        Long userid=newUser.getUserId();
        
        UserDetail userDetail=new UserDetail();
        userDetail.setUserId(userid);
        userDetail.setBackgroundColor(userDetail.generateRandomBackgroundColor());;
        userDetailDao.save(userDetail);
        
        return newUser;
    }

	@Override
	public ResponseEntity<?> loginDetail(User user) {
		Optional<User> userOptional=userDao.findByUsernameAndUserType(user.getUsername(),user.getUserType());
		Map<String, Object> response = new HashMap<>();
		if(userOptional.isPresent()) {
			User getUser=userOptional.get();
			if(getUser.getPassword().equals(user.getPassword())) {
				response.put("userId", getUser.getUserId());
				response.put("userType", getUser.getUserType());
	            response.put("message", "Login successful as " + user.getUserType());
	            return ResponseEntity.ok(response);
			}
			else {
				response.put("message","Invalid username or password");
				return ResponseEntity.ok(response);
			}
		}
		else {
			response.put("message","Invalid username or password");
			return ResponseEntity.ok(response);
		}
	}

}
