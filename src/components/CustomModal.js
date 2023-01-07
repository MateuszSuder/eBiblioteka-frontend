import React from 'react';
import {Grid, Modal} from "@mui/material";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto"
};

const CustomModal = ({open, setOpen, children, customStyle}) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Grid container sx={{...modalStyle, ...customStyle}}>
                {children}
            </Grid>
        </Modal>
    );
};

export default CustomModal;