import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    inputs: [],
  });
  const [isAddInputBtnVisible, setIsAddInputBtnVisible] = useState(false);
  const [currentEditField, setCurrentEditField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentEditInput = formData.inputs[currentEditField];
  const navigate = useNavigate();

  const handleAddInputField = (type) => {
    const newInput = { title: "", placeholder: "", type };
    setFormData((prev) => ({ ...prev, inputs: [...prev.inputs, newInput] }));
  };

  const handleChangeFormInput = (e) => {
    currentEditInput[e.target.name] = e.target.value;
    const newInputs = formData.inputs;
    newInputs[currentEditField] = currentEditInput;
    setFormData((prev) => ({ ...prev, inputs: newInputs }));
  };

  const handleDeleteFormInput = (index) => {
    const inputs = formData.inputs.filter((item, i) => i !== index);
    setFormData((prev) => ({ ...prev, inputs }));
  };

  const handleCreateForm = async () => {
    const requestBody = formData;
    const inputWithoutLabel = formData.inputs.find((item) => item.title === "");

    if (inputWithoutLabel !== undefined) {
      return alert("Each Input field should have a title");
    }

    if (!requestBody?.name) {
      requestBody.name = "Untitled Form";
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://zero5-mern-form-builder.onrender.com/api/forms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!res.ok) throw new Error("Could not create the form");
      setFormData({
        name: "",
        inputs: [],
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography align="center" variant="h5" mb={2}>
        Create New Form
      </Typography>

      <Box border={"1px solid #ccc"} borderRadius={1} display="flex">
        <Box
          sx={{ width: "70%", borderRight: "1px solid #ccc" }}
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            justifyContent="center"
          >
            <Typography variant="h6">
              {formData?.name || "Untitled Form"}
            </Typography>
            <EditIcon
              color="primary"
              fontSize="small"
              onClick={() => setCurrentEditField("formTitle")}
            />
          </Box>
          <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
            {formData.inputs.map((input, index) => (
              <Box
                key={index}
                component={Paper}
                p={1}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <TextField
                  label={input.title}
                  placeholder={input.placeholder}
                  type={input.type}
                  variant="standard"
                  size="small"
                  sx={{ width: "180px" }}
                  disabled
                />
                <EditIcon
                  color="primary"
                  fontSize="small"
                  onClick={() => setCurrentEditField(index)}
                />
                <DeleteIcon
                  color="error"
                  fontSize="small"
                  onClick={() => handleDeleteFormInput(index)}
                />
              </Box>
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsAddInputBtnVisible((prev) => !prev)}
              sx={{ px: 2 }}
            >
              {isAddInputBtnVisible ? "Close Add Input" : "Add Input"}
            </Button>
            {isAddInputBtnVisible && (
              <Box display="flex" gap={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddInputField("text")}
                >
                  Text
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddInputField("number")}
                >
                  Number
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddInputField("email")}
                >
                  Email
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddInputField("password")}
                >
                  Password
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddInputField("date")}
                >
                  Date
                </Button>
              </Box>
            )}
            <Button
              color="success"
              size="small"
              variant="contained"
              sx={{ width: "40px" }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <Box
          p={2}
          sx={{ width: "30%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
        >
          <Typography>Form Editor</Typography>
          {!currentEditField && currentEditField !== 0 && (
            <Typography variant="body2">Select to see editor</Typography>
          )}
          {currentEditField === "formTitle" && (
            <TextField
              label="Title"
              size="small"
              variant="standard"
              name="name"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          )}
          {currentEditInput && (
            <Box>
              <TextField
                label="Title"
                variant="standard"
                value={currentEditInput.title}
                onChange={handleChangeFormInput}
                name="title"
              />
              <TextField
                label="Placeholder"
                variant="standard"
                value={currentEditInput.placeholder}
                onChange={handleChangeFormInput}
                name="placeholder"
              />
            </Box>
          )}
        </Box>
      </Box>

      <Button
        color="success"
        size="small"
        variant="contained"
        sx={{ display: "block", margin: "10px auto" }}
        onClick={handleCreateForm}
        disabled={isLoading}
      >
        {isLoading ? "Please Wait" : "Create Form"}
      </Button>
    </Box>
  );
}
