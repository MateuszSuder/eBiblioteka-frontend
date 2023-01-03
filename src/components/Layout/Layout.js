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
import RoomServiceIcon from '@mui/icons-material/RoomService';
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
                                    textTransform="uppercase"
                                    letterSpacing={theme.spacing(0.3)}
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        alignItems: 'center',
                                        gap: theme.spacing(1)
                                    }}
                                >
                                    <RoomServiceIcon fontSize="32" />
                                    Hotel
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