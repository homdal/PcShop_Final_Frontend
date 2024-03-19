import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";

const EditToolbar = (props) => {
  const { setSpecs, setRowModesModel } = props;

  const handleClick = () => {
    const _id = Math.floor(Math.random() * 1000 + 1);
    setSpecs((oldRows) => [
      ...oldRows,
      { _id, specName: "", specDesc: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [_id]: { mode: GridRowModes.Edit, fieldToFocus: "specName" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};
export default EditToolbar;
