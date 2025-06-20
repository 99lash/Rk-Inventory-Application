# API ENDPOINTS

## Products

Get all products

    GET /products

Get product by ID

    GET /products/:id

Create new product (name, description, price, category_id)

    POST /products

Update product

    PUT /products/:id

Delete product 

    DELETE /products/:id

## Categories

Get all categories

    GET /categories

Create a new category (name, description)

    POST /categories

DELETE

    DELETE /categories/:id

## Inventory [di muna kailangan]

View products stock 

    GET /inventory/:product_id

Add stock (product_id + quantity)

    POST /inventory

## Users (admin mode)

Create user

    POST /users

Get all users

    GET /users

Update user info (roles, username, password, email)

    PUT /users/:id

Delete user

    DELETE /users/:id

## Models

Create model

    POST /models

Get all models

    GET /models

Update model info (name, layout, connectivity, switch_support)

    PUT /models/:id

Delete model

    DELETE /models/:id

## User Roles

Create role

    POST /roles

Get all roles

    GET /roles

Update role info (name)

    PUT /roles/:id

Delete role

    DELETE /roles/:id

