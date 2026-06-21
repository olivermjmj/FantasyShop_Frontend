# D&D Shop Frontend

This is the frontend for my D&D Shop exam project.

The application is a fantasy-themed webshop built with React and Vite.  
It connects to a backend API and allows users to browse shop items, view product details, use a cart and interact with authentication features.

## Live Demo

Add live link here.

## GitHub Repository for the backend

https://github.com/olivermjmj/D-D_Shop

## Tech Stack

- React
- Vite
- JavaScript
- HTML
- CSS
- React Router
- Fetch API

## Main Features

- Product overview
- Product detail pages
- Shopping cart
- Login and register functionality
- JWT-based authentication
- API communication with backend
- Reusable React components
- Routing between pages
- Production build with Vite

## Project Structure

```txt
src/
├── assets/
├── components/
├── pages/
├── services/
├── App.jsx
└── main.jsx
```

## Environment Variables

The frontend uses an environment variable for the backend API URL.

Local development:

```env
VITE_API_URL=http://localhost:7070
```

Production example:

```env
VITE_API_URL=http://your-server-ip:7070
```

## Installation

Clone the repository:

```bash
git clone https://github.com/olivermjmj/FantasyShop_Frontend.git
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Reflection

This project helped me practice core frontend concepts such as React components, props, routing, API calls, authentication and styling.

A major focus of the project was connecting the frontend to a real backend API and creating a structured React application with reusable components and clear page navigation.

The project also gave me experience with preparing a frontend application for deployment using Vite.
