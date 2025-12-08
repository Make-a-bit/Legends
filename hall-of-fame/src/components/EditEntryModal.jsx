import React, { useState, useEffect, useContext } from "react";
import { MembersContext } from '../context/GlobalState.jsx'
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControl, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from 'react-i18next';
import { SHOW_LOADING, HIDE_LOADING } from "../context/actions/actionTypes.js"

const EditEntryModal = ({ schema, onClose, onHide, onExit, show, title, entry, action }) => {
    const { state, dispatch } = useContext(MembersContext);
    const [formData, setFormData] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        if (entry) {
            setFormData(entry);
        }
    }, [entry]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SHOW_LOADING });

        const payload = Object.entries(formData).reduce((acc, [key, value]) => {
            // if value is undefined, null, or an empty string, keep original value
            if (value === undefined || value === null || value === "") {
                acc[key] = entry[key];
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});

        try {
            await dispatch(action(payload, t));
        } catch (error) {
            console.error("Error updating entry:", error);
        } finally {
            setFormData({});
            onClose();
            onExit();
            dispatch({ type: HIDE_LOADING });
        }
    };

    return (
        <Dialog
            open={show}
            onClose={onHide}
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
                <Box component="form" onSubmit={handleSubmit}>
                    {schema.map((field, index) => {
                        // handle select fields if you ever add them
                        if (field.type === "select") {
                            return (
                                <FormControl fullWidth margin="normal" key={field.field}>
                                    <InputLabel>{field.headerName}</InputLabel>
                                    <Select
                                        name={field.field}
                                        value={formData[field.field] || ""}
                                        onChange={handleChange}
                                        label={field.headerName}
                                    >
                                        {field.options?.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );
                        }

                        // default text input
                        return (
                            <TextField
                                key={field.field}
                                margin="normal"
                                fullWidth
                                label={field.headerName}
                                name={field.field}
                                type={field.type === "string" ? "text" : field.type}
                                value={formData[field.field] || ""}
                                onChange={handleChange}
                                required={field.required !== false}
                            />
                        );
                    })}
                </Box>
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
}

export default EditEntryModal;