import React from "react";
import { Paper } from "@mui/material";

const Home = () => {
    return (
        <>
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
                <h1 style={{ textAlign: "center" }}>Hall Of Fame</h1>
                <h2>Kuvaus</h2>
                <p>
                    Hall Of Fame oli projekti Web-ohjelmoinnin kurssilta, jossa tehtävänä oli luoda
                    full-stack web-sovellus, joka yhdistää käyttöliittymän REST API-rajapinnan avulla tietokantaan.
                </p>
                <p>
                    Rajapinta oli toteutettava Node.js express kirjastolla ja tietokantana käytettiin MariaDB:tä.
                    Käyttöliittymä puolestaan toteutettiin Reactilla ja siihen piti sisällyttää CSS-kirjasto.
                    Otin käyttöön Material UI:n, koska se on moderni ja laajasti käytetty React-komponenttikirjasto,
                    joka tarjoaa samat ominaisuudet kuin Bootstrap tai Tailwind CSS, mutta on suunniteltu erityisesti
                    React-sovelluksiin.
                </p>

                <p>
                    Tilanhallinta tuli toteuttaa Context API:lla. Lisäominaisuutena otin käyttöön i18next kirjaston,
                    joka mahdollistaa monikielisyyden sovelluksessa. Tehtävän kannalta merkityksetön toiminto,
                    mutta halusin harjoitella kyseisen kirjaston käyttöä tässä yhteydessä.
                </p>

                <p>
                    Yhteenvetona totean, että sovelluksesta tuli varsin onnistunut ja tehtävän vaatimukset täyttävä.
                    Opin projektin aikana paljon uutta full-stack kehityksestä ja eri teknologioiden yhdistämisestä
                    toimivaksi kokonaisuudeksi. 
                </p>
                <br />

                <h2>Arkkitehtuuri</h2>
                <p>
                    <strong>Backend:</strong>
                </p>
                <ul>
                    <li>Node.js Express REST API</li>
                    <li>MariaDB</li>
                </ul>

                <strong>Frontend:</strong>
                <ul>
                    <li>React, ContextAPI</li>
                    <li>Material UI</li>
                    <li>i18next (monikielisyyden tuki)</li>
                </ul>
                <br />

                <h2>Työkalut</h2>
                <ul>
                    <li>Visual Studio 2022</li>
                    <li>MariaDB, MySQL Workbench</li>
                    <li>Postman</li>
                    <li>GitHub Copilot, ChatGPT, Claude</li>
                </ul>
                <ul>
                    <li>Versionhallinta: Git</li>
                </ul>
            </Paper>
        </>
    );
};

export { Home };
