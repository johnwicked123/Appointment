# 🩺 Appointment Booking App (Angular + .NET 8 + Docker)

This is a full-stack appointment booking application built with:

- **Frontend:** Angular 12
- **Backend:** .NET 8 Web API
- **Containerization:** Docker & Docker Compose

---

## 📋 Prerequisites

Before you run the application, make sure the following are installed on your system:

| Tool            | Version Required |
|-----------------|------------------|
| Node.js         | v14.x            |
| Angular CLI     | v12.x            |
| .NET SDK        | v8.0             |
| Docker Engine   | Latest           |
| Docker Compose  | Latest           |

---


## ✅ Features

- 🗓️ Book appointments by selecting available time slots
- 👨‍⚕️ View doctor-wise availability
- ✏️ Edit and update scheduled appointments
- ❌ Cancel/Delete appointments
- 📧 SMTP-based email confirmation (configurable)
- 🔍 Real-time UI updates
- 🧱 Modular folder structure with RESTful API
- 🐳 Fully containerized using Docker and Docker Compose


## 🗂️ Project Structure

appointment-app/
├── client/ # Angular frontend
│ └── Dockerfile
├── server/ # .NET backend
│ ├── Dockerfile
│ ├── appointment-app.sln
│ └── appsettings.json # MUST be created manually
├── docker-compose.yml
└── README.md



---

## 🔧 SMTP Configuration

The backend (`server/`) requires an `appsettings.json` file for SMTP settings.

### ➕ You MUST create `server/appsettings.json`

Here’s an example structure:
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "EmailSettings": {
    "SmtpServer": "smtp.gmail.com",
    "Port": 587,
    "SenderName": "TatvaCare Appointments",
    "SenderEmail": "sarthakdixit630@gmail.com", //your mail
    "Username": "sarthakdixit630@gmail.com",
    "Password": "raen bmsz ancf xslnp" //your password
  }

}

🐳 Running the App with Docker Compose
Make sure Docker is running

From the root of the project, run the following command:

docker-compose up --build

Builds both Angular and .NET images

Starts the containers

Connects them using Docker Compose networking

🧰 Manual Commands (Optional)
🔨 Build Angular App Manually (outside Docker)

cd client
npm install
ng build --prod


🧪 Run .NET API Locally (without Docker)

cd server
dotnet run



