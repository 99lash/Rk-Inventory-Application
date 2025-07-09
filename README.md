# RK Inventory Application
An inventory management web application for a mechanical keyboard company. This project is part of the course in [The Odin Project](https://www.theodinproject.com/).

![image](https://github.com/user-attachments/assets/5ae3398a-7938-4c45-8742-834f7d45c8fe)

## Built with

![Static Badge](https://img.shields.io/badge/postgresql-white?style=for-the-badge&logo=postgresql&logoColor=%234169E1&logoSize=64)
![Static Badge](https://img.shields.io/badge/express.js-white?style=for-the-badge&logo=express&logoColor=%23000000&logoSize=64)
![Static Badge](https://img.shields.io/badge/ejs-white?style=for-the-badge&logo=ejs&logoColor=%23B4CA65&logoSize=64)
![Static Badge](https://img.shields.io/badge/node.js-white?style=for-the-badge&logo=nodedotjs&logoColor=%235FA04E&logoSize=64)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The things you need before installing the software.

* [PostgreSQL](https://www.postgresql.org/) installed and already setup in your local environment

### Installation

A step by step guide that will tell you how to get the development environment up and running.

1. Clone this repository
    
        git clone https://github.com/99lash/Rk-Inventory-Application.git
        cd Rk-Inventory-Application

3. Install dependencies

        npm install

4. Add a .env file in the root directory and add these following environment variables

       PORT=3000
       DATABASE_URL=[YOUR POSTGRESQL DB_URL] that's why you need a posgresql installed and setup in your local environment
       SECRET_PASSWORD=superadmin

5. Then you're ready to run the application locally.

       npm run start

