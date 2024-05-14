package com.ecom.ecom.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.ecom.dao.NotificationDao;
import com.ecom.ecom.entities.Notification;

//import java.sql.Timestamp;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationDao notificationDao;

    @Override
//    @Transactional
    public void saveMessage(Long userId,Long orderId, String message) {
        Notification messageEntity = new Notification();
        messageEntity.setUserId(userId);
        messageEntity.setMessage(message);
        messageEntity.setOrderId(orderId);
        messageEntity.setStatus("unread");
        Timestamp currentTimestamp = Timestamp.valueOf(LocalDateTime.now());
        messageEntity.setCreatedAt(currentTimestamp);
        notificationDao.save(messageEntity);
    }

	@Override
	public List<Notification> getMessages(Long userId) {
		return notificationDao.findByUserId(userId);
	}
}
