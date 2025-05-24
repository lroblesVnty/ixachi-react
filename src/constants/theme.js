import { createTheme } from "@mui/material/styles";

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

export default theme;


