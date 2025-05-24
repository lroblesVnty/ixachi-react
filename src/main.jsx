import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthContext.jsx'
import router from './Router.jsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from './constants/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
       {/*  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>  */}
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <RouterProvider router={router} future={{ v7_relativeSplatPath: true, v7_startTransition: true, }} />
            </AuthProvider>  
        </ThemeProvider>
            

  </React.StrictMode>,
)
