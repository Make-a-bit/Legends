import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { useTranslation } from 'react-i18next';
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import datagridColumns from '../utils/datagridColumns.js';
import dataGridSx from '../utils/datagidSx.js';
import { addEvent, fetchEvents, editEvent, deleteEvent } from '../context/actions/eventActions.js'
import { fetchSports } from '../context/actions/sportActions.js'
import AddEntryWithAutocompleteModal from '../components/AddEntryWithAutocompleteModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EditEntryWithAutocompleteModal from '../components/EditEntryWithAutocompleteModal.jsx'
import getEventSchema from '../schema/event.js';

const Events = () => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showEditEvent, setShowEditEvent] = useState(false);
    const [showDeleteEvent, setShowDeleteEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSport, setSelectedSport] = useState(null);
    const sports = useMemo(() =>
        Array.isArray(state.sports) ? state.sports : []
        , [state.sports]);

    // Fetch events and sports on component mount
    useEffect(() => {
        dispatch(fetchEvents(t));
        dispatch(fetchSports(t));
    }, []);

    // Delete event button handler
    const btnDeleteEvent = useCallback((event) => {
        setSelectedEvent(event);
        setShowDeleteEvent(true);
    }, []);

    // Normalize events to ensure valid entries
    const normalizedEvents = useMemo(() => {
        if (!Array.isArray(state.events)) return [];
        return state.events.filter(e => e && e.id != null);
    }, [state.events]);

    // Filter events based on selected sport
    const filteredEvents = useMemo(() => {
        if (!selectedSport || !Array.isArray(normalizedEvents))
            return normalizedEvents;

        return normalizedEvents.filter(e =>
            e?.urheilukategoria?.id === selectedSport?.id
        );
    }, [normalizedEvents, selectedSport]);

    // DataGrid columns definition
    const columns = useMemo(
        () => datagridColumns(getEventSchema(t, { withWidths: true }), btnDeleteEvent, t),
        [btnDeleteEvent, t]
    );

    // Row click handler to open edit modal
    const handleRowClick = useCallback((params) => {
        setSelectedEvent(params.row);
        setShowEditEvent(true);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        if (selectedEvent?.id) {
            dispatch(deleteEvent(selectedEvent, t));
            setShowDeleteEvent(false);
            setSelectedEvent(null);
        }
    }, [selectedEvent, dispatch, t]);

    return (
        <>
            <Box sx={{ marginTop: "20px", width: "250px" }}>
                <Autocomplete
                    options={sports}
                    getOptionLabel={(option) => option.kategoria || ""}
                    value={selectedSport}
                    onChange={(_, newValue) => {
                        setSelectedSport(newValue);
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
                onClick={() => setShowAddEvent(true)}
                sx={{ mt: 2, mb: 1 }}
            >
                {t('addEvent')}
            </Button>

            <DataGrid
                rows={filteredEvents || []}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={(row) => row?.id}
                onRowClick={handleRowClick}
                sx={dataGridSx}
            />

            <AddEntryWithAutocompleteModal
                show={showAddEvent}
                onHide={() => setShowAddEvent(false)}
                onExit={() => dispatch(fetchEvents(t))}
                action={addEvent}
                schema={getEventSchema(t, { forForm: true })}
                valuesMap={{
                    urheilukategoria: sports
                }}
                title={t('addEvent')}
            />

            <EditEntryWithAutocompleteModal
                show={showEditEvent}
                onHide={() => setShowEditEvent(false)}
                onExit={() => dispatch(fetchEvents(t))}
                entry={selectedEvent}
                valuesMap={{ urheilukategoria: sports }}
                schema={getEventSchema(t, { forForm: true })}
                action={editEvent}
                title={t('editEvent', {
                    event: selectedEvent?.laji || ''
                })}
            />

            <ConfirmModal
                show={showDeleteEvent}
                onHide={() => setShowDeleteEvent(false)}
                onConfirm={handleDeleteConfirm}
                title={t('deleteEvent')}
                message={t('confirmDeleteEvent')}
            />
        </>
    )
}

export { Events };