# Budget Clothing

A modern full-stack e-commerce web application for browsing, filtering, and purchasing clothing online. The application provides a seamless shopping experience with secure authentication, real-time cart management, and Stripe-powered payments.

Built with **React**, **TypeScript**, **Firebase**, and **Stripe**, the project demonstrates modern frontend development practices together with serverless backend functionality.

---

## 🌐 Live Demo

**Application:** https://budgetclothing.netlify.app/

---

## 📸 Screenshots

<p align="center">
  <img src="./screenshots/home.png" alt="Homepage" width="48%">
  <img src="./screenshots/auth.png" alt="Authentication" width="48%">
</p>

<p align="center">
  <img src="./screenshots/item.png" alt="Category Filtering" width="48%">
  <img src="./screenshots/cart.png" alt="Shopping Cart" width="48%">
</p>

<p align="center">
  <img src="./screenshots/checkout.png" alt="Checkout" width="48%">
  <img src="./screenshots/pay.png" alt="Payment" width="48%">
</p>

---

## ✨ Features

- Secure user authentication using Firebase Authentication
- User registration and sign in with reCAPTCHA protection
- Browse products by clothing category
- Real-time shopping cart updates
- Quantity management directly from the cart
- Dynamic checkout with automatic total calculation
- Secure card payments powered by Stripe
- Responsive user interface for desktop and mobile devices

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| TypeScript | Type safety and maintainability |
| CSS | Application styling |
| Firebase Authentication | User authentication |
| Firestore | Product database |
| Stripe | Payment processing |
| Netlify Functions | Secure server-side payment handling |
| Netlify | Application hosting |

---

## 📁 Project Structure

```text
src/
├── assets/
├── components/
├── routes/
├── store/
├── utils/
├── App.tsx
└── index.tsx
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Kendi-prog/budget-clothing.git
cd budget-clothing
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and add your Firebase and Stripe configuration.

```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_key
```

### Start the application

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## 🔮 Future Improvements

- User order history
- Product search
- Wishlist functionality
- Product reviews and ratings
- Automated testing
- Admin dashboard for inventory management

---

## 👨‍💻 Author

**Joy Leila Kendi**

GitHub: https://github.com/Kendi-prog
