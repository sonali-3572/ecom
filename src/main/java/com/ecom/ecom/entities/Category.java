package com.ecom.ecom.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sections")
public class Category {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sectionId;
	private String name;
	private String image;
	
	public Category() {
		super();
	}

	@Override
	public String toString() {
		return "Category [sectionId=" + sectionId + ", name=" + name + ", image=" + image + "]";
	}

	public Category(Long sectionId, String name, String image) {
		super();
		this.sectionId = sectionId;
		this.name = name;
		this.image = image;
	}

	public Long getSectionId() {
		return sectionId;
	}

	public void setSectionId(Long sectionId) {
		this.sectionId = sectionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	
}
