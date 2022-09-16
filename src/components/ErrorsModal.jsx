import React, { useState } from "react";
import { inject, observer } from "mobx-react";
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

function ErrorsModal({ dataStore }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    dataStore.setHasErrors(false); 
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
            {Object.keys(dataStore.errors).map(
              (error, i) =>
              dataStore.errors[error] !== undefined && (
                  <li key={i}>
                    {error}: {dataStore.errors[error]}
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

export default inject(["dataStore"])(observer(ErrorsModal));