package com.ecom.ecom.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecom.ecom.dao.UserDao;
import com.ecom.ecom.dao.UserDetailDao;
import com.ecom.ecom.entities.UserDetail;

@Service
public class UserDetailServiceImpl implements UserDetailService{
	@Autowired
	private UserDetailDao userDetailDao;
	
	public UserDetailServiceImpl() {
		
	}

	@Override
	public ResponseEntity<UserDetail> getUserDetail(Long userId) {
	    Optional<UserDetail> userDetailOptional = userDetailDao.findById(userId);
	    if (userDetailOptional.isPresent()) {
	        return ResponseEntity.ok(userDetailOptional.get());
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	@Override
	public UserDetail updateUserDetail(UserDetail userDetail, Long userId) {
		UserDetail existingUserDetails = userDetailDao.findById(userId)
	            .orElseThrow(() -> new IllegalArgumentException("User details not found for userId: " + userId));
		
		if (userDetail.getFullName() != null && !userDetail.getFullName().isEmpty()) {
            existingUserDetails.setFullName(userDetail.getFullName());
        }
        if (userDetail.getEmail() != null && !userDetail.getEmail().isEmpty()) {
            existingUserDetails.setEmail(userDetail.getEmail());
        }
        if (userDetail.getDateOfBirth() != null ) {
            existingUserDetails.setDateOfBirth(userDetail.getDateOfBirth());
        }
        if (userDetail.getAddress() != null && !userDetail.getAddress().isEmpty()) {
            existingUserDetails.setAddress(userDetail.getAddress());
        }
        return userDetailDao.save(existingUserDetails);
	}
}
