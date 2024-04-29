package com.ecom.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.ecom.dao.CategoryDao;
import com.ecom.ecom.entities.Category;

@Service
public class CategoryServiceImpl implements CategoryService{
	@Autowired
	private CategoryDao categoryDao;
	
	public CategoryServiceImpl() {
		
	}

	@Override
	public List<Category> getAllCategories() {
		return categoryDao.findAll();
	}

	@Override
	public String getSectionName(Long sectionId) {	
		return categoryDao.findNameBySectionId(sectionId);
	}

	@Override
	public void deleteCategory(Long sectionId) {
		categoryDao.deleteById(sectionId);
	}

	@Override
	public Category addCategory(Category category) {
		return categoryDao.save(category);
	}
}
