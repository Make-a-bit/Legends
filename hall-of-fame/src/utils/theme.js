import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#6fbf73',
            main: '#4caf50',
            dark: '#357a38',
            contrastText: '#fff',
        },
        secondary: {
            light: '#33eb91',
            main: '#00e676',
            dark: '#00a152',
            contrastText: '#000',
        },
    },
});

export default theme;