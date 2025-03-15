import {useParams} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getLevantamiento } from '../services/levantamientos.service';
import { useState,useEffect } from 'react';

const DetalleLevantamiento = () => {

    const [row, setRow] = useState([])

    const {idLev: idLev}=useParams()
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'rgb(28, 102, 178)',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          //backgroundColor: theme.palette.action.hover,
        },
        '&tr:hover':{
            backgroundColor: 'red',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));

     useEffect(() => {
        (async()=>{
            loadDetalle(idLev)
        })();
        
    },[]);//arreglo vacio para que no itere varias veces

    const loadDetalle = async (id) => {
        try {         
            const resp= await getLevantamiento(id)

            setRow(resp.data)
            /*if (resp.status==200 && resp.data) {//comenté el bloque porque se supone que siempre debe de dar 200 o success
                setLinea(null)
                console.log(resp.data)
                setLineas(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
                // setProyectos(resp.data)  
            }*/
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <>
        <div>DetalleLevantamiento {idLev}</div>
        <div className="row justify-content-center">
            <TableContainer component={Paper}>
                <Table size="small" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell  align="center">Levantamiento/Finiquito</StyledTableCell>
                            <StyledTableCell >Propietario</StyledTableCell>
                            <StyledTableCell >N°.Delimitación</StyledTableCell>
                            <StyledTableCell >N°.Permiso</StyledTableCell>
                            <StyledTableCell >Fecha Levantamiento</StyledTableCell>
                            <StyledTableCell >Observaciones</StyledTableCell>
                            <StyledTableCell >Usuario</StyledTableCell>
                            <StyledTableCell >Fecha Afectación</StyledTableCell>
                            <StyledTableCell >Línea</StyledTableCell>
                            <StyledTableCell >Proyecto</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            row &&
                            <StyledTableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                key={row.IdLevantamiento}
                            >
            
                                <StyledTableCell  component="th" scope="row">
                                    {row.IdLevantamiento}
                                </StyledTableCell>
                                <StyledTableCell  align="right">{row.permiso?.predio.propietario.nombre}</StyledTableCell >
                                <StyledTableCell  align="right">5</StyledTableCell>
                                <StyledTableCell  align="right">{row.IdPermiso}</StyledTableCell>
                                <StyledTableCell  align="right">{row.fechaLevantamiento}</StyledTableCell>
                                <StyledTableCell  align="right">{row.observaciones}</StyledTableCell>
                                <StyledTableCell  align="right">5</StyledTableCell>
                                <StyledTableCell  align="right">5</StyledTableCell>
                                <StyledTableCell  align="right">5</StyledTableCell>
                                <StyledTableCell  align="right">5</StyledTableCell>
                            </StyledTableRow>
                        }
            
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    </>

  )
}

export default DetalleLevantamiento