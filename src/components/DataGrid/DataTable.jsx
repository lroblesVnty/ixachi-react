import {DataGrid,GridToolbar,GridActionsCellItem} from '@mui/x-data-grid';
import  { useState,useEffect } from "react";
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil} from '@fortawesome/free-solid-svg-icons' */
import EditIcon from '@mui/icons-material/Edit';
import {useCallback} from 'react';
import gridStyles from './DataGridStyles';
import CustomPagination from './CustomPagination';
import { CustomFooter } from './CustomFooter';
import customLocaleText from '../../constants/localeText';


const DataTable = ({rows,loading}) => {
    const [pageSize, setPageSize] = useState(5);
    //const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(10);

    const columns= [
        { field: 'IdLevantamiento', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header'},
        { field: 'nombre', headerName: 'Nombre Miembro',flex: 1,headerClassName: 'theme-header',
        headerAlign: 'center',align:'center' },
        { field: 'fechaLevantamiento', headerName: 'Fecha de Levantamiento',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center'},
        { field: 'IdPermiso', headerName: 'N°.Permiso',flex: 1,description:
        'The identification used by the person with access to the online service.',headerClassName: 'theme-header',
        headerAlign: 'center',align:'center',  valueGetter: (value,row) => row.permiso.IdPermiso,},
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
        <div className="row justify-content-center">
            <div style={{ width: '100%', maxWidth: '950px', overflowX: 'auto' }}>
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
                        pagination: {
                            labelRowsPerPage: 'Filas por página',
                            // labelDisplayedRows: ({ from, to, count }) =>
                            //     `${from} - ${to} de ${count === -1 ? `more than ${to}` : count}`,
                        },
                    }}
            
                    experimentalFeatures={{ newEditingApi: true }}
                // onRowClick={(rowData) => verDetalle(rowData.row)}
            
            
                />
            </div>
        </div>
    )
}

export default DataTable