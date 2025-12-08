import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import datagridColumns from '../utils/datagridColumns.js';
import dataGridSx from '../utils/datagidSx.js';
import { addSport, fetchSports, editSport, deleteSport } from '../context/actions/sportActions.js'
import AddEntryModal from '../components/AddEntryModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EditEntryModal from '../components/EditEntryModal.jsx'
import getSportSchema from '../schema/sport.js';


const Sports = () => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const [showAddSport, setShowAddSport] = useState(false);
    const [showEditSport, setShowEditSport] = useState(false);
    const [showDeleteSport, setShowDeleteSport] = useState(false);
    const [selectedSport, setSelectedSport] = useState(null);

    // Fetch sports on component mount
    useEffect(() => {
        dispatch(fetchSports(t));
    }, []);

    // Delete sport button handler
    const btnDeleteSport = useCallback((sport) => {
        setSelectedSport(sport);
        setShowDeleteSport(true);
    }, []);

    const columns = useMemo(
        () => datagridColumns(getSportSchema(t, { withWidths: true }), btnDeleteSport, t),
        [btnDeleteSport]
    );

    const sports = Array.isArray(state.sports)
        ? state.sports
            .filter(s => s && s.id != null) // remove null/undefined/rows without id
            .map(s => ({
                id: s.id,
                kategoria: s.kategoria,
            }))
        : [];

    const handleRowClick = useCallback((params) => {
        setSelectedSport(params.row);
        setShowEditSport(true);
    }, []);


    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={() => setShowAddSport(true)}
                sx={{
                    mt: 2, mb: 1
                }}
            >
                {t('add')}
            </Button>

            <DataGrid
                rows={sports}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                onRowClick={handleRowClick}
                sx={dataGridSx}
            />

            <AddEntryModal
                show={showAddSport}
                onHide={() => setShowAddSport(false)}
                onExit={() => dispatch(fetchSports(t))}
                action={addSport}
                schema={getSportSchema(t, { withWidths: false })}
                title={t('addSport')}
            />

            <EditEntryModal
                show={showEditSport}
                onHide={() => setShowEditSport(false)}
                onClose={() => setShowEditSport(false)}
                onExit={() => dispatch(fetchSports(t))}
                entry={selectedSport}
                action={editSport}
                schema={getSportSchema(t, { withWidths: false })}
                title={t('editSport', {
                    sport: selectedSport?.kategoria
                })}
            />

            <ConfirmModal
                show={showDeleteSport}
                onHide={() => {
                    setShowDeleteSport(false);
                    setSelectedSport(null);
                }}
                title={t('deleteSport')}
                message={t('deleteSportMessage', {
                    sport: selectedSport ? selectedSport.kategoria : ''
                })}
                cancelText={t('cancel')}
                onConfirm={async () => {
                    if (selectedSport) {
                        await dispatch(deleteSport(selectedSport, t));
                        setShowDeleteSport(false);
                        setSelectedSport(null);
                    }
                }}
            />
        </>
    );
}

export { Sports };