import React from 'react'
import { AppBar, Container } from "@mui/material";

const Footer = () => {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "transparent",
            }}>
            <Container
                align="center"
                maxWidth="lg"
                sx={{
                    bgcolor: "lightGray",
                    borderRadius: 2,
                    color: "black",
                    fontFamily: '"Montserrat", Arial, sans-serif',
                    minHeight: 25,
                }}>
                <p>Hall Of Fame 2025 &copy; Janne Toivonen</p>
            </Container>
        </AppBar>
    )
}

export { Footer }