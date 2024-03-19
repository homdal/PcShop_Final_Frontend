import { Box, Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditToolbar from "./EditToolBar";
import { useEffect } from "react";
import {
  desktopRows,
  laptopRows,
  processorRows,
  motherboardRows,
  videoCardRows,
  memoryRows,
  storageRows,
  powerSupplyRows,
  periphery,
} from "./table_templates";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const SpecTable = ({ category, subCategory, submit }) => {
  const [specs, setSpecs] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    if (category === "Desktop") {
      setSpecs(desktopRows);
      return;
    } else if (category === "Laptop") {
      setSpecs(laptopRows);
      return;
    } else if (category === "Periphery") {
      setSpecs(periphery);
      return;
    } else if (category === "Hardware" && subCategory === "Processor") {
      setSpecs(processorRows);
      return;
    } else if (category === "Hardware" && subCategory === "Motherboard") {
      setSpecs(motherboardRows);
      return;
    } else if (category === "Hardware" && subCategory === "Video Card") {
      setSpecs(videoCardRows);
      return;
    } else if (category === "Hardware" && subCategory === "Memory") {
      setSpecs(memoryRows);
      return;
    } else if (category === "Hardware" && subCategory === "Storage") {
      setSpecs(storageRows);
      return;
    } else if (category === "Hardware" && subCategory === "Power Supply") {
      setSpecs(powerSupplyRows);
      return;
    } else {
      setSpecs([]);
    }
  }, [category, subCategory]);

  const handleSubmitClick = (e) => {
    let dataArray = [];
    if (category === "Desktop" || category === "Laptop") {
      for (let spec of specs) {
        if (!spec.specDesc) {
          setErrorState("Must enter specifications for this category");
          return;
        }
        dataArray.push({ specName: spec.specName, specDesc: spec.specDesc });
      }
    }
    setErrorState(false);
    submit(e, dataArray);
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
  };

  const handleDeleteClick = (id) => () => {
    setSpecs(specs.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = specs.find((row) => row.id === id);
    if (editedRow.isNew) {
      setSpecs(specs.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setSpecs(specs.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "specName",
      headerName: "Specification Name",
      width: 180,
      editable: true,
    },
    {
      field: "specDesc",
      headerName: "Description",
      width: 300,
      align: "left",
      headerAlign: "left",
      editable: true,
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
        if (category === "Desktop" || category === "Laptop") {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
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
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <Fragment>
      {errorState && <Typography color="error">{errorState}</Typography>}
      <DataGrid
        rows={specs}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8, page: 0 },
          },
        }}
        pageSizeOptions={[8, 15]}
        slots={{
          toolbar:
            category === "Desktop" || category === "Laptop" ? "" : EditToolbar,
        }}
        slotProps={{
          toolbar: { setSpecs, setRowModesModel },
        }}
      ></DataGrid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button className="productButton" onClick={handleSubmitClick}>
          Add
        </Button>
      </Box>
    </Fragment>
  );
};

export default SpecTable;
