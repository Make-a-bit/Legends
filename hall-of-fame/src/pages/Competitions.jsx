import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { useTranslation } from 'react-i18next';
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import datagridColumns from '../utils/datagridColumns.js';
import dataGridSx from '../utils/datagidSx.js';
import { addCompetition, fetchCompetitions, editCompetition, deleteCompetition } from '../context/actions/competitionActions.js'
import { fetchCompetitionTypes } from '../context/actions/competitionTypeActions.js'
import { fetchCountries } from '../context/actions/countryActions.js'
import AddEntryWithAutocompleteModal from '../components/AddEntryWithAutocompleteModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EditEntryWithAutocompleteModal from '../components/EditEntryWithAutocompleteModal.jsx'
import getCompetitionSchema from '../schema/competition.js';
import AddEntryWithAutocomplete from '../components/AddEntryWithAutocompleteModal.jsx';

const Competitions = () => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [showAddCompetition, setShowAddCompetition] = useState(false);
    const [showEditCompetition, setShowEditCompetition] = useState(false);
    const [showDeleteCompetition, setShowDeleteCompetition] = useState(false);
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [selectedCompetitionType, setSelectedCompetitionType] = useState(null);

    const competitionTypes = useMemo(() =>
        Array.isArray(state.competitionTypes) ? state.competitionTypes : []
        , [state.competitionTypes]);

    const countries = useMemo(() =>
        Array.isArray(state.countries) ? state.countries : []
        , [state.countries]);

    useEffect(() => {
        dispatch(fetchCompetitions(t));
        dispatch(fetchCompetitionTypes(t));
        dispatch(fetchCountries(t));
    }, []);

    const btnDeleteCompetition = useCallback((competition) => {
        setSelectedCompetition(competition);
        setShowDeleteCompetition(true);
    }, []);

    const normalizedCompetitions = useMemo(() => {
        if (!Array.isArray(state.competitions)) return [];
        return state.competitions.filter(c => c && c.id != null);
    }, [state.competitions]);

    const filteredCompetitions = useMemo(() => {
        if (!selectedCompetitionType || !Array.isArray(normalizedCompetitions))
            return normalizedCompetitions;

        return normalizedCompetitions.filter(c =>
            c?.kisatyyppi?.id === selectedCompetitionType?.id
        );
    }, [normalizedCompetitions, selectedCompetitionType]);

    const columns = useMemo(
        () => datagridColumns(getCompetitionSchema(t, { withWidths: true }), btnDeleteCompetition, t),
        [btnDeleteCompetition, t]
    );

    const handleRowClick = useCallback((params) => {
        setSelectedCompetition(params.row);
        setShowEditCompetition(true);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        if (selectedCompetition?.id) {
            dispatch(deleteCompetition(selectedCompetition, t));
            setShowDeleteCompetition(false);
            setSelectedCompetition(null);
        }
    }, [selectedCompetition, dispatch, t]);

    return (
        <>
            <Box sx={{ marginTop: "20px", width: "400px" }}>
                <Autocomplete
                    options={competitionTypes}
                    getOptionLabel={(option) => option.kisatyyppi || ""}
                    value={selectedCompetitionType}
                    onChange={(_, newValue) => {
                        setSelectedCompetitionType(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('filter')}
                            variant="outlined" />
                    )}
                />
            </Box>

            <Button
                variant="contained"
                color="success"
                onClick={() => setShowAddCompetition(true)}
                sx={{ mt: 2, mb: 1 }}
            >
                {t('addCompetition')}
            </Button>

            <DataGrid
                rows={filteredCompetitions || []}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                onRowClick={handleRowClick}
                sx={dataGridSx}
            />

            <AddEntryWithAutocompleteModal
                show={showAddCompetition}
                onHide={() => setShowAddCompetition(false)}
                onExit={() => dispatch(fetchCompetitions(t))}
                action={addCompetition}
                schema={getCompetitionSchema(t, { forForm: true })}
                valuesMap={{
                    kisatyyppi: competitionTypes,
                    maa: countries
                }}
                title={t('addCompetition')}
            />

            <EditEntryWithAutocompleteModal
                show={showEditCompetition}
                onHide={() => setShowEditCompetition(false)}
                onExit={() => dispatch(fetchCompetitions(t))}
                entry={selectedCompetition}
                valuesMap={{
                    kisatyyppi: competitionTypes,
                    maa: countries
                }}
                action={editCompetition}
                title={t('editCompetition', {
                    competition: selectedCompetition?.nimi || ''
                })}
                schema={getCompetitionSchema(t, { forForm: true })}
            />

            <ConfirmModal
                show={showDeleteCompetition}
                onHide={() => setShowDeleteCompetition(false)}
                onConfirm={handleDeleteConfirm}
                title={t('deleteCompetition', {
                    competition: selectedCompetition?.nimi || ''
                })}
                message={t('confirmDeleteCompetition', {
                    competition: selectedCompetition?.nimi || ''
                })}
            />

        </>
    )
}

export { Competitions };