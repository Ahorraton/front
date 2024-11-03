import SaltIcon from "@mui/icons-material/LocalDining"; // Placeholder icon
import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  borderRadius: theme.shape.borderRadius,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  width: 50,
  height: 50,
}));

export const LoadingHeroComponent = () => {
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        component="img"
        sx={{
          width: 300,
          height: 300,
          top: "10%",
          position: "relative",
          border: "2px solid #1c1c1c",
          overflow: "hidden",
          objectFit: "cover",
          backgroundColor: "#ffffff",
        }}
      />
      <Box
        component="section"
        sx={{
          marginBottom: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          paddingLeft: "8rem",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          width={352}
          height={348}
          alignItems="center"
          gap={3}
          position="relative"
        >
          <Box display="flex" alignItems="start" gap={1.5} position="relative">
            <StyledBox width={34.02} height={4.58} />
            <StyledBox width={4.58} height={4.58} bgcolor="grey.600" />
            <StyledBox width={4.58} height={4.58} bgcolor="grey.600" />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            height={314}
            alignItems="start"
            gap={7}
            width="100%"
          >
            <Box display="flex" alignItems="center" gap={9}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap={2}
              >
                <StyledBox width={134.13} height={21.09} />
                <StyledBox width={83} height={9.36} />
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap={1.5}
              >
                <StyledBox width={48.69} height={7.7} bgcolor="grey.600" />
                <StyledBox width={68} height={9.36} />
              </Box>

              <Box width={1} height={26.61} bgcolor="grey.600" />

              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap={1.5}
              >
                <StyledBox width={52.94} height={7.7} bgcolor="grey.600" />
                <StyledBox width={68} height={9.36} />
              </Box>

              <Box width={1} height={26.61} bgcolor="grey.600" />

              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap={1.5}
              >
                <StyledBox width={54.83} height={7.7} bgcolor="grey.600" />
                <StyledBox width={68} height={9.36} />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              gap={1}
            >
              <StyledBox width={338.97} height={7.7} bgcolor="grey.600" />
              <StyledBox width={277.53} height={7.7} bgcolor="grey.600" />
              <StyledBox width={338.97} height={1} bgcolor="grey.600" />

              <Box width={331.79} height={86.95} position="relative">
                <Box
                  width={332}
                  height={67}
                  position="absolute"
                  top={5}
                  left={0}
                >
                  <Box
                    position="absolute"
                    width={50}
                    height={67}
                    top={0}
                    left={0}
                  >
                    <StyledBox
                      width={36}
                      height={8}
                      position="absolute"
                      top={59}
                      left={7}
                      bgcolor="grey.600"
                    />
                    <StyledAvatar>
                      <SaltIcon />
                    </StyledAvatar>
                  </Box>

                  <Box
                    position="absolute"
                    width={50}
                    height={67}
                    top={0}
                    left={70}
                  >
                    <StyledBox
                      width={36}
                      height={8}
                      position="absolute"
                      top={59}
                      left={7}
                      bgcolor="grey.600"
                    />
                    <StyledAvatar>
                      <SaltIcon />
                    </StyledAvatar>
                  </Box>

                  <Box
                    position="absolute"
                    width={50}
                    height={67}
                    top={0}
                    left={141}
                  >
                    <StyledBox
                      width={36}
                      height={8}
                      position="absolute"
                      top={59}
                      left={7}
                      bgcolor="grey.600"
                    />
                    <StyledAvatar>
                      <SaltIcon />
                    </StyledAvatar>
                  </Box>

                  <Box
                    position="absolute"
                    width={50}
                    height={67}
                    top={0}
                    left={211}
                  >
                    <StyledBox
                      width={36}
                      height={8}
                      position="absolute"
                      top={59}
                      left={7}
                      bgcolor="grey.600"
                    />
                    <StyledAvatar>
                      <SaltIcon />
                    </StyledAvatar>
                  </Box>

                  <Box
                    position="absolute"
                    width={50}
                    height={67}
                    top={0}
                    left={282}
                  >
                    <StyledBox
                      width={36}
                      height={8}
                      position="absolute"
                      top={59}
                      left={7}
                      bgcolor="grey.600"
                    />
                    <StyledAvatar>
                      <SaltIcon />
                    </StyledAvatar>
                  </Box>
                </Box>

                <StyledBox
                  width={72}
                  height={9}
                  position="absolute"
                  top={0}
                  left={0}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
