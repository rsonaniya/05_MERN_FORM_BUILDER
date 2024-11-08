import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function ViewForm() {
  const [currentForm, setCurrentForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted, Thank You!, Open console for form data");
    console.log(formData);
  };
  useEffect(() => {
    const fetchForm = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://zero5-mern-form-builder.onrender.com/api/forms/${id}`
        );
        if (!res.ok) throw new Error("Couldn't fetch the form");
        const form = await res.json();
        setCurrentForm(form.form);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchForm();
  }, [id]);
  return (
    <Box border={"1px solid #ccc"} borderRadius={1} p={2}>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Typography textAlign={"center"} variant="h4" mb={4}>
            {currentForm.name}
          </Typography>
          <Grid2 container rowSpacing={1} mb={5}>
            {currentForm?.inputs?.map((input) => (
              <Grid2 key={input._id} size={6} textAlign={"center"}>
                <TextField
                  variant="standard"
                  label={input.title}
                  placeholder={input.type !== "date" ? input.placeholder : ""}
                  type={input.type}
                  InputLabelProps={
                    input.type === "date" ? { shrink: true } : {}
                  }
                  name={input.title}
                  onChange={handleChange}
                  sx={{ width: "200px" }}
                />
              </Grid2>
            ))}
          </Grid2>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="success"
            sx={{ display: "block", margin: "10px auto" }}
          >
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
}
