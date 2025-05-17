import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MenuBar from './components/MenuBar'
import './App.css'
import Home from './pages/Home'
import { Routes, Route,useLocation} from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Permisos from './pages/Permisos'
import AltaLevantamientos from './pages/AltaLevantamientos'
import Levantamientos from './pages/Levantamientos'
import DetalleLevantamiento from './pages/DetalleLevantamiento'
import ValidacionSAT from './pages/ValidacionSAT'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoutes'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button } from "@mui/material";


function App() {
	const location = useLocation();
	const isLoginPage = location.pathname === '/login';

	const theme = createTheme({
		palette: {
			primary: {
				main: "rgb(28, 102, 178)", // Azul
			},
			secondary: {
				main: "rgb(255,255,255)", // Rojo
			},
			customColors: {
				success: "#4caf50", // Verde
				warning: "#ff9800", // Naranja
				danger: "#f44336", // Rojo intenso
			},
		},
	});	

  	return (
		<ThemeProvider theme={theme}>
			{!isLoginPage ? (
			<MenuBar> 
				<Routes>
					<Route path="/home" element={<Home/>} />
					<Route exact path="/" element={
						<ProtectedRoute>
							<Dashboard/> 
						</ProtectedRoute>
						
					} />
					<Route path="/add/levantamiento" element={
						<ProtectedRoute redirectTo="/">
							<AltaLevantamientos/>
						</ProtectedRoute>
						
					} />
					<Route path="/permisos" element={<Permisos/>} />
					<Route path="/levantamientos" element={<Levantamientos/>} />
					<Route path="/levantamientos/:idLev" element={<DetalleLevantamiento/>} />
					<Route path="/contabilidad" element={<ValidacionSAT/>} />
						{/* <Route>
							<Route path="/home" element={<Home/>} />
						</Route>
						<Route>
							<Route path="/dashboard" element={<Dashboard/>} />
						</Route>
						<Route>
							<Route path="/permisos" element={<Permisos/>} />
						</Route>
						<Route>
							<Route path="/levantamiento" element={<Levantamientos/>} />
						</Route> */}
				</Routes>
			</MenuBar>
			): (
				<Routes>
					<Route path="/login" element={<Login/>} />
				</Routes>
			)}
		</ThemeProvider>
   		
  );
}

export default App
