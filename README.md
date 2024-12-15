# Whizzy LENS

### Project Deployment Guide

Follow these steps to deploy the **Whizzy LENS** project:

1) **Set up environment variables**:
   - Create a `.env` file in the project root directory. Use the provided `.env.example` as a template.
   - Create a `.env` file in the frontend/ directory. Use the provided `.env.example` as a template.

2) **Build and run the Docker containers**:
   - Run the following command to build the project and start it in detached mode:
     ```shell
     docker-compose up -d --build
     ```

3) **Access the application**:
   - Once the containers are up and running, the application will be accessible at:
     ```
     http://0.0.0.0/
     ```

4) **Access the Admin Panel**:
   - The Django admin interface is available at:
     ```
     http://0.0.0.0/admin/
     ```
