package com.ecom.ecom.services;

import java.util.List;

import com.ecom.ecom.entities.Product;


public interface ProductService {
	public List<Product> getAllProducts();
	public List<Product> getProductsBySectionId(Long sectionId);
	public void deleteBySectionId(Long sectionId);
	public Product addProduct(Product product);
	public void deleteProduct(Long productId);
	public Product findById(Long productId);
	public Product updateProduct(Product existingProduct);
	public Product getProductByProductId(Long productId);
}
