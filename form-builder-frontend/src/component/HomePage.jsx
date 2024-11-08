import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleForm from "./SingleForm";
import Loader from "./Loader";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [allForms, setAllForms] = useState([]);

  const navigate = useNavigate();

  const handleDeleteForm = async (id) => {
    try {
      const res = await fetch(
        `https://zero5-mern-form-builder.onrender.com/api/forms/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Could not delete this form");
      setAllForms((prev) => prev.filter((form) => form._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h4">Welcome to Form.com</Typography>
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
      <Typography variant="h4" mt={2}>
        Forms
      </Typography>
      {isLoading && <Loader message="Loading your forms, Please hold on!" />}
      {!isLoading && allForms.length > 0 && (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
          {allForms.map((form) => (
            <SingleForm
              key={form._id}
              form={form}
              onDeleteForm={handleDeleteForm}
            />
          ))}
        </Box>
      )}
      {!isLoading && allForms.length === 0 && (
        <Typography variant="body2" sx={{ color: "#666" }}>
          You have no forms created yet
        </Typography>
      )}
    </Box>
  );
}
