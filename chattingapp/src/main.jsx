import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import firebaseConfig from './firebase/firebase.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/signup", Component: Signup },
  { path: "/login", Component: Login },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />,
  </StrictMode>,
)
