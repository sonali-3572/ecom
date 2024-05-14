package com.ecom.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.ecom.entities.Notification;

@Repository
public interface NotificationDao extends JpaRepository<Notification, Long>{
	List<Notification> findByUserId(Long userId);
}