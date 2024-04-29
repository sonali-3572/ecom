package com.ecom.ecom.services;

import java.util.List;

import com.ecom.ecom.entities.Cart;

public interface CartService {
	public Cart addToDbCart(Cart cart);
	public void updateToDbCart(Cart cart);
	public void deleteFromDbCart(Cart cart);
	public List<Cart> fetchCartDetails(Long userId);
}
