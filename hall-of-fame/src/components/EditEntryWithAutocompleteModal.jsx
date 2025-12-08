import React, { useEffect, useState, useContext } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Autocomplete
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from 'react-i18next';
import { SHOW_LOADING, HIDE_LOADING } from "../context/actions/actionTypes.js"

const EditEntryWithAutocompleteModal = ({ entry, valuesMap, action, show, onHide, onExit, title, schema, onDelete }) => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({});

    // Initialize form data only when modal opens
    useEffect(() => {
        if (!show || !entry || !valuesMap) return;

        const initial = { ...entry };

        // Map autocomplete fields to valuesMap objects
        Object.keys(valuesMap).forEach(field => {
            // Try to get the value directly from the field
            let entryValue = entry[field];

            // If not found and field ends with _id, try without _id suffix
            if (!entryValue && field.endsWith('_id')) {
                const fieldWithoutId = field.replace(/_id$/, '');
                entryValue = entry[fieldWithoutId];
            }

            if (!entryValue) {
                initial[field] = null;
                return;
            }

            // Get ID from entry value
            // Some objects store ID in .id, others in field-specific ID (e.g., urheilukategoria_id)
            let entryId;
            if (typeof entryValue === 'object') {
                // Try multiple ID field patterns
                entryId = entryValue.id ||                      // Standard: maa.id
                         entryValue[field] ||                   // Field-specific: object[field_name]
                         entryValue.urheilukategoria_id ||      // Specific: urheilukategoria.urheilukategoria_id
                         entryValue.maa_id;                     // Specific: maa.maa_id
            } else {
                entryId = entryValue;
            }

            // Find matching object in valuesMap
            const matchedOption = valuesMap[field]?.find(opt => opt.id === entryId);
            initial[field] = matchedOption || null;
        });

        setFormData(initial);
    }, [show, entry, valuesMap]);

    const handleAutocompleteChange = (field) => (_, newValue) => {
        setFormData(prev => ({
            ...prev,
            [field]: newValue
        }));
    };

    const handleTextChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = async () => {
        dispatch({ type: SHOW_LOADING });
        const submitData = { ...formData };

        // Convert autocomplete objects to IDs for API
        Object.keys(valuesMap || {}).forEach(field => {
            if (submitData[field]?.id) {
                submitData[field] = submitData[field].id;
            }
        });

        try {
            await dispatch(action(submitData, t));
        } catch (error) {
            console.error("Error updating entry:", error);
        } finally {
            setFormData({});
            onExit();
            onHide();
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
            <DialogContent dividers
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, pt: 2,
                }}>
                {/* Autocomplete fields from valuesMap */}
                {valuesMap && Object.keys(valuesMap).map(field => {
                    const options = valuesMap[field] || [];
                    const value = formData[field] || null;

                    return (
                        <Autocomplete
                            key={field}
                            options={options}
                            getOptionLabel={(option) => {
                                if (!option) return '';
                                // Handle different field name patterns
                                return option.kategoria ||
                                       option.nimi ||
                                       option.maa ||
                                       option.name ||
                                       option.urheilukategoria_nimi ||
                                       option.kisatyyppi ||
                                       '';
                            }}
                            value={value}
                            onChange={handleAutocompleteChange(field)}
                            isOptionEqualToValue={(opt, val) =>
                                !val || opt?.id === val.id
                            }
                            renderInput={(params) => {
                                const schemaField = schema?.find(s => s.field === field);
                                const required = schemaField?.required !== false;
                                return (
                                    <TextField
                                        {...params}
                                        label={t(field) || field}
                                        variant="outlined"
                                        required={required} />
                                );
                            }}
                        />
                    );
                })}

                {/* Text fields from schema */}
                {schema && schema.map(schemaField => {
                    if (schemaField.type === "autocomplete") return null;

                    return (
                        <TextField
                            key={schemaField.field}
                            fullWidth
                            label={schemaField.headerName}
                            value={formData[schemaField.field] || ""}
                            onChange={handleTextChange(schemaField.field)}
                            variant="outlined"
                            required={schemaField.required !== false}
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
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 1
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

                    {onDelete && (
                        <Button
                            onClick={() => {
                                onHide();
                                onDelete();
                            }}
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                        >
                            {t('delete')}
                        </Button>
                    )}
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

export default EditEntryWithAutocompleteModal;