import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import theme from "../theme/theme";
import {Link, Outlet} from "react-router-dom";

const Layout = ({container = true}) => {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box>
                            <Link to="/">
                                <Typography
                                    variant="h4"
                                    letterSpacing={theme.spacing(0.3)}
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        alignItems: 'center',
                                        gap: theme.spacing(1)
                                    }}
                                    className="prevent-select"
                                >
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                         width="50px" height="50px" viewBox="0 0 100.000000 100.000000"
                                         preserveAspectRatio="xMidYMid meet">

                                        <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                                           fill="#ffffff" stroke="none" className="test">
                                            <path d="M262 852 l-223 -106 3 -40 c3 -36 6 -41 31 -44 l27 -3 0 -230 c0
-193 -2 -229 -14 -229 -23 0 -46 -41 -46 -82 l0 -38 460 0 460 0 0 38 c0 41
-23 82 -46 82 -12 0 -14 36 -14 229 l0 230 28 3 c24 3 27 8 30 44 l3 41 -228
106 c-125 59 -232 107 -238 106 -5 0 -110 -49 -233 -107z m443 -30 c115 -54
210 -103 212 -109 3 -9 -22 -13 -83 -15 -61 -2 -89 -7 -92 -16 -2 -7 5 -16 17
-19 21 -5 21 -10 21 -234 l0 -229 -280 0 -280 0 0 229 c0 224 0 229 21 234 12
3 19 12 17 19 -3 9 -31 14 -92 16 -60 2 -86 6 -84 14 2 6 96 55 209 109 112
53 204 97 205 98 0 1 94 -43 209 -97z m-525 -392 c0 -223 -1 -230 -20 -230
-19 0 -20 7 -20 230 0 223 1 230 20 230 19 0 20 -7 20 -230z m680 0 c0 -223
-1 -230 -20 -230 -19 0 -20 7 -20 230 0 223 1 230 20 230 19 0 20 -7 20 -230z
m58 -293 c3 -16 -22 -17 -417 -17 -344 0 -421 2 -421 13 0 8 3 17 7 20 4 4
191 6 417 5 382 -3 411 -4 414 -21z"/>
                                            <path d="M285 648 c-3 -8 -4 -90 -3 -183 l3 -169 79 -14 c43 -7 91 -19 107
-28 26 -13 32 -13 58 0 16 9 64 21 107 28 l79 14 0 179 0 180 -62 -3 c-34 -1
-83 -9 -108 -16 -37 -12 -53 -12 -88 -1 -73 22 -166 29 -172 13z m148 -49 l47
-11 0 -144 c0 -79 -3 -144 -6 -144 -4 0 -23 4 -43 10 -20 5 -53 12 -73 15
l-38 6 0 145 0 146 33 -7 c17 -3 53 -11 80 -16z m247 -124 l0 -144 -37 -6
c-21 -3 -54 -10 -74 -15 -20 -6 -39 -10 -43 -10 -3 0 -6 65 -6 144 l0 145 58
11 c31 7 62 14 67 15 34 11 35 6 35 -140z"/>
                                        </g>
                                    </svg>

                                    eBiblioteka
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{marginLeft: "auto"}}>
                            <Link to="/profile">
                                <Tooltip title="Profil użytkownika">
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar>
                                            M
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Grid mt={1} container>
                {
                    container ? (
                        <Container maxWidth="xl">
                            <Outlet />
                        </Container>
                    ) : (
                        <Grid width="100%">
                            <Outlet />
                        </Grid>
                    )
                }

            </Grid>
        </>
    );
};

export default Layout;