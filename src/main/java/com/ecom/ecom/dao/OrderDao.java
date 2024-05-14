package com.ecom.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecom.ecom.entities.Order;

public interface OrderDao extends JpaRepository<Order, Long>{
	@Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    Double getTotalSales();
}
