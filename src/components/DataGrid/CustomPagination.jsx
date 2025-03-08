//import Pagination from '@mui/material/Pagination';
import MuiPagination from '@mui/material/Pagination';   
import {gridPageCountSelector,gridPageSelector,useGridApiContext,useGridSelector,GridPagination
} 
from '@mui/x-data-grid';

function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
   // const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return (
       /*  <Paginationn
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)} */
        //showFirstButton showLastButton
        <MuiPagination
           className={className}
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event, newPage - 1);
            }}
        />
    
    )
}
function CustomPagination(props) {
    return <GridPagination 
            ActionsComponent={Pagination} {...props} 
            //labelRowsPerPage="Filas por página" //*otra forma de cambiar la etiqueta del pie de pagina custom
            labelDisplayedRows={({ from, to, count }) =>
                `${from} - ${to} de ${count === -1 ? `more than ${to}` : count}`}
            
        
         />;
}

export default CustomPagination