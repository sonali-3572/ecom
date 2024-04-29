package com.ecom.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.ecom.entities.Cart;
import com.ecom.ecom.entities.Category;
import com.ecom.ecom.entities.Product;
import com.ecom.ecom.entities.ProductDTO;
import com.ecom.ecom.entities.User;
import com.ecom.ecom.services.CartService;
import com.ecom.ecom.services.CategoryService;
import com.ecom.ecom.services.ProductService;
import com.ecom.ecom.services.UserService;


@RestController
public class MyController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CartService cartService;
	
	@GetMapping("/home")
	public String home() {
		return "Welcome to the application";
	}
	
	@PostMapping("/createUser")
	public User createUser(@RequestBody User user) {
		return this.userService.createUser(user);
	}
	
	@GetMapping("/categories")
	public List<Category> getCategories(){
		return this.categoryService.getAllCategories();
	}
	
	@GetMapping("/products")
	public List<Product> getAllProducts(){
		return this.productService.getAllProducts();
	}
	
	@GetMapping("/categories/{sectionId}")
	public String getSectionName(@PathVariable String sectionId) {
		return this.categoryService.getSectionName(Long.parseLong(sectionId));
	}
	
	@PostMapping("/addToDbCart")
	public Cart addToDbCart(@RequestBody Cart cart) {
		return this.cartService.addToDbCart(cart);
	}
	
	@PostMapping("/updateToDbCart")
	public void updateToDbCart(@RequestBody Cart cart) {
		this.cartService.updateToDbCart(cart);
	}
	
	@PostMapping("/deleteFromDbCart")
	public void deleteFromDbCart(@RequestBody Cart cart) {
		this.cartService.deleteFromDbCart(cart);
	}
	
	@GetMapping("/products/{sectionId}")
	public List<Product> getProductsBySectionId(@PathVariable String sectionId){
		return this.productService.getProductsBySectionId(Long.parseLong(sectionId));
	}
	
	@GetMapping("/cart/{userId}")
	public List<Cart> fetchCartDetails(@PathVariable String userId){
		return this.cartService.fetchCartDetails(Long.parseLong(userId));
	}
	
	@PostMapping("/loginDetail")
	public String loginDetail(@RequestBody User user) {
		return this.userService.loginDetail(user);
	}

	@DeleteMapping("/deleteCategory/{sectionId}")
	public void deleteCategory(@PathVariable String sectionId) {
		this.productService.deleteBySectionId(Long.parseLong(sectionId));
		this.categoryService.deleteCategory(Long.parseLong(sectionId));
	}
	
	@DeleteMapping("/deleteProduct/{productId}")
	public void deleteProduct(@PathVariable String productId) {
		this.productService.deleteProduct(Long.parseLong(productId));
	}
	
	@PostMapping("/addProduct")
	public Product addProduct(@RequestBody Product product) {
		return this.productService.addProduct(product);
	}
	
	@PostMapping("/addCategory")
	public Category addCategory(@RequestBody Category category) {
		return this.categoryService.addCategory(category);
	}
	
	@PutMapping("/updateProduct/{productId}")
	public Product updateProduct(@PathVariable String productId, @RequestBody ProductDTO productDTO) {
		Product existingProduct= this.productService.findById(Long.parseLong(productId));
		
		//update only provided fields
		if (productDTO.getName() != null && productDTO.getName()!="") {
            existingProduct.setName(productDTO.getName());
        }
		if (productDTO.getManufactureDate() != null) {
            existingProduct.setManufactureDate(productDTO.getManufactureDate());
        }
		if (productDTO.getExpiryDate() != null) {
            existingProduct.setExpiryDate(productDTO.getExpiryDate());
        }
		if (productDTO.getRate() != 0) {
            existingProduct.setRate(productDTO.getRate());
        }
		if (productDTO.getImage() != null && productDTO.getImage() != "") {
            existingProduct.setImage(productDTO.getImage());
        }
		
		Product updatedProduct = this.productService.updateProduct(existingProduct);
        return updatedProduct;
	}
}
