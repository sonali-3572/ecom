package com.ecom.ecom.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="cart")
public class Cart {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;
	
	@Column(name="user_id")
	private Long userId;
	

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_quantity")
    private int productQuantity;

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cart(Long cartId, Long userId, Long productId, int productQuantity) {
		super();
		this.cartId = cartId;
		this.userId = userId;
		this.productId = productId;
		this.productQuantity = productQuantity;
	}
	
	@Override
	public String toString() {
		return "Cart [cartId=" + cartId + ", userId=" + userId + ", productId=" + productId + ", productQuantity="
				+ productQuantity + "]";
	}

	public Long getCartId() {
		return cartId;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public int getProductQuantity() {
		return productQuantity;
	}

	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}

    

}
