**E-Commerce Project**

This is a simple E-Commerce project built with Spring Boot and MySQL. It provides basic functionalities such as managing products, sections, and user details.

**Database Setup**

Creating Database and Tables
Run the following SQL queries to create the necessary database and tables:

-- CREATE DATABASE

CREATE DATABASE IF NOT EXISTS ecomproject;

USE ecomproject;

-- CREATE TABLES

CREATE TABLE IF NOT EXISTS sections (
  section_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image MEDIUMTEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS products (
  product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  manufacture_date DATE,
  expiry_date DATE,
  rate DECIMAL(10, 2) NOT NULL,
  section_id INT DEFAULT NULL,
  image MEDIUMTEXT DEFAULT NULL,
  FOREIGN KEY (section_id) REFERENCES sections(section_id)
);

CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS UserDetails (
  user_id INT PRIMARY KEY,
  full_name VARCHAR(255),
  date_of_birth DATE,
  address VARCHAR(255),
  email VARCHAR(255),
  background_color VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

**Inserting Sample Data**

You can insert some sample data into the tables using the following SQL queries:

-- INSERT SAMPLE DATA

INSERT INTO user VALUES 
       (1, 'sonali', 'sonali', 'admin'),
       (2, 'admin', 'admin', 'admin');

INSERT INTO sections VALUES
  (1, 'Fruits and Vegetables', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbK-kmvI60gkk2wv3DIKqpSNiKNE10yviACA&s'),
  (2, 'Ice cream', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCr-ECYbtn1ZIt4B3tRZvOt964cUGvk8oRMw&s'),
  (3, 'Chips and Namkeen', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0WGUH_gccHXvyL3yJbdusnAPp_m8wPDWBjg&s'),
  (4, 'Cold Drinks and Juices', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGllntw5DYRFsF_l5xUs_eFgMbI0_kamxlgQ&s'),
  (5, 'Noodles', 'https://www.grocer4u.in/wp-content/uploads/2020/11/03_2mins.jpg'),
  (6, 'Cookies', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEza_3GNjVD7-U7ocHTkpnjVxxeBUDLS2ME03fq5qyHA&s'),
  (7, 'Chocolates', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsH6ObMRMGHbzKe6YNMz_yxVx6Gc9Pvh0bFw&s');

INSERT INTO products VALUES
  (1, 'Potato', NULL, NULL, 39.00, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNkpgSoKeeHr9DI5jJfABUa-3rhfAvQnbv4GuA0b7bEw&s'),
  (2, 'Tomato', NULL, NULL, 20.00, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfgvKytV0HndvB8Ap0atxZpsyCPMhd4hZ3zQ&s'),
  (3, 'Onion', NULL, NULL, 25.00, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkQYyNQdefPcRfv885MoyWxj1buTUxuB94MQ&s'),
  (4, 'Corriander', NULL, NULL, 40.00, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSb_DP2k6JgkWF8mUVnntvwh4UOj0b82f2eQ&s'),
  (5, 'Garlic', NULL, NULL, 70.00, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3xQpJ5mYhVybj0Y1Vl1G4aIHZ_ZuDMJLeA&s'),
  (6, 'Good Day Biscuit', '2024-04-15', '2024-10-15', 10.00, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj5bEieNVp2H4Aj1WIicwTx7-8BJg-6IikA&s'),
  (7, '2 min Maggie', '2024-04-15', '2024-10-15', 14.00, 5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfITWhgZDjNCyQxs85o_ixUo-ND5m_jZZdkw&s'),
  (8, 'Pepsi', '2024-04-01', '2027-04-01', 60.00, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZlKbBaHD1pFI7eh-FRuqCCpAILWNRCFXLpA&s'),
  (9, 'Dairy milk silk', '2024-04-24', '2024-04-26', 90.00, 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4NuDiPxW-vNmbLgzGBJDcmgSHmgNL-z1mqQ&s');

**Running the Application**

To run the application locally using Eclipse, you can follow these steps: 

Clone the Repository: 
- Open Eclipse and switch to the Git perspective. 
- Clone the repository by clicking on "Clone a Git repository" and providing the repository URL (https://github.com/sonali-3572/ecom.git). 
- Follow the prompts to clone the repository to your local machine. 

Import the Project into Eclipse: 
- Once the repository is cloned, switch back to the Java perspective in Eclipse. 
- Import the project into Eclipse by selecting "File" > "Import..." > "Existing Maven Projects". 
- Browse to the directory where you cloned the repository and select the project. 
- Click "Finish" to import the project into Eclipse. 

Build the Project: 
- Eclipse should automatically recognize the project as a Maven project. 
- Right-click on the project in the Project Explorer, then select "Run As" > "Maven Build..." 
- In the "Goals" field, type clean install and click "Run". 

Run the Application: 
- Once the build is successful, right-click on the project again and select "Run As" > "Spring Boot App". 
- Eclipse will start the Spring Boot application, and you should see the application running in the Console tab. 

Access the Application: 
- Open a web browser and go to http://localhost:8080 to access the application. 

**Additional Notes**

- Make sure you have MySQL installed on your local machine and update the database configurations (application.properties) accordingly.
- You may need to adjust the port number in the application.properties file if 8080 is already in use on your system.
Feel free to explore the code and customize it according to your requirements! If you have any questions or issues, please don't hesitate to reach out.
