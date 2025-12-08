import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { Header } from "../layout/header.jsx"
import { Footer } from "../layout/footer.jsx"
import { Outlet } from "react-router-dom";

const Content = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="auto"
            sx={{ alignItems: "center" }}
        >
            <Header />

            <Container
                disableGutters
                component="main"
                maxWidth="lg"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "-23px",
                    width: "100%",
                    px: 2,
                    boxShadow: (theme) => theme.breakpoints.up("xl") ? 3 : "none",
                    borderRadius: 2,
                    backgroundColor: "background.paper",
                }}>

                <Grid>
                    <Outlet />
                </Grid>

            </Container>
            <Footer />
        </Box>
    );
}

export default Content;