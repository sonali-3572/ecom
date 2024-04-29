package com.ecom.ecom.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;
	private String name;
	private Date manufactureDate;
	private Date expiryDate;
	private double rate;
	private int sectionId;
	private String image;
	
	public Product() {
		super();
	}

	public Product(Long productId, String name, Date manufactureDate, Date expiryDate, double rate, int sectionId,
			String image) {
		super();
		this.productId = productId;
		this.name = name;
		this.manufactureDate = manufactureDate;
		this.expiryDate = expiryDate;
		this.rate = rate;
		this.sectionId = sectionId;
		this.image = image;
	}

	@Override
	public String toString() {
		return "Product [productId=" + productId + ", name=" + name + ", manufactureDate=" + manufactureDate
				+ ", expiryDate=" + expiryDate + ", rate=" + rate + ", sectionId=" + sectionId + ", image=" + image
				+ "]";
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getManufactureDate() {
		return manufactureDate;
	}

	public void setManufactureDate(Date manufactureDate) {
		this.manufactureDate = manufactureDate;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public int getSectionId() {
		return sectionId;
	}

	public void setSectionId(int sectionId) {
		this.sectionId = sectionId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
}
