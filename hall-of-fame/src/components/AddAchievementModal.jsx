import React, { useState, useContext, useEffect } from 'react';
import { MembersContext } from '../context/GlobalState.jsx';
import {
    Autocomplete, Button, Box, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from 'react-i18next';
import { SHOW_LOADING, HIDE_LOADING } from "../context/actions/actionTypes.js";
import { addAchievement } from '../context/actions/achievementActions.js';

const AddAchievementModal = ({ show, onHide, onExit, athleteId }) => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        urheilija: athleteId,
        kilpailutyyppi: null,
        kilpailu: null,
        laji: null,
        saavutustyyppi: null,
        tulos: '',
        lisatieto: ''
    });

    // Reset form data when modal is shown
    useEffect(() => {
        if (show) {
            setFormData({
                urheilija: athleteId,
                kilpailutyyppi: null,
                kilpailu: null,
                laji: null,
                saavutustyyppi: null,
                tulos: '',
                lisatieto: ''
            });
        }
    }, [show, athleteId]);

    // Extract necessary data from global state with safety checks
    const competitionTypes = Array.isArray(state.competitionTypes) ? state.competitionTypes : [];
    const competitions = Array.isArray(state.competitions) ? state.competitions : [];
    const events = Array.isArray(state.events) ? state.events : [];
    const achievementTypes = Array.isArray(state.achievementTypes) ? state.achievementTypes : [];
    const athletes = Array.isArray(state.athletes) ? state.athletes : [];

    // Find current athlete to get their sport category
    const currentAthlete = athletes.find(a => a.id === athleteId);
    const athleteSportCategoryId = currentAthlete?.urheilukategoria?.urheilukategoria_id;

    // Filter competitions based on selected competition type
    const filteredCompetitions = formData.kilpailutyyppi
        ? competitions.filter(c => c.kisatyyppi?.id === formData.kilpailutyyppi)
        : competitions;

    // Filter events based on athlete's sport category
    // Note: events have urheilukategoria.id, athlete has urheilukategoria.urheilukategoria_id
    const filteredEvents = athleteSportCategoryId
        ? events.filter(e => e.urheilukategoria?.id === athleteSportCategoryId)
        : events;

    // Handle changes in Autocomplete fields
    // If competition type changes, reset competition field
    // If competition changes, reset event and achievement type fields
    // If event changes, reset achievement type field
    const handleAutocompleteChange = (field) => (_, newValue) => {
        setFormData(prev => {
            const updated = {
                ...prev,
                [field]: newValue ? newValue.id : null
            };

            // Reset competition when competition type changes
            if (field === 'kilpailutyyppi') {
                updated.kilpailu = null;
            }

            return updated;
        });
    };

    // Handle changes in TextField inputs
    // Update formData state accordingly
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    // Prepare data and dispatch addAchievement action
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SHOW_LOADING });

        // Prepare data for API with correct field names
        const apiData = {
            urheilija_id: formData.urheilija,
            kisa_id: formData.kilpailu,  
            laji_id: formData.laji,
            saavutusluokka_id: formData.saavutustyyppi,
            tulos: formData.tulos,
            lisatieto: formData.lisatieto
        };

        try {
            await dispatch(addAchievement(apiData, t));
            onExit();
            onHide();
        } catch (error) {
            console.error("Error adding achievement:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
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
            <DialogTitle>{t('addAchievement')}</DialogTitle>
            <DialogContent dividers
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    pt: 2
                }}>

                <Autocomplete
                    options={competitionTypes}
                    getOptionLabel={(option) => option.kisatyyppi || ''}
                    value={competitionTypes.find(ct => ct.id === formData.kilpailutyyppi) || null}
                    onChange={handleAutocompleteChange('kilpailutyyppi')}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('competitionType')}
                            variant="outlined" />
                    )}
                />

                <Autocomplete
                    options={filteredCompetitions}
                    getOptionLabel={(option) => {
                        if (!option) return '';
                        const year = option.vuosi || '';
                        const name = option.nimi || '';
                        const city = option.kaupunki || '';
                        return `${year}: ${name}${city ? ` (${city})` : ''}`;
                    }}
                    value={filteredCompetitions.find(c => c.id === formData.kilpailu) || null}
                    onChange={handleAutocompleteChange('kilpailu')}
                    disabled={!formData.kilpailutyyppi}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('competitionName')}
                            required
                            variant="outlined"
                        />
                    )}
                />

                <Autocomplete
                    options={filteredEvents}
                    getOptionLabel={(option) => option.laji || ''}
                    value={filteredEvents.find(e => e.id === formData.laji) || null}
                    onChange={handleAutocompleteChange('laji')}
                    disabled={!formData.kilpailu}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('eventName')}
                            variant="outlined" />
                    )}
                />

                <Autocomplete
                    options={achievementTypes}
                    getOptionLabel={(option) => option.saavutusluokka || ''}
                    value={achievementTypes.find(at => at.id === formData.saavutustyyppi) || null}
                    onChange={handleAutocompleteChange('saavutustyyppi')}
                    disabled={!formData.laji}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('achievementType')}
                            required
                            variant="outlined" />
                    )}
                />

                <TextField
                    fullWidth
                    label={t('result')}
                    name="tulos"
                    value={formData.tulos}
                    disabled={!formData.saavutustyyppi}
                    onChange={handleChange}
                    variant="outlined"
                />

                <TextField
                    fullWidth
                    label={t('additionalInfo')}
                    name="lisatieto"
                    value={formData.lisatieto}
                    disabled={!formData.saavutustyyppi}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={2}
                />
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

export default AddAchievementModal;