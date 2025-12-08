import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStateProvider } from '../src/context/GlobalState.jsx';
import Content from '../src/pages/layout/content.jsx';
import { AchievementTypes } from '../src/pages/AchievementTypes.jsx';
import { AthleteAchievements } from './pages/AthleteAchievements.jsx';
import { Athletes } from '../src/pages/Athletes.jsx';
import { Competitions } from '../src/pages/Competitions.jsx';
import { CompetitionTypes } from '../src/pages/CompetitionTypes.jsx'
import { Countries } from '../src/pages/Countries.jsx';
import { Events } from '../src/pages/Events.jsx';
import { Home } from '../src/pages/Home.jsx';
import { Sports } from '../src/pages/Sports.jsx'; 
import '../src/locales/i18n.js'; // Import i18n configuration

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
                <Routes>
                    <Route element={<Content />}>
                        <Route index element={<Home />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/achievements" element={<AchievementTypes />} />
                        <Route path="/athletes" element={<Athletes />} />
                        <Route path="/athlete/:id" element={<AthleteAchievements />} />
                        <Route path="/competitions" element={<Competitions />} />
                        <Route path="/competitiontypes" element={<CompetitionTypes /> } />
                        <Route path="/countries" element={<Countries />} />
                        <Route path="/sports" element={<Sports />} />
                        <Route path="/events" element={<Events />} />
                    </Route>
                </Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}

export default App;
