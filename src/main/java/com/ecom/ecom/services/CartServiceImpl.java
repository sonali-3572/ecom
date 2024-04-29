package com.ecom.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.ecom.dao.CartDao;
import com.ecom.ecom.entities.Cart;

@Service
public class CartServiceImpl implements CartService{
	@Autowired
	private CartDao cartDao;
	
	public CartServiceImpl() {
		
	}

	@Override
	public Cart addToDbCart(Cart cart) {
		return cartDao.save(cart);
	}

	@Override
	public void updateToDbCart(Cart cart) {
		cartDao.updateCartQuantity(cart.getProductQuantity(), cart.getUserId(), cart.getProductId());
	}

	@Override
	public void deleteFromDbCart(Cart cart) {
		cartDao.deleteByUserIdAndProductId(cart.getUserId(),cart.getProductId());
	}

	@Override
	public List<Cart> fetchCartDetails(Long userId) {
		return cartDao.findByUserId(userId);
	}
}
