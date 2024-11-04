import { Box, Grid, Paper } from "@mui/material";

export const LoadingFeaturedProducts = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {Array.from({ length: 6 }, (_, i) => (
        <Grid item key={i}>
          <Paper
            elevation={3}
            sx={{
              width: 126,
              height: 182,
              borderRadius: 2,
              position: "relative",
              backgroundColor: "#dbdbdb",
            }}
          >
            <Box
              component="img"
              sx={{
                width: 94,
                height: 94,
                position: "relative",
                top: "10%",
                left: "20%",
                alignItems: "center",
                borderRadius: "50%",
                border: "2px solid #1c1c1c",
                overflow: "hidden",
                objectFit: "cover",
                backgroundColor: "#ffffff",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 128,
                left: 9,
                width: 107,
                height: 41,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 101.47,
                  height: 9.54,
                  backgroundColor: "#1c1c1c",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                }}
              >
                <Box
                  sx={{
                    width: 33.8,
                    height: 6.24,
                    backgroundColor: "#6f6f6f",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    width: 33.8,
                    height: 6.24,
                    backgroundColor: "#6f6f6f",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
