import {DataGrid,GridActionsCellItem} from '@mui/x-data-grid';
import  { useState,useCallback } from "react";
import EditIcon from '@mui/icons-material/Edit';
import gridStyles from '../DataGrid/DataGridStyles';
import CustomPagination from '../DataGrid/CustomPagination';
import CustomFooter from '../DataGrid/CustomFooter';
import customLocaleText from '../../constants/localeText';
import { Tooltip } from '@mui/material';
import { showAlertUpdate } from '../../services/uilities.service';


const DataTableConta = ({rows,loading,rowCount,onRowClick}) => {
    const [pageSize, setPageSize] = useState(5);
    //const [loading, setLoading] = useState(false);
    //const [rowCount, setRowCount] = useState(10);

    const updateEstatus = useCallback(
        (row) => () => {
            console.log(row)
            document.activeElement.blur();
            showAlertUpdate(row)
            //navigate("/editar/"+id);
            //window.open('#/products/edit/'+id,'_blank')
        },
        [],
    );

    const columns= [
        { field: 'idContabilidadEstatus', headerName: 'Id', flex: 1,maxWidth:60,headerClassName: 'theme-header'},
        { field: 'propietario', headerName: 'Propietario',width:240,headerClassName: 'theme-header',
        headerAlign: 'center',align:'center'},
        { field: 'RFC', headerName: 'RFC',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center'},
        { field: 'idProyecto', headerName: 'Proyecto',description:
        'Nombre Proyecto',headerClassName: 'theme-header',headerAlign: 'center',align:'center'},
        { field: 'IdLinea', headerName: 'Linea',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',maxWidth:220},
        { field: 'nombreStatus', headerName: 'Estatus ante SAT',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center', renderCell: (params) => <strong>{params.value}</strong> ,},
        { field: 'facturaPor', headerName: 'Facturado',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center', valueGetter: (value, row) => {
            if (row.nombreStatus=='Autorizado') {
              return 'COMESA';
            }
            return '';
        },},

        //TODO FALTA BOTON PARA CAMBIAR ESTATUS
        {   
            maxWidth:50,
            headerClassName: 'theme-header',
            description:'Editar',
            field: 'actions',
            type: 'actions',
            align:'right',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title="Actualizar Estatus"><EditIcon fontSize="small" /></Tooltip>
                    }
                    label="Editar"
                    onClick={updateEstatus(params.row)}
                />,
             
            ],
        },
    ];

    
    

   

    return (
        <div style={{ width: '100%' }}>
            <div style={{  height: 450,width: '100%', overflowX: 'auto' }}>
                <DataGrid
                    //autoHeight
                    //localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    loading={loading}
                    localeText={customLocaleText}
                    //*rowCount={rowCount}
                     sx={gridStyles}
                    rows={rows}
                    columns={columns}
                   // pageSize={pageSize || 5}
                    pageSizeOptions={[5, 10, 25,100]}
                    getRowId={(row) => row.idContabilidadEstatus}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableColumnResize={false}
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    disableSelectionOnClick
                    disableRowSelectionOnClick
                    pagination
                    initialState={{
                        pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                        },
                    }}
                    slots={{
                        footer: CustomFooter,
                        pagination: CustomPagination,
                    }}
                    slotProps={{
                        footer: { rowCount },
                        // footer: { total: rows.length }//*si se requiere cambiar el nombre de la variable en CustomFooter
                        pagination: {
                            labelRowsPerPage: 'Filas por página',
                            // labelDisplayedRows: ({ from, to, count }) =>
                            //     `${from} - ${to} de ${count === -1 ? `more than ${to}` : count}`,
                        },
                    }}
                    //onRowClick={onRowClick}
                   /*experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={({row}) =>{
                        console.log(row)
                    } }*/
                
            
            
                />
            </div>
        </div>
    )
}

export default DataTableConta