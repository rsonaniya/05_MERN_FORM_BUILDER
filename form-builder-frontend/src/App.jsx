import { Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage";
import CreateForm from "./component/CreateForm";
import EditForm from "./component/EditForm";
import ViewForm from "./component/ViewForm";
import { Box } from "@mui/material";

export default function App() {
  return (
    <Box sx={{ maxWidth: "900px" }} mx="auto" mt={3}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/create" element={<CreateForm />} />
        <Route path="/form/:id/edit" element={<EditForm />} />
        <Route path="/form/:id" element={<ViewForm />} />
      </Routes>
    </Box>
  );
}
