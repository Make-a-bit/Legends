import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { MembersContext } from '../context/GlobalState.jsx'
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import { addCountry, fetchCountries, editCountry, deleteCountry } from '../context/actions/countryActions.js'
import AddEntryModal from '../components/AddEntryModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EditEntryModal from '../components/EditEntryModal.jsx'
import getCountrySchema from '../schema/country.js';
import datagridColumns from '../utils/datagridColumns.js';
import dataGridSx from '../utils/datagidSx.js';

const Countries = () => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const countrySchema = getCountrySchema(t);
    const [showAddCountry, setShowAddCountry] = useState(false);
    const [showEditCountry, setShowEditCountry] = useState(false);
    const [showDeleteCountry, setShowDeleteCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    // Fetch countries on component mount
    useEffect(() => {
        dispatch(fetchCountries(t));
    }, []);

    // Delete country button handler
    const btnDeleteCountry = useCallback((country) => {
        setSelectedCountry(country);
        setShowDeleteCountry(true);
    }, []);

    // Define datagrid columns with memoization
    const columns = useMemo(
        () => datagridColumns(getCountrySchema(t, { withWidths: true }), btnDeleteCountry, t),
        [btnDeleteCountry]
    );

    // Map countries from the context
    const countries = Array.isArray(state.countries)
        ? state.countries.map(c => ({
            id: c.id || c._id, 
            maa: c.maa,
            lippu_url: c.lippu_url
        }))
        : [];

    const handleRowClick = useCallback((params) => {
        setSelectedCountry(params.row);
        setShowEditCountry(true);
    }, []);

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={() => setShowAddCountry(true)}
                sx={{
                    mt: 2, mb: 1
                }}
            >
                {t('addCountry')}
            </Button>

            <DataGrid
                rows={countries}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                onRowClick={handleRowClick}
                sx={dataGridSx}
            />

            <AddEntryModal
                show={showAddCountry}
                onHide={() => setShowAddCountry(false)}
                onExit={() => dispatch(fetchCountries(t))}
                action={addCountry}
                schema={getCountrySchema(t, { withWidths: false })}
                title={t('addCountry')}
            />

            <EditEntryModal
                show={showEditCountry}
                onHide={() => setShowEditCountry(false)}
                onClose={() => setShowEditCountry(false)}
                onExit={() => dispatch(fetchCountries(t))}
                entry={selectedCountry}
                action={editCountry}
                schema={countrySchema}
                title={t('editCountry', {
                    country: selectedCountry ? selectedCountry.maa : ''
                })}
            />

            <ConfirmModal
                show={showDeleteCountry}
                onHide={() => {
                    setShowDeleteCountry(false);
                    setSelectedCountry(null);
                }}
                title={t('deleteCountry')}
                message={t('confirmDeleteCountry', {
                    country: selectedCountry ? selectedCountry.maa : ''
                })}
                confirmText={t('delete')}
                cancelText={t('cancel')}
                onConfirm={async () => {
                    if (selectedCountry) {
                        await dispatch(deleteCountry(selectedCountry));
                        setShowDeleteCountry(false);
                        setSelectedCountry(null);
                    }
                }}
            />
        </>
    )
}

export { Countries };