package com.ecom.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.ecom.entities.OrderItem;

public interface OrderItemDao extends JpaRepository<OrderItem,Long>{
	List<OrderItem> findByOrderId(Long orderId);
}
