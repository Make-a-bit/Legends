import React, { useState, useContext, useRef, useEffect } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { useTranslation } from 'react-i18next';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import { SHOW_LOADING, HIDE_LOADING } from "../context/actions/actionTypes.js";

const ConfirmModal = ({
    show,
    onHide,
    title = "",
    message = "",
    onConfirm,
}) => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();

    const handleConfirm = async () => {
        dispatch({ type: SHOW_LOADING })
        try {
            await dispatch(onConfirm());
            onHide();
        } catch (err) {
            console.error("Error saving new data:", err)
        } finally {
            dispatch({ type: HIDE_LOADING })
        }
    };

    return (
        <Dialog open={show} onClose={onHide}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: "90%", sm: "500px", md: "500px", lg: "500px" },
                        maxWidth: "90%",
                        padding: "20px",
                    },
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                <Typography component="p" sx={{ whiteSpace: 'pre-line', fontWeight: 'bold' }}>
                    {message.split('\n')[0]}
                </Typography>
                <Typography component="p" sx={{ whiteSpace: 'pre-line' }}>
                    {message.split('\n').slice(1).join('\n')}
                </Typography>
            </DialogContent>
            <DialogActions sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "20px"

            }}>
                <Button
                    size="small"
                    color="success"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={onHide}
                >
                    {t('cancel')}
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleConfirm}
                >
                    {t('delete')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;