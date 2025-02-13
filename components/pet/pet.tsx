import Image from "next/image";
import petIcon from "../../Images/petIcon.png";
import i18n from "@/locales/config";
import { Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Pet(props: {
  petTime: Date | null;
  setPetTime: (time: Date | null) => void;
}) {
  function changeTime(iHour: number, iMin: number) {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + iHour);
    currentTime.setMinutes(currentTime.getMinutes() + iMin);

    return currentTime;
  }

  function formattedTime(time: Date | null) {
    if (!time) return "--:--";
    console.log("before Format : ", time);
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  }

  return (
    <div className="relative flex rounded w-full">
      <div className="absolute top-0 right-0">
        <IconButton onClick={() => props.setPetTime(null)}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex flex-col items-center border dark:border-zinc-600 p-2 rounded w-full">
        <Image
          src={petIcon}
          alt="Pet"
          width={48}
          height={48}
          className="border dark:border-none rounded p-2 bg-gray-100 dark:bg-zinc-600"
        />

        <div className="dark:text-white text-xs sm:text-base md:text-lg my-2">
          {i18n.t("pet.wake_time", { time: formattedTime(props.petTime) })}
        </div>

        <div className="flex w-full flex-row space-x-2 sm:text-base">
          <Button
            style={{ textTransform: "none" }}
            fullWidth
            variant="contained"
            onClick={() => props.setPetTime(changeTime(21, 0))}
            size="small"
            sx={{ boxShadow: 0 }}
          >
            {i18n.t("pet.time.21hr")}
          </Button>
          <Button
            style={{ textTransform: "none" }}
            fullWidth
            variant="contained"
            onClick={() => props.setPetTime(changeTime(0, 30))}
            size="small"
            sx={{ boxShadow: 0 }}
          >
            {i18n.t("pet.time.30min")}
          </Button>
        </div>
      </div>
    </div>
  );
}
