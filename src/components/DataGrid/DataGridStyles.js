const gridStyles={
    "& .theme-header": {
        backgroundColor: 'rgb(28, 102, 178)',
        color: "white",
    },
    "& .MuiDataGrid-toolbarContainer": {
        //: '#074682',
        "& .MuiButton-text": {
        //color: 'rgb(13, 13, 14)',
        color: "black",
        },
        "& .MuiBadge-badge": {
        //backgroundColor: '#074682',
        backgroundColor: "white",
        },
        /*'& .MuiInput-input':{
                                color:'rgb(81,81,81)'
                            },*/
        "& .MuiInputBase-root": {
        //texto e icono
            //color: "rgb(210, 224, 223)",
            color:"black"
        },
        "& .MuiSvgIcon-root": {
        //only icons
        // color:'red'
        },
    },
    border: 2,
    borderColor: "rgb(28, 102, 178)",
    "& .MuiDataGrid-row:hover": {
        color: "primary.main",
        backgroundColor: "rgba(147, 203, 248, 0.11)",
        cursor:'pointer'
    },
    ".MuiDataGrid-columnSeparator": {
        //display: 'none',
        color: "rgb(81,81,81)",
    },
    ".MuiDataGrid-row": {
        color: "black",
        //borderColor:'black'
    },
    ".MuiDataGrid-cell": {
        borderBottomColor: "rgb(81,81,81)",
    },
    "& .MuiDataGrid-footerContainer": {
        color: "black",
        "& .MuiPaginationItem-text": {
            //color: "rgb(210, 224, 223)",
            color:'black'
        },
    },
    "& .MuiDataGrid-cell--withRenderer": {
        color: "red",
        "& .MuiIconButton-root": {
        //color: 'rgb(13, 13, 14)',
        //color:'red'
        color: "#02b99b",
        },
    },
    "& .MuiIconButton-root": {
        color: "black",
    },
    '.MuiTablePagination-displayedRows': {
        'marginTop': '1em',
        'marginBottom': '1em'
    },
    '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
        'marginTop': '1em',
        'marginBottom': '1em'
    }
    /*'.MuiDataGrid-columnHeaders':{
                            borderBottomColor:'red',

                        '.MuiDataGrid-footerContainer':{
                            borderTopColor:'red'
                        }}*/
}

export default gridStyles;