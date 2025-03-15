import {DataGrid,GridToolbar,GridActionsCellItem} from '@mui/x-data-grid';
import  { useState,useEffect } from "react";
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil} from '@fortawesome/free-solid-svg-icons' */
import EditIcon from '@mui/icons-material/Edit';
import {useCallback} from 'react';
import gridStyles from './DataGridStyles';
import CustomPagination from './CustomPagination';
import CustomFooter from './CustomFooter';
import customLocaleText from '../../constants/localeText';


const DataTable = ({rows,loading,rowCount,onRowClick}) => {
    const [pageSize, setPageSize] = useState(5);
    //const [loading, setLoading] = useState(false);
    //const [rowCount, setRowCount] = useState(10);

    const columns= [
        { field: 'IdLevantamiento', headerName: 'Id Lev', flex: 1,maxWidth:60,headerClassName: 'theme-header'},
        { field: 'propietario', headerName: 'Propietario',width:240,headerClassName: 'theme-header',
        headerAlign: 'center',align:'center',valueGetter: (value,row) => row.permiso.predio.propietario.nombre },
        { field: 'fechaLevantamiento', headerName: 'Fecha de Levantamiento',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center'},
        { field: 'IdPermiso', headerName: 'N°.Permiso',description:
        'Permiso del Lev.',headerClassName: 'theme-header',headerAlign: 'center',align:'center',  valueGetter: (value,row) => row.permiso.IdPermiso,width:100,maxWidth:150},
        { field: 'Proyecto', headerName: 'Proyecto',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',valueGetter: (value,row) => row.permiso.predio.idProyecto,maxWidth:220},
        { field: 'statusPago', headerName: 'Estatus Pago',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center'},
        //TODO agregar las columnas restantes
        {   
            maxWidth:50,
            headerClassName: 'theme-header',
            description:'Editar',
            field: 'actions',
            type: 'actions',
            align:'right',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon fontSize="small" />}
                    label="Editar"
                    // onClick={edit(params.row)}
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
                    getRowId={(row) => row.IdLevantamiento}
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
                    onRowClick={onRowClick}
                   /*experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={({row}) =>{
                        console.log(row)
                    } }*/
                
            
            
                />
            </div>
        </div>
    )
}

export default DataTable