import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

export default function AddCardButton(props: { setOpen: () => void }) {
  return (
    <Button fullWidth variant="contained" onClick={props.setOpen}>
      <AddIcon sx={{}} />
    </Button>
  );
}
