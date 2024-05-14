package com.ecom.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
import com.ecom.ecom.entities.ContactForm;
import com.ecom.ecom.entities.MessageDTO;
import com.ecom.ecom.entities.Notification;
import com.ecom.ecom.entities.Order;
import com.ecom.ecom.entities.OrderItem;
import com.ecom.ecom.entities.Product;
import com.ecom.ecom.entities.ProductDTO;
import com.ecom.ecom.entities.User;
import com.ecom.ecom.entities.UserDetail;
import com.ecom.ecom.services.CartService;
import com.ecom.ecom.services.CategoryService;
import com.ecom.ecom.services.NotificationService;
import com.ecom.ecom.services.OrderItemService;
import com.ecom.ecom.services.OrderService;
import com.ecom.ecom.services.ProductService;
import com.ecom.ecom.services.UserDetailService;
import com.ecom.ecom.services.UserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@RestController
public class MyController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private OrderItemService orderItemService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserDetailService userDetailService;
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CartService cartService;
	
	@Autowired
    private JavaMailSender emailSender;
	
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
	public ResponseEntity<?> loginDetail(@RequestBody User user) {
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
	
	@PostMapping("/submitQuery")
	public String submitQuery(@RequestBody ContactForm form) {
		// send email
		sendEmail(form.getEmail(),"sonalichaurasiya001@gmail.com",form.getName(),form.getMessage());
		return "Email sent successfully";
	}
	
	private void sendEmail(String from,String to, String name,String message) {
		MimeMessage msg = emailSender.createMimeMessage();
	    MimeMessageHelper helper = new MimeMessageHelper(msg);
	    try {
	        helper.setFrom(from);
	        helper.setTo(to);
	        helper.setSubject("New message from " + name);
	        helper.setText(message);
	        emailSender.send(msg);
	    } catch (MessagingException e) {
	        e.printStackTrace();
	    }
	}
	
	@GetMapping("/products/product/{productId}")
	public Product getProductByProductId(@PathVariable Long productId){
		return this.productService.getProductByProductId(productId);
	}
	
	@GetMapping("/getUserDetails/{userId}")
	public ResponseEntity<UserDetail> getUserDetail(@PathVariable String userId) {
		return this.userDetailService.getUserDetail(Long.parseLong(userId));
	}
	
	@PostMapping("/updateUserDetails/{userId}")
	public UserDetail updateUserDetail(@RequestBody UserDetail userDetail,@PathVariable Long userId){
		return this.userDetailService.updateUserDetail(userDetail,userId);
	}
	
	@PostMapping("/saveOrder")
	public Order saveOrder(@RequestBody Order order){
		return this.orderService.saveOrder(order);
	}
	
	@PostMapping("/saveOrderItem")
	public OrderItem saveOrderItem(@RequestBody OrderItem orderItem) {
		return this.orderItemService.saveOrderItem(orderItem);
	}
	
	@GetMapping("/orders")
	public List<Order> getAllOrders(){
		return this.orderService.getAllOrders();
	}
	
	@GetMapping("/getUsername/{userId}")
	public String getUsername(@PathVariable Long userId) {
		return this.userService.getUsername(userId);
	}
	
	@GetMapping("/orders/{orderId}")
	public List<OrderItem> getOrderItem(@PathVariable Long orderId){
		return this.orderItemService.getOrderItem(orderId);
	}
	
	@PutMapping("/orders/{orderId}/{status}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @PathVariable String status) {
       return this.orderService.updateOrderStatus(orderId,status);
    }
	
	@GetMapping("/userCount")
    public Long getUserCount() {
        return this.userService.getUserCount();
    }
	
	@GetMapping("/productCount")
    public Long getProductCount() {
        return this.productService.getProductCount();
    }
	
	@GetMapping("/orderCount")
    public Long getOrderCount() {
        return this.orderService.getOrderCount();
    }
	
	@GetMapping("/totalSales")
    public Double getTotalSales() {
        return this.orderService.getTotalSales();
    }
	
	@PostMapping("/sendMessage")
    public ResponseEntity<String> sendMessage(@RequestBody MessageDTO messageDTO) {
        try {
            notificationService.saveMessage(messageDTO.getUserId(),messageDTO.getOrderId(), messageDTO.getMessage());
            return ResponseEntity.ok("Message saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save message: " + e.getMessage());
        }
    }
	
	@GetMapping("/notifications/{userId}")
	public List<Notification> getMessages(@PathVariable Long userId){
		return this.notificationService.getMessages(userId);
	}
}

