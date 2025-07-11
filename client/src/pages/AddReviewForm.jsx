import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const STAR_DESCRIPTIONS = ["Poor", "Fair", "Good", "Very Good", "Satisfied"];

const AddReviewForm = ({ companyId, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: 4,
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleStarClick = (index) => {
    setFormData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.reviewText.trim()) {
      newErrors.reviewText = "Review text is required";
    }
    if (formData.rating < 1 || formData.rating > 5)
      newErrors.rating = "Please select a rating";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/reviews/AddReview", {
        ...formData,
        company: companyId,
      });
      setLoading(false);
      onClose();
      navigate(-1);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to submit review");
    }
  };

  return (
    <Box sx={{ position: "relative", p: 4, pt: 3 }}>
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
        Add Review
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Full Name"
          name="fullName"
          placeholder="Enter"
          fullWidth
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          label="Subject"
          name="subject"
          placeholder="Enter"
          fullWidth
          value={formData.subject}
          onChange={handleChange}
          error={!!errors.subject}
          helperText={errors.subject}
        />
        <TextField
          label="Enter your Review"
          name="reviewText"
          placeholder="Description"
          multiline
          rows={4}
          fullWidth
          value={formData.reviewText}
          onChange={handleChange}
          error={!!errors.reviewText}
          helperText={errors.reviewText}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
            mb: 3,
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            Rating
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            {[...Array(5)].map((_, i) => (
              <Typography
                key={i}
                onClick={() => handleStarClick(i)}
                sx={{
                  cursor: "pointer",
                  color: i < formData.rating ? "#FFD700" : "#E0E0E0",
                  fontSize: "2rem",
                  userSelect: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "#FFC107" },
                }}
              >
                ★
              </Typography>
            ))}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minWidth: 80, textAlign: "right" }}
          >
            {STAR_DESCRIPTIONS[formData.rating - 1]}
          </Typography>
        </Box>

        {errors.rating && (
          <Typography color="error" variant="body2">
            {errors.rating}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(90deg, #800080, rgb(93, 32, 215))",
            fontWeight: 700,
            textTransform: "none",
            py: 1.5,
            borderRadius: 2,
            "&:hover": {
              background: "linear-gradient(90deg, rgb(93, 32, 215), #800080)",
            },
          }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddReviewForm;
