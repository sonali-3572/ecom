package com.ecom.ecom.services;

import org.springframework.http.ResponseEntity;

import com.ecom.ecom.entities.UserDetail;

public interface UserDetailService {
	public ResponseEntity<UserDetail> getUserDetail(Long userId);
	public UserDetail updateUserDetail(UserDetail userDetail,Long userId);
}
