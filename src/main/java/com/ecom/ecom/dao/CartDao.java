package com.ecom.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ecom.ecom.entities.Cart;

import jakarta.transaction.Transactional;

public interface CartDao extends JpaRepository<Cart, Long>{
	@Transactional
    @Modifying
    @Query("UPDATE Cart c SET c.productQuantity = ?1 WHERE c.userId = ?2 AND c.productId = ?3")
    void updateCartQuantity(int quantity, Long userId, Long productId);
	
	@Transactional
	void deleteByUserIdAndProductId(Long userId, Long productId);
	
	List<Cart> findByUserId(Long userId);
	
}
