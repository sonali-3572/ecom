package com.ecom.ecom.services;

import java.util.List;

import com.ecom.ecom.entities.Category;

public interface CategoryService {
	public List<Category> getAllCategories();
	public String getSectionName(Long sectionId);
	public void deleteCategory(Long sectionId);
	public Category addCategory(Category category);
}
