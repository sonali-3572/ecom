package com.ecom.ecom.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.ecom.ecom.dao.ProductDao;
import com.ecom.ecom.entities.Product;

import jakarta.transaction.Transactional;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductDao productDao;
	
	public ProductServiceImpl() {
		
	}

	@Override
	public List<Product> getAllProducts() {
		return productDao.findAll();
	}

	@Override
	public List<Product> getProductsBySectionId(Long sectionId) {
		return productDao.findBySectionId(sectionId);
	}

	@Override
	@Transactional
	public void deleteBySectionId(Long sectionId) {
		productDao.deleteBySectionId(sectionId);
		
	}

	@Override
	public Product addProduct(Product product) {
		return productDao.save(product);
	}

	@Override
	public void deleteProduct(Long productId) {
		productDao.deleteById(productId);
	}

	@Override
	public Product findById(Long productId) {
		Optional<Product> product=productDao.findById(productId);
		if(product.isPresent()) {
			return product.get();
		}
		else {
			return null;
		}
	}

	@Override
	public Product updateProduct(Product existingProduct) {
		return productDao.save(existingProduct);
	}

	@Override
	public Product getProductByProductId(Long productId) {
		return productDao.findByProductId(productId);
	}

	@Override
	public Long getProductCount() {
		return productDao.count();
	}
	
}
