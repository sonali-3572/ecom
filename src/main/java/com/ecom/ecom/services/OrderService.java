package com.ecom.ecom.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ecom.ecom.entities.Order;

public interface OrderService {
	public Order saveOrder(Order order);
	public List<Order> getAllOrders();
	public ResponseEntity<String> updateOrderStatus(Long orderId, String status);
	public Long getOrderCount();
	public Double getTotalSales();
}
