import React from "react";
import { Box, Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Xianmu
        </Typography>
      </Box>
    </Container>
  );
}

export default App;