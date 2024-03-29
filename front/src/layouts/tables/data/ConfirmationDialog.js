/* eslint-disable */
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ConfirmationDialog = ({ open, handleClose, handleConfirm }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Confirmation de suppression</DialogTitle>
    <DialogContent>
      Êtes-vous sûr de vouloir supprimer cet agent ?
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">Annuler</Button>
      <Button onClick={handleConfirm} color="error">Supprimer</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;