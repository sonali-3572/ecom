package com.ecom.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecom.ecom.entities.Category;

public interface CategoryDao extends JpaRepository<Category, Long>{
	@Query("SELECT s.name FROM Category s WHERE s.sectionId = :sectionId")
	String findNameBySectionId(Long sectionId);
}
