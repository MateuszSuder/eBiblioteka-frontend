import React, {useEffect} from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import theme from "../theme/theme";

const drawerWidth = 240;

const PanelListItems = ({page, changePage}) => {
    return (
        <ListItem key={page.name} disablePadding>
            <ListItemButton onClick={() => changePage(page)}>
                <ListItemButton>
                    <ListItemIcon>
                        {page.icon}
                    </ListItemIcon>
                </ListItemButton>
                <ListItemText primary={page.name}/>
            </ListItemButton>
        </ListItem>
    )
}

const PageWithMenu = ({ children, subPages }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {subPage} = useParams();

    const page = subPages.find(page => page.path === subPage);

    if(!page) return (
        <Navigate to={`${pathname.replace(subPage, "")}`} />
    );

    const Component = page.component;

    const changePage = (page) => {
        navigate(`${pathname.replace(subPage, "")}${page.path}`);
    }

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {subPages.map((page, index) => (
                            <PanelListItems page={page} changePage={(page) => changePage(page)} key={page.name + index} />
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ display: "flex", flexDirection: "column", width: "100%" }} p={2}>
                <Typography variant="h4" mb={1}>
                    { page.name }
                </Typography>
                <Divider sx={{marginBottom: theme.spacing(2)}} />
                <Component />
                {children}
            </Box>
        </Box>
    );
};

export default PageWithMenu;