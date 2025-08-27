import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import firebaseConfig from './firebase/firebase.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import GlobalUsersPage from './pages/GlobalUsersPage.jsx'
import RootLayout from './pages/RootLayout.jsx'

const router = createBrowserRouter([
  { path: "/", Component: RootLayout, children:[
    {
      index: true, element: <Home/>
    },
{ path: "/allusers", Component: GlobalUsersPage }
  ] },
  { path: "/signup", Component: Signup },
  { path: "/login", Component: Login },
  ,
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />,
     </Provider>
  </StrictMode>,
)
