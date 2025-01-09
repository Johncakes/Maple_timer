import AddIcon from "@mui/icons-material/Add";

export default function AddCardButton(props: { setOpen: () => void }) {
  return (
    <button
      onClick={props.setOpen}
      className="p-1 border-2 rounded-lg w-full text-white mt-2"
    >
      <AddIcon sx={{ color: "#757575" }} />
    </button>
  );
}
