# 🌍 Wanderlust — Travel Agency Website

**Wanderlust** is a modern travel agency web application designed to make discovering and managing travel destinations easier. It provides a clean, responsive interface for exploring travel opportunities and managing destination packages with essential travel information.

Built with modern web technologies, Wanderlust focuses on an intuitive user experience, reusable UI components, and efficient communication between the frontend and backend.

## ✨ Key Features

- 🌎 **Travel Destinations** — Organize destinations by name, country, and category.
- 🧳 **Travel Package Management** — Manage travel packages with essential details.
- 💰 **Package Pricing** — Display travel package prices and durations.
- 📅 **Departure Information** — Include departure dates for travel packages.
- 🖼️ **Destination Images** — Add image URLs to showcase destinations.
- 📝 **Detailed Descriptions** — Provide useful information about each destination.
- ➕ **Add New Destinations** — Submit destination details through a structured form.
- 🔗 **API Integration** — Send destination data to the backend using HTTP requests.
- 📱 **Responsive UI** — Build a user-friendly interface for different screen sizes.
- 🎨 **Modern Design** — Use reusable UI components, icons, and Tailwind CSS styling.

## 🛠️ Technologies Used

### Frontend
- **Next.js** — React framework for building web applications.
- **React.js** — Component-based user interface development.
- **JavaScript (ES6+)** — Application logic and interactivity.
- **TypeScript** — Static typing where used in the project.
- **Tailwind CSS** — Utility-first styling.
- **shadcn/ui** — Reusable and customizable UI components.
- **Lucide React** — Modern icons for the interface.

### Backend & API
- **Node.js** — JavaScript runtime for backend development.
- **Express.js** — Backend API framework, if configured in the server.
- **REST API** — Communication between the frontend and backend.
- **JSON** — Data exchange between client and server.
- **Fetch API** — Sending HTTP requests and handling API responses.

### Development Tools
- **Git & GitHub** — Version control and source code management.
- **VS Code** — Code editor.
- **npm** — Package management.

> **Note:** The project uses JavaScript and TypeScript as needed across its files. Express.js and other backend technologies should be listed as installed dependencies only if they are actually configured in your project.

## 📦 Travel Package Information

Each destination package can include:

| Field | Description |
|---|---|
| Name | Destination or package name |
| Country | Destination country |
| Category | Beach, Mountain, City, Cultural, Adventure, or Luxury |
| Price | Package price |
| Duration | Length of the trip |
| Departure Date | Planned departure date |
| Image URL | Destination image |
| Description | Details about the destination |

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd wanderlust
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

If your project uses environment variables, create a `.env.local` file in the project root and configure the required API URL.

For example:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Use the environment variable name expected by your actual application.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Important:** If the backend runs separately, start the backend server as well and make sure the frontend API URL matches its address.

## 🔌 API Integration

Wanderlust communicates with a backend API to submit travel destination information.

Example endpoint used during local development:

```http
POST http://localhost:8000/add-destination
```

Example request body:

```json
{
  "name": "Cox's Bazar",
  "country": "Bangladesh",
  "category": "Beach",
  "price": 12000,
  "duration": "3 Days",
  "departureDate": "2026-12-15",
  "imageUrl": "https://example.com/destination.jpg",
  "description": "Explore the world's longest natural sea beach."
}
```

The backend should validate the submitted data and return an appropriate response.

## 📁 Project Structure

A simplified example of the project structure:

```text
wanderlust/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   └── ...
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

The actual structure may vary depending on how the project is organized.

## 🎯 Project Goals

- Build a modern and responsive travel agency website.
- Practice Next.js and component-based development.
- Improve frontend and backend API integration skills.
- Develop reusable forms and UI components.
- Practice managing travel destination data.
- Follow clean coding practices and maintainable project structure.

## 🔮 Future Improvements

- 🔐 User authentication and authorization.
- 🔎 Search and filter destinations.
- ✏️ Edit and delete travel packages.
- 🗺️ Interactive maps and destination locations.
- ❤️ Wishlist and favorite destinations.
- 📋 Online travel booking system.
- 💳 Secure payment integration.
- ⭐ Customer reviews and ratings.
- 🛠️ Admin dashboard for managing destinations and bookings.

## 👨‍💻 Developer

**Yousuf Ali**

Computer Science & Engineering Student at United International University (UIU)

Interested in Full-Stack Web Development, modern web technologies, and building practical software applications.

- GitHub: [@yousufali01](https://github.com/yousufali01)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/md-yousuf-ali-b8a7332a1/)

---

⭐ If you find this project interesting, consider giving the repository a star!

**Wanderlust — Discover new destinations, explore new experiences, and travel beyond boundaries.** 🌍
