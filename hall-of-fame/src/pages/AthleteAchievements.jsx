import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Autocomplete, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import datagridColumns from '../utils/datagridColumns.js';
import dataGridSx from '../utils/datagidSx.js';
import { useTranslation } from 'react-i18next';
import { MembersContext } from '../context/GlobalState.jsx';
import { fetchAchievements, deleteAchievement } from '../context/actions/achievementActions.js'
import { fetchAchievementTypes } from '../context/actions/achievementTypeActions.js'
import { fetchAthletes, editAthlete, deleteAthlete } from '../context/actions/athleteActions.js'
import { fetchCompetitions } from '../context/actions/competitionActions.js'
import { fetchCompetitionTypes } from '../context/actions/competitionTypeActions.js'
import { fetchEvents } from '../context/actions/eventActions.js'
import { fetchSports } from '../context/actions/sportActions.js'
import { fetchCountries } from '../context/actions/countryActions.js'
import ConfirmModal from '../components/ConfirmModal.jsx'
import getAchievementsSchema from '../schema/achievements.js'
import getAthleteSchema from '../schema/athlete.js'
import AddAchievementModal from '../components/AddAchievementModal.jsx'
import EditAchievementModal from '../components/EditAchievementModal.jsx'
import EditEntryWithAutocompleteModal from '../components/EditEntryWithAutocompleteModal.jsx'

const AthleteAchievements = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [showAddAchievement, setShowAddAchievement] = useState(false);
    const [showEditAchievement, setShowEditAchievement] = useState(false);
    const [showDeleteAchievement, setShowDeleteAchievement] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [selectedCompetitionType, setSelectedCompetitionType] = useState(null);
    const [showEditAthlete, setShowEditAthlete] = useState(false);
    const [showDeleteAthlete, setShowDeleteAthlete] = useState(false);

    // Find the athlete by ID from URL params
    const member = state.athletes.find(m => String(m.id) === String(id));

    // Fetch achievements and related data on component mount
    useEffect(() => {
        dispatch(fetchAchievements(t, member));
        dispatch(fetchAthletes(t));
        dispatch(fetchCompetitionTypes(t));
        dispatch(fetchCompetitions(t))
        dispatch(fetchEvents(t));
        dispatch(fetchAchievementTypes(t));
        dispatch(fetchSports(t));
        dispatch(fetchCountries(t));
    }, []);

    const competitionTypes = useMemo(() => (
        Array.isArray(state.competitionTypes) ? state.competitionTypes : []
    ), [state.competitionTypes]);


    // Find achievements for the athlete
    const achievements = useMemo(() => {
        if (!member) return [];

        let filtered = state.achievements.filter(
            a => a.urheilija && String(a.urheilija.id) === String(member.id)
        );

        // Filter by selected competition type if one is selected
        if (selectedCompetitionType) {
            filtered = filtered.filter(
                a => a.kilpailu?.kilpailukategoria?.id === selectedCompetitionType.id
            );
        }

        return filtered;
    }, [member, state.achievements, selectedCompetitionType]);

    const btnDeleteAchievement = useCallback((achievement) => {
        setSelectedAchievement(achievement);
        setShowDeleteAchievement(true);
    }, []);

    const columns = useMemo(
        () => datagridColumns(getAchievementsSchema(t, {
            withWidths: true
        }), btnDeleteAchievement, t),
    )

    const handleRowClick = useCallback((params) => {
        setSelectedAchievement(params.row);
        setShowEditAchievement(true);
    }, []);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    bgcolor: '#f0f0f0',
                    fontFamily: '"Montserrat", Arial, sans-serif',
                    mb: 0
                }}
            >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    mt: 3,
                }}
            >
                {/* Text Section */}
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        gap: 1,
                        borderRadius: '5px',
                        flex: 1,
                        zIndex: 1,
                    }}
                >

                    {/* Name and Flag Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            width: '100%',
                        }}
                    >

                        {/* Name Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                                flex: 1,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    zIndex: 2,
                                    position: 'relative',
                                }}
                            >
                                {member?.etunimi}
                                <em>{member?.kutsumanimi ? ` "${member?.kutsumanimi}" ` : " "}</em>
                                {member?.sukunimi}
                            </Typography>
                        </Box>

                        {/* Flag Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                mr: 2,
                            }}
                        >
                            {member?.maa.lippu_url && (
                                <img src={member?.maa.lippu_url}
                                    alt={`${member?.kansalaisuus} flag`}
                                    style={{
                                        width: '54px', height: '35px',
                                        border: '2px solid black',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* Details and Achievements Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: 1,
                            borderRadius: '5px',
                            width: '100%',
                            zIndex: 2,
                            mt: 2,
                        }}
                    >
                        {member?.syntymavuosi &&
                            <Typography variant="body1">
                                {t('birthYear')}: {member?.syntymavuosi}<br /> {t('age')}: {member?.ika} vuotta
                            </Typography>
                        }

                        {member?.maa.nimi &&
                            <Typography variant="body1">
                                {t('nationality')}: {member?.maa.nimi}
                            </Typography>
                        }

                        {member?.paino &&
                            <Typography variant="body1">
                                {t('weight')}: {member?.paino} kg
                            </Typography>
                        }

                        {member?.urheilukategoria.urheilukategoria_nimi &&
                            <Typography variant="body1">
                                {t('sportName')}: {member?.urheilukategoria.urheilukategoria_nimi}
                            </Typography>
                        }

                        {member?.info && (
                            <Typography variant="body1">
                                {t('info')}: {member?.info}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Image Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        borderRadius: '5px',
                            width: '200px',
                        mr: 2, mt: 2, mb: 2
                    }}
                >
                    {member?.kuva_url && (
                        <img src={member?.kuva_url} alt={`${member?.etunimi} ${member?.sukunimi}`}
                            style={{
                                width: '175px',
                                height: 'auto',
                                border: '3px solid black',
                            }}
                        />
                    )}
                </Box>
                </Box>
            </Paper>

            <Box>
                <Button
                    onClick={() => setShowEditAthlete(true)}
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 2,
                        mb: 2
                    }}
                >
                    {t('editAthlete')}
                </Button>

                <Button
                    onClick={() => setShowAddAchievement(true)}
                    variant="contained"
                    color="success"
                    sx={{
                        mt: 2,
                        mb: 2,
                        ml: 2
                    }}
                >
                    {t('addAchievement')}
                </Button>

            </Box>

            <Autocomplete
                options={competitionTypes}
                getOptionLabel={(option) => option.kisatyyppi || ""}
                value={selectedCompetitionType}
                onChange={(event, newValue) => {
                    setSelectedCompetitionType(newValue)
                }}
                renderInput={(params) => (
                    <TextField {...params} label={t('filter')} variant="outlined" />
                )}
                sx={{
                    width: '400px',
                    mb: 2, mt: 2,
                }}
            />

            <DataGrid
                rows={achievements}
                columns={columns}
                getRowId={row => row.saavutus_id}
                disableRowSelectionOnClick
                onRowClick={handleRowClick}
                sx={{ ...dataGridSx }}
            />

            <AddAchievementModal
                show={showAddAchievement}
                onHide={() => setShowAddAchievement(false)}
                onExit={() => dispatch(fetchAchievements(t, member))}
                athleteId={member?.id}
            />

            <EditAchievementModal
                show={showEditAchievement}
                onHide={() => setShowEditAchievement(false)}
                onExit={() => dispatch(fetchAchievements(t, member))}
                achievement={selectedAchievement}
            />

            <ConfirmModal
                show={showDeleteAchievement}
                onHide={() => setShowDeleteAchievement(false)}
                onConfirm={async () => {
                    if (selectedAchievement?.saavutus_id) {
                        await dispatch(deleteAchievement(selectedAchievement, t));
                        await dispatch(fetchAchievements(t, member));
                        setShowDeleteAchievement(false);
                        setSelectedAchievement(null);
                    }
                }}
                title={t('deleteAchievement')}
                message={t('confirmDeleteAchievement', {
                    achievement: selectedAchievement
                        ? [
                            "Vuosi: " + (selectedAchievement.kilpailu?.vuosi || ''),
                            "Kategoria: " + (selectedAchievement.kilpailu?.kilpailukategoria?.nimi || ''),
                            "Tapahtuma: " + (selectedAchievement.kilpailu?.kilpailutapahtuma?.nimi || ''),
                            '',
                            `Saavutus: ${selectedAchievement.saavutus?.saavutus || ''} (${selectedAchievement.saavutus?.laji?.laji || ''})`
                          ].filter(Boolean).join('\n')
                        : ''
                })}
                messageProps={{ sx: { whiteSpace: 'pre-line' } }}
            />

            <EditEntryWithAutocompleteModal
                show={showEditAthlete}
                onHide={() => setShowEditAthlete(false)}
                onExit={() => dispatch(fetchAthletes(t))}
                entry={member}
                valuesMap={{
                    urheilukategoria_id: state.sports || [],
                    maa_id: state.countries || []
                }}
                schema={getAthleteSchema(t, { forForm: true })}
                action={editAthlete}
                title={t('editAthlete', {
                    athlete: member ? `${member.etunimi} ${member.sukunimi}` : ''
                })}
                onDelete={() => setShowDeleteAthlete(true)}
            />

            <ConfirmModal
                show={showDeleteAthlete}
                onHide={() => setShowDeleteAthlete(false)}
                onConfirm={async () => {
                    if (member?.id) {
                        await dispatch(deleteAthlete(member, t));
                        setShowDeleteAthlete(false);
                        // Navigate back to athletes page after deletion
                        window.history.back();
                    }
                }}
                title={t('deleteAthlete', {
                    athlete: member ? `${member.etunimi} ${member.sukunimi}` : ''
                })}
                message={t('confirmDeleteAthlete', {
                    athlete: member ? `${member.etunimi} ${member.sukunimi}` : ''
                })}
            />
        </>
    )
}

export { AthleteAchievements };