import React, { useState, useContext, useRef, useEffect } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from 'react-i18next';
import { SHOW_LOADING, HIDE_LOADING } from "../context/actions/actionTypes.js"

const AddEntryModal = ({ schema, show, onHide, onExit, action, title }) => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({});
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (show && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SHOW_LOADING });

        const payload = { ...formData };

        try {
            await dispatch(action(payload, t));
        } catch (error) {
            console.error("Error adding entry:", error);
        } finally {
            setFormData({});
            onHide();
            onExit();
            dispatch({ type: HIDE_LOADING });
        }
    };

    return (
        <Dialog
            open={show}
            onClose={onHide}
            TransitionProps={{
                onExited: onExit,
            }}
            slotProps={{
                transition: {
                    onEntered: () => {
                        if (nameInputRef.current) {
                            nameInputRef.current.focus();
                        }
                    }
                },
                paper: {
                    sx: {
                        width: {
                            xs: '90%',
                            sm: '500px',
                            md: '500px',
                            lg: '500px'
                        },
                        maxWidth: '90%',
                        padding: '20px',
                    }
                }
            }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {schema.map((input, index) => {
                    return (
                        <TextField
                            key={input.field}
                            inputRef={index === 0 ? nameInputRef : null} label={input.headerName}
                            name={input.field}
                            value={formData[input.field] || ""}
                            onChange={handleChange}
                            margin="normal"
                            required={input.required !== false}
                            fullWidth
                        />
                    );
                })}
            </DialogContent>

            <DialogActions sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>
                    <Button
                        onClick={onHide}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        sx={{ ml: 2 }}
                    >
                        {t('cancel')}
                    </Button>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="success"
                        startIcon={<SaveIcon />}
                        sx={{
                            mt: 2,
                            mr: 2
                        }}>
                        {t('save')}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default AddEntryModal;
