import { Card } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { yellow, indigo, amber, grey } from "@mui/material/colors";

export default function PetState(props: { petTime: Date | null }) {
  const currentTime = new Date();
  if (props.petTime != null) {
    if (currentTime > props.petTime) {
      return <LightModeIcon sx={{ color: amber[500] }} fontSize="small" />;
    } else {
      return <ModeNightIcon sx={{ color: amber[500] }} fontSize="small" />;
    }
  }
  return <ModeNightIcon sx={{ color: grey[500] }} fontSize="small" />;
}
