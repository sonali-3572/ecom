package com.ecom.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.ecom.entities.OrderItem;
import com.ecom.ecom.entities.User;
import com.ecom.ecom.entities.UserDetail;

public interface UserDetailDao extends JpaRepository<UserDetail,Long>{
	
}
