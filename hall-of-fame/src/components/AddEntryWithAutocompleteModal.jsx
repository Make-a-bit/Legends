import React, { useState, useContext, useRef, useEffect } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import {
    Autocomplete, Box, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, FormControl, TextField
} from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from 'react-i18next';
import { SHOW_LOADING, HIDE_LOADING } from "../context/actions/actionTypes.js"

const AddEntryWithAutocomplete = ({ schema, valuesMap, show, onHide, onExit, action, title }) => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({});
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (show && nameInputRef.current) nameInputRef.current.focus();
    }, [show]);

    // Get options for each field from valuesMap
    const getOptionsForField = (field) => {
        return valuesMap?.[field] || [];
    };

    const handleAutocompleteChange = (field) => (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            [field]: newValue ? newValue.id : ""
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SHOW_LOADING });

        // Prepare form data for submission (convert objects to IDs for API)
        const submitData = { ...formData };

        // Convert autocomplete objects back to IDs for submission
        if (valuesMap) {
            Object.keys(valuesMap).forEach(field => {
                if (submitData[field] && typeof submitData[field] === "object" && "id" in submitData[field]) {
                    submitData[field] = submitData[field].id;
                }
            });
        }

        try {
            await dispatch(action(submitData, t));
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
                    if (input.type === "autocomplete") {
                        const options = getOptionsForField(input.field);
                        return (
                            <FormControl fullWidth margin="normal" key={input.field}>
                                <Autocomplete
                                    options={options}
                                    getOptionLabel={option => {
                                        if (!option) return '';
                                        return option.kategoria || option.nimi || option.name || option.maa || option.kisatyyppi || '';
                                    }}
                                    value={options?.find(v => v.id === formData[input.field]) || null}
                                    onChange={handleAutocompleteChange(input.field)}
                                    isOptionEqualToValue={(option, value) =>
                                        value === null || option?.id === value?.id
                                    }
                                    renderInput={params => (
                                        <TextField {...params} label={input.headerName} required={input.required !== false} />
                                    )}
                                />
                            </FormControl>
                        );
                    }

                    return (
                        <TextField
                            key={input.field}
                            inputRef={index === 0 ? nameInputRef : null}
                            label={input.headerName}
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

export default AddEntryWithAutocomplete;