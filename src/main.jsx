import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
  </React.StrictMode>,
)
