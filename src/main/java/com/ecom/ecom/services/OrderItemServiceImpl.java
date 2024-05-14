package com.ecom.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.ecom.dao.OrderItemDao;
import com.ecom.ecom.entities.OrderItem;

@Service
public class OrderItemServiceImpl implements OrderItemService{
	@Autowired
	private OrderItemDao orderItemDao;
	
	public OrderItemServiceImpl() {
		
	}

	@Override
	public OrderItem saveOrderItem(OrderItem orderItem) {
		return orderItemDao.save(orderItem);
	}

	@Override
	public List<OrderItem> getOrderItem(Long orderId) {
		return orderItemDao.findByOrderId(orderId);
	}
}
