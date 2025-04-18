import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MenuBar from './components/MenuBar'
import './App.css'
import Home from './pages/Home'
import { Routes, Route} from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Permisos from './pages/Permisos'
import AltaLevantamientos from './pages/AltaLevantamientos'
import Levantamientos from './pages/Levantamientos'
import DetalleLevantamiento from './pages/DetalleLevantamiento'
import ValidacionSAT from './pages/ValidacionSAT'

function App() {

  	return (
		<MenuBar> 
			<Routes>
				 <Route path="/home" element={<Home/>} />
				 <Route path="/dashboard" element={<Dashboard/>} />
				 <Route path="/permisos" element={<Permisos/>} />
				 <Route path="/add/levantamiento" element={<AltaLevantamientos/>} />
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
   		
  );
}

export default App
