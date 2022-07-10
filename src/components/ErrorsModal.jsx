import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ErrorsModal() {
  const [open, setOpen] = useState(true);
  const { errors, setValid } = useContext(DataContext);

  const handleClose = () => {
    setValid(undefined);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Error!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {Object.keys(errors).map(
              (error, i) =>
                errors[error] !== undefined && (
                  <li key={i}>
                    {error}: {errors[error]}
                  </li>
                )
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
