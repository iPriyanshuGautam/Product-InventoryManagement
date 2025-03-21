
# Product Inventory Management System

This project is a **Product Inventory Management SPA** built using **Spring Boot Microservices** for the backend and **Angular 19** for the frontend.  
It includes essential CRUD functionalities and user authentication (login and register).

## Project Structure

The system is designed with the following microservices and components:

### Backend (Spring Boot Microservices)
1. **User Service (`user-service`)**  
   - Handles user registration and login.  
   - Includes basic authentication.

2. **Product Service (`product-service`)**  
   - Provides CRUD operations for products (Add, View, Edit, and Delete).

3. **Service Registry (Eureka)**  
   - Acts as a service discovery and registry for the microservices.

4. **API Gateway**  
   - Routes requests to the appropriate services and handles load balancing.

### Frontend (Angular 19)
The frontend includes:  
- **Product Add**: Add a new product to the inventory.  
- **Product View**: View a list of all products.  
- **Product Edit**: Edit product details.  
- **Product Delete**: Delete a product from the inventory.
- **Login**: User login.
- **Register**: Add new user.

## Setup and Installation

### Prerequisites
- Java 17+  
- Spring Boot  
- MySQL  
- Node.js and Angular CLI  
- Git  

### Backend Setup (Spring Boot)
1. Clone the repository:  
   ```bash
   git clone <backend-repo-url>
   cd backend-repo
   ```

2. Configure the database:  
   Update the MySQL credentials in the `application.yml` file for each microservice:  
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/<database-name>
       username: root
       password: Priyanshu@101
   ```

3. Run each Spring Boot microservice (`user-service`, `product-service`, `api-gateway`, and `service-registry`).  
   Use the following command for each:  
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup (Angular)
1. Clone the frontend repository:  
   ```bash
   git clone <frontend-repo-url>
   cd frontend-repo
   ```

2. Install Angular dependencies:  
   ```bash
   npm install
   ```

3. Run the Angular development server:  
   ```bash
   ng serve
   ```

4. Access the frontend at `http://localhost:4200`.

## Endpoints

### User Service Endpoints
- **POST** `/register`: User Registration  
- **POST** `/login`: User Login  

### Product Service Endpoints
- **GET** `/products`: Get all products  
- **POST** `/products`: Add a new product  
- **PUT** `/products/{id}`: Update a product  
- **DELETE** `/products/{id}`: Delete a product  

## Features
- **Product CRUD Operations**: Add, view, edit, and delete products.  
- **User Authentication**: Register and log in users.  
- **Microservices Architecture**: Backend services run independently and communicate via Eureka Service Registry and API Gateway.  
- **Frontend SPA**: Smooth user experience using Angular 19.

## Technologies Used
### Backend
- Java 17  
- Spring Boot  
- Spring Security  
- MySQL  
- Eureka Service Registry  
- Spring Cloud API Gateway  

### Frontend
- Angular 19  
- Material UI for UI  

## How to Contribute
1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Added a new feature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature-branch
   ```
5. Submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).
