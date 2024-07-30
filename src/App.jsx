import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MenuBar from './components/MenuBar'
import './App.css'
import Home from './pages/Home'
import { Routes, Route} from "react-router-dom";
import Dashboard from './pages/Dashboard'

function App() {
  	const [count, setCount] = useState(0)

  	return (
		<MenuBar>
			<Routes>
				<Route>
					<Route path="/home" element={<Home/>} />
				</Route>
				<Route>
					<Route path="/dashboard" element={<Dashboard/>} />
				</Route>
			</Routes>
		</MenuBar>
   		/*  <>
		<div>
			<MenuBar>
			<Home />
				
			</MenuBar>
		</div>
      
   		 </> */
  )
}

export default App
