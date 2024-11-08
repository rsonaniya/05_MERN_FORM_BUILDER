import { Box, CircularProgress, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Loader({ message = "Loading Please wait" }) {
  return (
    <Box textAlign="center">
      <CircularProgress />
      <Typography>{message}</Typography>
    </Box>
  );
}
