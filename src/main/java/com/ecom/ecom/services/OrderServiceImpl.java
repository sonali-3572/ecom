package com.ecom.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecom.ecom.dao.OrderDao;
import com.ecom.ecom.entities.Order;

@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	private OrderDao orderDao;
	
	public OrderServiceImpl() {
		
	}

	@Override
	public Order saveOrder(Order order) {
		return orderDao.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderDao.findAll();
	}

	@Override
	public ResponseEntity<String> updateOrderStatus(Long orderId, String status) {
		try {
		  Order order = orderDao.findById(orderId).orElse(null);
		  order.setOrderStatus(status);
		  orderDao.save(order);
		  return ResponseEntity.ok("Order status updated successfully.");
		} catch (Exception e) {
		  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		          .body("Failed to update order status: " + e.getMessage());
		}
	}

	@Override
	public Long getOrderCount() {
		return orderDao.count();
	}

	@Override
	public Double getTotalSales() {
		return orderDao.getTotalSales();
	}

	
}
