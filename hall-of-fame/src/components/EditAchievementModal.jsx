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
import { editAchievement } from '../context/actions/achievementActions.js';

const EditAchievementModal = ({ show, onHide, onExit, achievement }) => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        kilpailutyyppi: null,
        kilpailu: null,
        laji: null,
        saavutustyyppi: null,
        tulos: '',
        lisatieto: ''
    });

    useEffect(() => {
        if (show && achievement) {
            setFormData({
                kilpailutyyppi: achievement.kilpailu?.kilpailukategoria?.id || null,
                kilpailu: achievement.kilpailu?.id || null,
                laji: achievement.saavutus?.laji?.id || null,
                saavutustyyppi: achievement.saavutus?.saavutusluokka?.id || achievement.saavutus?.id || null,
                tulos: achievement.saavutus?.tulos || '',
                lisatieto: achievement.saavutus?.lisatiedot || ''
            });
        }
    }, [show, achievement]);

    const competitionTypes = Array.isArray(state.competitionTypes) ? state.competitionTypes : [];
    const competitions = Array.isArray(state.competitions) ? state.competitions : [];
    const events = Array.isArray(state.events) ? state.events : [];
    const achievementTypes = Array.isArray(state.achievementTypes) ? state.achievementTypes : [];

    const athleteSportCategoryId = achievement?.urheilija?.urheilukategoria?.id;

    const filteredCompetitions = formData.kilpailutyyppi
        ? competitions.filter(c => c.kisatyyppi?.id === formData.kilpailutyyppi)
        : competitions;

    const filteredEvents = athleteSportCategoryId
        ? events.filter(e => e.urheilukategoria?.id === athleteSportCategoryId)
        : events;

    const handleAutocompleteChange = (field) => (_, newValue) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: newValue ? newValue.id : null };
            if (field === 'kilpailutyyppi') updated.kilpailu = null;
            return updated;
        });
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SHOW_LOADING });

        const apiData = {
            urheilija_id: achievement.urheilija.id,
            kisa_id: formData.kilpailu,
            laji_id: formData.laji,
            saavutusluokka_id: formData.saavutustyyppi,
            tulos: formData.tulos,
            lisatieto: formData.lisatieto
        };

        try {
            // Tässä käytetään achievementin oikeaa ID:tä URL:ssä
            await dispatch(editAchievement(achievement.saavutus_id, apiData, t));
            onExit();
            onHide();
        } catch (error) {
            console.error("Error editing achievement:", error);
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
            <DialogTitle>{t('editAchievement')}</DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>

                <Autocomplete
                    options={competitionTypes}
                    getOptionLabel={(option) => option.kisatyyppi || ''}
                    value={competitionTypes.find(ct => ct.id === formData.kilpailutyyppi) || null}
                    onChange={handleAutocompleteChange('kilpailutyyppi')}
                    renderInput={(params) => (
                        <TextField {...params} label={t('competitionType')} required variant="outlined" />
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
                        <TextField {...params} label={t('competitionName')} required variant="outlined" />
                    )}
                />

                <Autocomplete
                    options={filteredEvents}
                    getOptionLabel={(option) => option.laji || ''}
                    value={filteredEvents.find(e => e.id === formData.laji) || null}
                    onChange={handleAutocompleteChange('laji')}
                    disabled={!formData.kilpailu}
                    renderInput={(params) => (
                        <TextField {...params} label={t('eventName')} required variant="outlined" />
                    )}
                />

                <Autocomplete
                    options={achievementTypes}
                    getOptionLabel={(option) => option.saavutusluokka || ''}
                    value={achievementTypes.find(at => at.id === formData.saavutustyyppi) || null}
                    disabled={!formData.laji}
                    onChange={(_, newValue) => {
                        setFormData(prev => ({
                            ...prev,
                            saavutustyyppi: newValue ? newValue.id : null
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label={t('achievementType')} required variant="outlined" />
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

export default EditAchievementModal;