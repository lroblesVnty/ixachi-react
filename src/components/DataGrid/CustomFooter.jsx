import Box from "@mui/material/Box";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";

function CustomFooter({rowCount}) {
    return (
        <>
            {/* <Box sx={{ padding: "10px",  width: '25%', }}>Filas : {total}</Box> */}
            <GridFooterContainer>
                <Box sx={{ padding: "3px",  width: '25%', }}>Total de Filas : {rowCount}</Box>
                <GridFooter sx={{
                border: 'none', // To delete double border.
                }} />
            </GridFooterContainer>
        </>
    );
}



export default CustomFooter;