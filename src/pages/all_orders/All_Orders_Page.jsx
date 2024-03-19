import { Typography, Container, IconButton, Box, Paper } from "@mui/material";
import { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [expanded, setExpanded] = useState(false);

  const handleExpand = (event, rowId) => {
    if (expanded === 0 || expanded !== rowId) {
      setExpanded(rowId);
    } else if (expanded === rowId) {
      setExpanded(0);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/orders/");
        setOrders(data);
      } catch (e) {
        console.log(
          "An error occurred in all_orders/All_Orders_Page.jsx while retrieving orders:",
          e
        );
      }
    })();
  }, []);
  const saveData = async (updatedRow) => {
    try {
      if (updatedRow._id) {
        let { data } = await axios.patch(`/orders/${updatedRow._id}`, {
          status: updatedRow.status,
        });
        console.log(data);
      }
    } catch (e) {
      console.log("An error occurred while patching order:", e);
    }
  };
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    saveData(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = orders.find((row) => row._id === id);
    if (editedRow.isNew) {
      setOrders(orders.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setOrders(orders.map((row) => (row._id === newRow._id ? updatedRow : row)));
    saveData(updatedRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "orderNum",
      headerName: "Order Number",
      width: 140,
      editable: false,
      cellClassName: "gridCell",
    },
    {
      field: "total",
      headerName: "Total",
      width: 140,
      align: "left",
      headerAlign: "left",
      editable: false,
      renderCell: (params) => (
        <Typography variant="body2">{params.row.total}&#8362;</Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "items",
      headerName: "Items",
      width: 500,
      align: "left",
      headerAlign: "left",
      editable: false,
      renderCell: (params) => (
        <Fragment>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(event) => handleExpand(event, params.id)}
          >
            {expanded === params.id ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
          <Collapse in={expanded === params.id} timeout="auto" unmountOnExit>
            <List>
              {params.row.items.map((item) => (
                <ListItem key={item.productId}>
                  <Typography sx={{ fontSize: "12px" }} color="secondary">
                    {item.name} | x{item.quantity} | {item.priceCol}&#8362;
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "right",
      headerAlign: "right",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <Container
      sx={{
        pt: 5,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component={Paper}
        sx={{ width: "100vw", border: "1px solid black", mb: 2 }}
      >
        <Typography variant="h3">All Orders</Typography>
        <Typography variant="h5">Order status is editable</Typography>
      </Box>
      <Box
        component={Paper}
        sx={{ width: { xs: "100vw", sm: "100vw", md: "50vw", lg: "50vw" } }}
      >
        <DataGrid
          rows={orders}
          columns={columns}
          editMode="cell"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          getRowId={(row) => row._id}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 8, page: 0 },
            },
          }}
          pageSizeOptions={[8, 15, 20]}
          slotProps={{
            toolbar: { setOrders, setRowModesModel },
          }}
        />
      </Box>
    </Container>
  );
};
export default AllOrders;
