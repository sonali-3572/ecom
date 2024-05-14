package com.ecom.ecom.services;

import java.util.List;

import com.ecom.ecom.entities.OrderItem;

public interface OrderItemService {
	public OrderItem saveOrderItem(OrderItem orderItem);
	public List<OrderItem> getOrderItem(Long orderId);
}
