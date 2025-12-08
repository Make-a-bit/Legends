import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import { addAchievementType, deleteAchievementType, editAchievementType, fetchAchievementTypes } from '../context/actions/achievementTypeActions.js'
import AddEntryModal from '../components/AddEntryModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EditEntryModal from '../components/EditEntryModal.jsx'
import datagridColumns from '../utils/datagridColumns.js';
import dataGridSx from '../utils/datagidSx.js';
import getAchievementTypeSchema from '../schema/achievementType.js';

const AchievementTypes = () => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const achievementTypeSchema = getAchievementTypeSchema(t);
    const [showAddAchievementType, setShowAddAchievementType] = useState(false);
    const [showEditAchievementType, setShowEditAchievementType] = useState(false);
    const [showDeleteAchievementType, setShowDeleteAchievementType] = useState(false);
    const [selectedAchievementType, setSelectedAchievementType] = useState(null);

    // Fetch achievement types on component mount
    useEffect(() => {
        dispatch(fetchAchievementTypes(t));
    }, []);

    // Delete achievement type button handler
    const btnDeleteAchievementType = useCallback((achievementType) => {
        setSelectedAchievementType(achievementType);
        setShowDeleteAchievementType(true);
    }, []);

    // Define datagrid columns with memoization
    const columns = useMemo(
        () => datagridColumns(getAchievementTypeSchema(t, { withWidths: true }), btnDeleteAchievementType, t),
        [btnDeleteAchievementType]
    );

    // Map achievement types from the context
    const achievementTypes = Array.isArray(state.achievementTypes)
        ? state.achievementTypes
            .filter(at => at && (at.id || at._id)) 
            .map(at => ({
                id: at.id || at._id,
                saavutusluokka: at.saavutusluokka
            }))
        : [];

    // Row click handler to open edit modal
    const handleRowClick = useCallback((params) => {
        setSelectedAchievementType(params.row);
        setShowEditAchievementType(true);
    }, []);


    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={() => setShowAddAchievementType(true)}
                sx={{
                    mt: 2, mb: 1
                }}
            >
                {t('addAchievementType')}
            </Button>

            <DataGrid
                rows={achievementTypes}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                onRowClick={handleRowClick}
                sx={dataGridSx}
            />

            <AddEntryModal
                show={showAddAchievementType}
                onHide={() => setShowAddAchievementType(false)}
                onExit={() => dispatch(fetchAchievementTypes(t))}
                action={addAchievementType}
                schema={getAchievementTypeSchema(t, { withWidths: false })}
                title={t('addAchievementType')}
            />

            <EditEntryModal
                show={showEditAchievementType}
                onHide={() => setShowEditAchievementType(false)}
                onClose={() => setShowEditAchievementType(false)}
                onExit={() => dispatch(fetchAchievementTypes(t))}
                entry={selectedAchievementType}
                action={editAchievementType}
                schema={achievementTypeSchema}
                title={t('editAchievementType', {
                    type: selectedAchievementType ? selectedAchievementType.saavutusluokka : ''
                })}
            />

            <ConfirmModal
                show={showDeleteAchievementType}
                onHide={() => {
                    setShowDeleteAchievementType(false);
                    setSelectedAchievementType(null);
                }}
                title={t('deleteAchievementType', {
                    type: selectedAchievementType ? selectedAchievementType.saavutusluokka : ''
                })}
                message={t('confirmDeleteAchievementType', {
                    type: selectedAchievementType ? selectedAchievementType.saavutusluokka : ''
                })}
                confirmText={t('delete')}
                cancelText={t('cancel')}
                onConfirm={async () => {
                    if (selectedAchievementType) {
                        await dispatch(deleteAchievementType(selectedAchievementType, t));
                        setShowDeleteAchievementType(false);
                        setSelectedAchievementType(null);
                    }
                }}
            />
        </>
    )
}

export { AchievementTypes };