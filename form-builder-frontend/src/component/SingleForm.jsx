/* eslint-disable react/prop-types */
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SingleForm({ form, onDeleteForm }) {
  return (
    <Box component={Paper} p={2} width={250}>
      <Typography variant="body1">{form.name}</Typography>
      <Box p={2}>
        <Link to={`/form/${form._id}`}>
          <Button color="success" size="small">
            View
          </Button>
        </Link>
        <Link to={`/form/${form._id}/edit`}>
          <Button color="primary" size="small">
            Edit
          </Button>
        </Link>
        <Button
          color="error"
          size="small"
          onClick={() => onDeleteForm(form._id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
