# Swag Labs Web Application – Test Plan

## 1. Authentication

### 1.1 Valid Login

- Enter valid username and password
- Click Login
- Verify successful login and redirection to inventory page

### 1.2 Invalid Login

- Enter invalid username/password
- Click Login
- Verify error message is displayed

### 1.3 Locked Out User

- Enter locked out user credentials
- Click Login
- Verify locked out error message

---

## 2. Inventory Page

### 2.1 Product Listing

- Verify all products are displayed with correct name, price, and image

### 2.2 Product Sorting

- Sort products by Name (A-Z, Z-A), Price (low-high, high-low)
- Verify sorting order

### 2.3 Product Details Navigation

- Click on a product name or image
- Verify navigation to product details page

---

## 3. Cart Functionality

### 3.1 Add to Cart

- Add one or more products to cart
- Verify cart badge updates

### 3.2 Remove from Cart

- Remove product from cart (from inventory and cart page)
- Verify cart badge updates

### 3.3 View Cart

- Click cart icon
- Verify cart page displays correct products

---

## 4. Checkout Process

### 4.1 Checkout: Your Information

- Click Checkout on cart page
- Enter first name, last name, postal code
- Click Continue
- Verify navigation to overview page

### 4.2 Checkout: Overview

- Verify product summary, item total, tax, and total
- Click Finish

### 4.3 Checkout: Complete

- Verify order confirmation message

### 4.4 Checkout: Cancel

- Click Cancel on information or overview page
- Verify navigation back to cart or inventory

---

## 5. Menu and Logout

### 5.1 Open Side Menu

- Click menu button
- Verify menu options (All Items, About, Logout, Reset App State)

### 5.2 Logout

- Click Logout
- Verify redirection to login page

### 5.3 Reset App State

- Add items to cart
- Click Reset App State
- Verify cart is emptied and app state is reset

---

## 6. Error Handling & Edge Cases

### 6.1 Required Fields

- Attempt checkout with missing information
- Verify error messages

### 6.2 Session Expiry

- Simulate session timeout
- Verify user is redirected to login
