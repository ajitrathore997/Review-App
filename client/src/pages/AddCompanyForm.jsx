import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddCompanyModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.foundedOn.trim()) newErrors.foundedOn = "Founded date is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...formData, logo });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          position: "relative",
          overflow: "visible",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
          mb: 1,
          position: "relative",
        }}
      >
        Add Company
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="name"
            placeholder="Company name"
            fullWidth
            size="small"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            name="location"
            placeholder="Location"
            fullWidth
            size="small"
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
          />

          <TextField
            name="foundedOn"
            type="date"
            fullWidth
            size="small"
            value={formData.foundedOn}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.foundedOn}
            helperText={errors.foundedOn}
          />

          <TextField
            name="city"
            placeholder="City"
            fullWidth
            size="small"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />

          <Button
            variant="outlined"
            component="label"
            sx={{
              textTransform: "none",
              justifyContent: "flex-start",
              fontSize: "0.875rem",
              color: "grey.700",
              borderColor: "grey.400",
              "&:hover": {
                borderColor: "grey.600",
                backgroundColor: "grey.100",
              },
              py: 1,
              borderRadius: 1,
            }}
          >
            {logo ? logo.name : "Upload Logo"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
              name="logo"
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              background: "linear-gradient(90deg, #800080,rgb(93, 32, 215))",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              py: 1.5,
              borderRadius: 3,
              "&:hover": {
                background: "linear-gradient(90deg,rgb(93, 32, 215), #800080)",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddCompanyModal;
