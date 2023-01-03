import { createTheme } from '@mui/material/styles';
import {blue} from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#f44336',
        },
    },
});

export default theme;