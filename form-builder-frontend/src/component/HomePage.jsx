import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [allForms, setAllForms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://zero5-mern-form-builder.onrender.com/api/forms"
        );

        if (!res.ok) {
          throw new Error("Could not fetch the data");
        }
        const data = await res.json();
        setAllForms(data.allForms);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(allForms);
  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h3">Welcome to Form.com</Typography>
        <Typography variant="body2" sx={{ color: "#666" }}>
          This is a simple form builder.
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{ mt: 2 }}
          onClick={() => navigate("/form/create")}
        >
          Create New Form
        </Button>
        <Divider sx={{ mt: 2 }} />
      </Box>
      <Box></Box>
    </Box>
  );
}
