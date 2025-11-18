Healthcare Wellness & Preventive Care Portal
============================================

A comprehensive web application for **healthcare wellness, preventive care, and appointment management**. This portal allows users (patients) to track their health metrics, view daily health tips, manage their profiles, and book appointments with doctors. Doctors can view their appointments and manage their profiles.

🛠 Technologies Used
--------------------

### Frontend

*   **ReactJS** – for building dynamic user interfaces
    
*   **Tailwind CSS** – for modern, responsive, and utility-first styling
    

### Backend

*   **Node.js** with **Express.js** – for RESTful API and server-side logic
    
*   **MongoDB** – for storing user, doctor, and appointment data
    

### Authentication & Security

*   **JWT (JSON Web Tokens)** – secure user sessions
    
*   **Role-Based Access Control (RBAC)** – differentiate user roles (patient vs. doctor)
    

### Deployment

*   **Render** – for hosting Backend
*   **Vercel** – for hosting Frontend
    

🔑 Features
-----------

### User Dashboard

*   View **steps walked**, **hours of sleep**, and **basic health metrics**
    
*   See **health tip of the day**
    
*   **Book appointments** with doctors
    

### Profile Management

*   Users can **view and edit** profile information
    
*   Manage **allergies**, **current medications**, and other health data
    
*   Doctors can edit their profile, including specialization (e.g., cardiology, general practice)
    

### Appointments

*   Patients can **book appointments** with doctors
    
*   Doctors can **view all booked appointments** in their dashboard
    
*   Appointments are reflected in the **user dashboard**
    

### News & Health Updates

*   Users can see the latest **health news** and wellness tips
    

⚙️ Project Workflow
-------------------

1.  **User Authentication**
    
    *   Users and doctors register and login using JWT-based authentication
        
    *   Access is role-based (users vs. doctors)
        
2.  **Dashboard**
    
    *   On login, users are redirected to the **Dashboard**
        
    *   Dashboard displays:
        
        *   Hours of sleep
            
        *   Steps walked
            
        *   Allergies & medications
            
        *   Upcoming appointments
            
        *   Health tip of the day
            
3.  **Profile Management**
    
    *   Users and doctors can update their **profile information**
        
    *   Fields include:
        
        *   Name, email, phone number
            
        *   Allergies, medications, health conditions (for patients)
            
        *   Specialization (for doctors)
            
4.  **Appointments**
    
    *   Users can **book an appointment** with a selected doctor
        
    *   Appointment details are stored in MongoDB
        
    *   Doctors see a **list of their appointments** in their dashboard
        
5.  **News Page**
    
    *   Displays **health news and wellness updates** for users
        
