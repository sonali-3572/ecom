package com.ecom.ecom.services;

import java.util.List;

import com.ecom.ecom.entities.Notification;

public interface NotificationService {
	public void saveMessage(Long userId,Long orderId, String message);
	public List<Notification> getMessages(Long userId);
}
