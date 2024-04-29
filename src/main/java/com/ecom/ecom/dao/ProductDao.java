package com.ecom.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.ecom.entities.Product;

public interface ProductDao extends JpaRepository<Product,Long>{
	List<Product> findBySectionId(Long sectionId);
	void deleteBySectionId(Long sectionId);
//	void deleteByProductId(Long productId);
}
