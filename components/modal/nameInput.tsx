import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function NameInput(props: {
  open: boolean;
  close: () => void;
  setName: (name: string) => void;
}) {
  const [name, setName] = useState("");
  return (
    <Modal open={props.open} onClose={props.close}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-white rounded-sm">
        <div className="flex flex-col p-4">
          <label htmlFor="name" className="text-lg">
            Enter Character Name
          </label>
          <input
            type="text"
            id="name"
            className="border p-2 rounded"
            value={name}
            placeholder="Character Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              props.setName(name), props.close();
            }}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
