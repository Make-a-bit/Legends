import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MembersContext } from '../context/GlobalState.jsx'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

const AthleteCard = ({ member }) => {
    const { state, dispatch } = useContext(MembersContext);
    const { t } = useTranslation();

    let history = useNavigate();

    return (
        <Paper
            elevation={3}
            sx={{
                bgcolor: '#ffffff',
                borderRadius: 3,
                boxShadow: 10,
                width: {
                    xs: 320,
                },
                position: 'relative',
                overflow: 'hidden',
            }}>

            <Link
                to={`/athlete/${member.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100%',
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
                            minWidth: 0, // allows text to wrap
                            zIndex: 1
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                zIndex: 2,
                                position: 'relative',
                            }}
                        >
                            {member.etunimi}
                            <em>{member.kutsumanimi ? ` "${member.kutsumanimi}" ` : " "}</em>
                            {member.sukunimi}
                        </Typography>

                        <Typography component="p">
                            {member.maa.nimi}
                        </Typography>

                        <Typography component="p">
                            {member.urheilukategoria.urheilukategoria_nimi}
                        </Typography>
                    </Box>


                    {/* Image Section */}
                    {member.kuva_url && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                height: '100%',
                                paddingTop: "10px",
                                paddingRight: "10px",
                                paddingBottom: "10px"
                            }}
                        >
                            <Box
                                component="img"
                                src={member.kuva_url}
                                alt={member.nimi}
                                sx={{
                                    width: '128px',
                                    height: '170px',
                                    objectFit: 'cover',
                                    boxShadow: 20,
                                    borderRadius: 3
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Link>
        </Paper>
    );
}

export { AthleteCard };
