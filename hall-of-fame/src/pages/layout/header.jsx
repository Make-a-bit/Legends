import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Menu, Container, Toolbar, IconButton, Drawer, List, ListItem, MenuItem } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import navigationLinks from '../../constants/navigation.js';
import theme from '../../utils/theme.js';

const languageOptions = [
    { code: 'en', labelKey: 'english', flag: 'EN' },
    { code: 'fi', labelKey: 'finnish', flag: 'FI' },
]
const Header = () => {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDropdownAnchor, setNavDropdownAnchor] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLanguageButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (lang) => {
        i18n.changeLanguage(lang);
        setAnchorEl(null);
    };

    const handleNavDropdownOpen = (event, labelKey) => {
        setNavDropdownAnchor(event.currentTarget);
        setActiveDropdown(labelKey);
    };

    const handleNavDropdownClose = () => {
        setNavDropdownAnchor(null);
        setActiveDropdown(null);
    };

    // Desktop navigation buttons with dropdown support
    const navButtons = navigationLinks.map((link) => {
        // Check if current path matches any dropdown child
        const isDropdownActive = link.dropDown && link.dropDown.some(item => location.pathname === item.path);

        if (link.dropDown) {
            return (
                <React.Fragment key={link.labelKey}>
                    <Button
                        color="inherit"
                        variant="text"
                        sx={{
                            color: "black",
                            display: "inline-flex",
                            fontFamily: '"Montserrat", Arial, sans-serif',
                            fontSize: 16,
                            fontWeight: (activeDropdown === link.labelKey || isDropdownActive) ? "bold" : "normal",
                        }}
                        onClick={(e) => handleNavDropdownOpen(e, link.labelKey)}
                        endIcon={<ArrowDropDownIcon />}
                    >
                        {t(link.labelKey)}
                    </Button>
                    <Menu
                        anchorEl={navDropdownAnchor}
                        open={activeDropdown === link.labelKey}
                        onClose={handleNavDropdownClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        {link.dropDown.map((item) => (
                            <MenuItem
                                key={item.labelKey}
                                component={NavLink}
                                to={item.path}
                                onClick={handleNavDropdownClose}
                                selected={location.pathname === item.path}
                            >
                                {t(item.labelKey)}
                            </MenuItem>
                        ))}
                    </Menu>
                </React.Fragment>
            );
        } else {
            return (
                <Button
                    key={link.labelKey}
                    component={NavLink}
                    to={link.path}
                    exact={link.exact}
                    color="inherit"
                    sx={{
                        color: "black",
                        display: "block",
                        fontFamily: '"Montserrat", Arial, sans-serif',
                        fontSize: 16,
                        fontWeight: location.pathname === link.path ? "bold" : "normal",
                    }}>
                    {t(link.labelKey)}
                </Button>
            );
        }
    });

    const languageButton = (
        <>
            <IconButton
                color="inherit"
                onClick={handleLanguageButtonClick}
                sx={{ ml: 2 }}
                aria-label="select language"
            >
                <LanguageOutlinedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleLanguageMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {languageOptions.map(option => (
                    <MenuItem
                        key={option.code}
                        selected={i18n.language === option.code}
                        onClick={() => handleLanguageSelect(option.code)}
                    >
                        <span style={{ fontSize: '16px', marginRight: 8 }}>{option.flag}</span>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );

    // Mobile drawer navigation with dropdown support
    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List>
                {navigationLinks.map((link) => {
                    // Check if current path matches any dropdown child
                    const isDropdownActive = link.dropDown && link.dropDown.some(item => location.pathname === item.path);

                    if (link.dropDown) {
                        return (
                            <React.Fragment key={link.labelKey}>
                                <ListItem
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        pl: 2,
                                        bgcolor: "transparent",
                                    }}
                                >
                                    <Box sx={{
                                        fontWeight: isDropdownActive ? "bold" : "normal",
                                        fontFamily: '"Montserrat", Arial, sans-serif',
                                        fontSize: 16,
                                        color: "black",
                                        flexGrow: 1,
                                    }}>
                                        {t(link.labelKey)}
                                    </Box>
                                    <ArrowDropDownIcon sx={{ ml: 1, color: "black" }} />
                                </ListItem>
                                {link.dropDown.map((item) => (
                                    <ListItem
                                        button
                                        key={`${link.labelKey}-${item.labelKey}`}
                                        component={NavLink}
                                        to={item.path}
                                        onClick={() => setDrawerOpen(false)}
                                        sx={{
                                            pl: 5,
                                            bgcolor: "transparent",
                                        }}
                                    >
                                        <Box sx={{
                                            fontFamily: '"Montserrat", Arial, sans-serif',
                                            fontSize: 16,
                                            fontWeight: location.pathname === item.path ? "bold" : "normal",
                                            color: "black",
                                            width: "100%",
                                        }}>
                                            {t(item.labelKey)}
                                        </Box>
                                    </ListItem>
                                ))}
                            </React.Fragment>
                        );
                    } else {
                        return (
                            <ListItem
                                key={link.labelKey}
                                button
                                component={NavLink}
                                to={link.path}
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                    pl: 2,
                                    bgcolor: "transparent",
                                }}
                            >
                                <Box sx={{
                                    fontFamily: '"Montserrat", Arial, sans-serif',
                                    fontSize: 16,
                                    fontWeight: location.pathname === link.path ? "bold" : "normal",
                                    color: "black",
                                    width: "100%",
                                }}>
                                    {t(link.labelKey)}
                                </Box>
                            </ListItem>
                        );
                    }
                })}
            </List>
            <Box sx={{ mt: 'auto', p: 2, display: 'flex', justifyContent: 'center' }}>
                {languageButton}
            </Box>
        </Box>
    );

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "transparent",
                mb: 3
            }}>
            <Container
                maxWidth="lg"
                sx={{
                    bgcolor: theme.palette.primary.light,
                    borderRadius: 2,
                    minHeight: 64
                }}>
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setDrawerOpen(true)}
                                sx={{ mr: 2 }}
                            >
                                <MenuOutlinedIcon />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={() => setDrawerOpen(false)}
                                PaperProps={{
                                    sx: {
                                        bgcolor: theme.palette.primary.light, // Match desktop background
                                    }
                                }}
                            >
                                {drawerContent}
                            </Drawer>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                                {navButtons}
                            </Box>
                            {languageButton}
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export { Header };