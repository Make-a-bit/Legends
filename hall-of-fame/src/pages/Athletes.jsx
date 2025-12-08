import React, { useContext, useEffect, useState } from 'react'
import { fetchAthletes, addAthlete } from '../context/actions/athleteActions.js'
import { fetchSports } from '../context/actions/sportActions.js'
import { fetchCountries } from '../context/actions/countryActions.js'
import { MembersContext } from '../context/GlobalState.jsx'
import { Button, Grid, Paper } from '@mui/material'
import { AthleteCard } from '../components/AthleteCard.jsx'
import { useTranslation } from 'react-i18next'
import AddEntryWithAutocompleteModal from '../components/AddEntryWithAutocompleteModal.jsx'
import getAthleteSchema from '../schema/athlete.js'

const Athletes = () => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();
    const athletes = state.athletes ?? [];
    const sports = state.sports ?? [];
    const countries = state.countries ?? [];

    const [showAddAthlete, setShowAddAthlete] = useState(false);

    useEffect(() => {
        dispatch(fetchAthletes(t));
        dispatch(fetchSports(t));
        dispatch(fetchCountries(t));
    }, []);

    return (
        <Paper
            elevation={3}
            sx={{
                bgcolor: '#f0f0f0',
                p: {
                    xs: 1.5,
                    sm: 2.5,
                    md: 4
                },
                fontFamily: '"Montserrat", Arial, sans-serif',
                maxWidth: 1000,
                margin: {
                    xs: "12px auto",
                }
            }}>

            <Button
                variant="contained"
                color="success"
                onClick={() => setShowAddAthlete(true)}
                sx={{
                    mb: 2,
                    mt: -2
                }}
            >
                {t('addAthlete')}
            </Button>

            {athletes.length > 0 ? (
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    justifyContent="center"
                    sx={{
                    }}
                >
                    {athletes.map(athlete => (
                        <Grid
                            key={athlete.id}
                        >
                            <AthleteCard member={athlete} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <p>{t('noAthletesFound')}</p>
            )}

            <AddEntryWithAutocompleteModal
                show={showAddAthlete}
                onHide={() => setShowAddAthlete(false)}
                onExit={() => dispatch(fetchAthletes(t))}
                action={addAthlete}
                schema={getAthleteSchema(t, { forForm: true })}
                valuesMap={{
                    urheilukategoria_id: sports,
                    maa_id: countries
                }}
                title={t('addAthlete')}
            />
        </Paper>
    )
}

export { Athletes };