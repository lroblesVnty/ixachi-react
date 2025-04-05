import {useParams} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import { getDetalleEstacadoById, getDetalleLevantamiento, getLevantamiento } from '../services/levantamientos.service';
import { useState,useEffect } from 'react';
import dayjs from 'dayjs';

const DetalleLevantamiento = () => {

    const [row, setRow] = useState([])
    const [estacado, setEstacado] = useState([])

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
    
    const CellDetalleLev = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'rgb(255, 165, 0)',
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
        /* (async()=>{
            loadDetalle(idLev)
            loadEstacado(idLev)
        })(); */
        loadDetalle(idLev)
        loadEstacado(idLev)
        
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

    const loadEstacado = async (id) => {
        try {         
            const resp= await getDetalleLevantamiento(id)

            setEstacado(resp.data)
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

    const FormatearEnPesos = (cantidad ) => {
        const formatoPesos = cantidad.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      
        return formatoPesos;
    };

    const exportEstacado= async()=>{
        try {         
            const response= await getDetalleEstacadoById(idLev)
            console.log(response.data)
            console.log(response.headers);

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            var nameFile='levs'+dayjs().format('DD-MM-YYYY')+'.xlsx';
            link.setAttribute('download', nameFile); // Nombre del archivo
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        
        
            
        } catch (error) {
            console.log(error)
        }

    }


  return (
    <>
        <div className="row text-center mb-2">
            <div className="fs-2">Detalle Levantamiento</div>
        </div>
        <div className="row justify-content-center">
            <div className="col-11">
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
                                    <StyledTableCell  align="right">{row.fechaLevantamiento}</StyledTableCell>
                                    <StyledTableCell  align="right">5</StyledTableCell>
                                    <StyledTableCell  align="right">{row.permiso?.predio.idProyecto}</StyledTableCell>
                                </StyledTableRow>
                            }
                
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

        <div className="row text-center mt-4">
            <div className="col fs-3">
                Estacado
            </div>
            <div className="col-2">
                <Tooltip title="Exportar Estacado" placement="top-start">
                    <IconButton color="success" onClick={exportEstacado}>
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
        <div className="row justify-content-center mt-4">
            <div className="col-11">
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <CellDetalleLev align="center">Tipo Linea</CellDetalleLev>
                                <CellDetalleLev align="center">N°.Linea</CellDetalleLev>
                                <CellDetalleLev align="center">De Estaca</CellDetalleLev>
                                <CellDetalleLev align="center">A Estaca</CellDetalleLev>
                                <CellDetalleLev align="center">Afectación</CellDetalleLev>
                                <CellDetalleLev align="center">m</CellDetalleLev>
                                <CellDetalleLev align="center">m2</CellDetalleLev>
                                <CellDetalleLev align="center">Km</CellDetalleLev>
                                <CellDetalleLev align="center">ha</CellDetalleLev>
                                <CellDetalleLev align="center">Costo Cultivo</CellDetalleLev>
                                <CellDetalleLev align="center">Monto Base</CellDetalleLev>
                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                estacado?.detalles?.length > 0  && estacado?.detalles?.map((row) => {
                                
                                    var ha=row.ha;
                                    var precioHectarea=row.afectacion.precioHectarea;
                                    var montoBase=ha*precioHectarea;
                                    
                                    return(
                                        <StyledTableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            key={row.iddetalleLevantamiento}
                                        >
                        
                                            <StyledTableCell  component="th" scope="row">
                                                {row.tip_linea.tipoLinea}
                                            </StyledTableCell>
                                            <StyledTableCell  align="right">{row.linea}</StyledTableCell>
                                            <StyledTableCell  align="center">{row.mtsIni?`${row.estacaIni}+${row.mtsIni}`:row.estacaIni}</StyledTableCell>
                                            <StyledTableCell  align="right">{row.mtsFin?`${row.estacaFin}+${row.mtsFin}`:row.estacaFin}</StyledTableCell>
                                            <StyledTableCell  align="right">{row.afectacion.cultivo}</StyledTableCell>
                                            <StyledTableCell  align="right">{row.metros}</StyledTableCell>
                                            <StyledTableCell  align="right">{row.metros2}</StyledTableCell>
                                            <StyledTableCell  align="right">{row.km}</StyledTableCell>
                                            <StyledTableCell  align="right">{ha}</StyledTableCell>
                                            <StyledTableCell  align="right">{FormatearEnPesos(precioHectarea)}</StyledTableCell>
                                            <StyledTableCell  align="right">{FormatearEnPesos(montoBase)}</StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })
                            }
                
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
        <div className="row justify-content-center mt-3">
            <div className="col-3 text-center">
                <img src={estacado.imgUrl} alt="Imagen levantamiento" className='img-thumbnail' />
            </div>
        </div>

    </>

  )
}

export default DetalleLevantamiento