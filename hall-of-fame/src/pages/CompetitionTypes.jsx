import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import { addCompetitionType, editCompetitionType, fetchCompetitionTypes, deleteCompetitionType } from '../context/actions/competitionTypeActions.js'
import AddEntryModal from '../components/AddEntryModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EditEntryModal from '../components/EditEntryModal.jsx'
import datagridColumns from '../utils/datagridColumns.js';
import dataGridSx from '../utils/datagidSx.js';
import getCompetitionTypeSchema from '../schema/competitionType.js'
import { editCompetition } from '../context/actions/competitionActions.js';

const CompetitionTypes = () => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const competitionTypeSchema = getCompetitionTypeSchema(t)
    const [showAddType, setShowAddType] = useState(false);
    const [showEditType, setShowEditType] = useState(false);
    const [showDeleteType, setShowDeleteType] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(fetchCompetitionTypes(t));
    }, []);

    const btnDeleteType = useCallback((type) => {
        setSelectedType(type);
        setShowDeleteType(true);
    }, []);

    const columns = useMemo(
        () => datagridColumns(getCompetitionTypeSchema(t, { withWidths: true }), btnDeleteType, t),
        [btnDeleteType]
    );

    const normalizedCompetitionTypes = useMemo(() => {
        if (!Array.isArray(state.competitionTypes)) return [];
        return state.competitionTypes.filter(c => c && c.id != null);
    }, [state.competitionTypes]);


    const handleRowClick = useCallback((params) => {
        setSelectedType(params.row);
        setShowEditType(true);
    }, []);

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={() => setShowAddType(true)}
                sx={{
                    mt: 2, mb: 1
                }}
            >
                {t('addCompetitionType')}
            </Button>

            <DataGrid
                rows={normalizedCompetitionTypes || []}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                onRowClick={handleRowClick}
                sx={dataGridSx}
            />

            <AddEntryModal
                show={showAddType}
                onHide={() => setShowAddType(false)}
                onExit={() => dispatch(fetchCompetitionTypes(t))}
                action={addCompetitionType}
                schema={getCompetitionTypeSchema(t, { withWidths: false })}
                title={t('addCompetitionType')}
            />

            <EditEntryModal
                show={showEditType}
                onHide={() => setShowEditType(false)}
                onClose={() => setShowEditType(false)}
                onExit={() => dispatch(fetchCompetitionTypes(t))}
                entry={selectedType}
                action={editCompetitionType}
                schema={getCompetitionTypeSchema(t, { withWidths: false })}
                title={t('editCompetitionType', { competitiontype: selectedType ? selectedType.kisatyyppi : '' })}
            />

            <ConfirmModal
                show={showDeleteType}
                onHide={() => {
                    setShowDeleteType(false);
                    setSelectedType(null);
                }}
                title={t('deleteCompetitionType', { competitiontype: selectedType ? selectedType.kisatyyppi : '' })}
                message={t('confirmDeleteCompetitionType', { competitiontype: selectedType ? selectedType.kisatyyppi : '' })}
                confirmText={t('delete')}
                cancelText={t('cancel')}
                onConfirm={async () => {
                    if (selectedType) {
                        await dispatch(deleteCompetitionType(selectedType, t));
                        setShowDeleteType(false);
                        setSelectedType(null);
                    }
                }}
            />

        </>
    )
}

export { CompetitionTypes }