import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Toolbar,
  Button,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddReviewForm from "./AddReviewForm";
import Navbar from "./Navbar";

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/companies/GetSinglecompanies/${id}`
      );
      setCompany(res.data);
    };
    fetchCompany();
  }, [id]);

  const renderStars = (rating) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {[...Array(5)].map((_, i) => (
          <Typography
            key={i}
            component="span"
            sx={{ color: i < rating ? "#FFD700" : "#E0E0E0", fontSize: "1rem" }}
          >
            ★
          </Typography>
        ))}
      </Box>
    );
  };

  if (!company)
    return <Box sx={{ textAlign: "center", py: 20 }}>Loading...</Box>;

  return (
    <>
      <Navbar />
      <Toolbar /> {/* spacer for fixed navbar */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {/* Company Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Left: Logo and name, rating */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <CardMedia
              component="img"
              image={`http://localhost:3000${company.logo}`}
              alt={company.name}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 1,
                objectFit: "contain",
                bgcolor: "#1e1e2f",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 0.5, maxWidth: 400 }}
              >
                {company.name}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                {renderStars(parseFloat(company.averageRating) || 0)}
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {company.reviews?.length || 0} Reviews
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 400 }}
              >
                {company.location}, {company.city}
              </Typography>
            </Box>
          </Box>

          {/* Right: Founded date + Add Review button */}
          <Box sx={{ textAlign: "right", minWidth: 160 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Founded on{" "}
              {new Date(company.foundedOn).toLocaleDateString("en-GB")}
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #800080, rgb(93, 32, 215))",
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                py: 1,
                borderRadius: 2,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgb(93, 32, 215), #800080)",
                },
              }}
              onClick={() => setOpenAddReviewModal(true)}
            >
              + Add Review
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Reviews List */}
        <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
          Result Found: {company.reviews?.length || 0}
        </Typography>

        <Box>
          {company.reviews?.map((review) => (
            <Box
              key={review._id}
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                alignItems: "flex-start",
                borderBottom: "1px solid #eee",
                pb: 2,
              }}
            >
              <Avatar
                src={review.userAvatar || ""}
                alt={review.userName}
                sx={{ width: 48, height: 48 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {review.userName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString("en-GB")}{" "}
                    {new Date(review.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5 }}>{renderStars(review.rating)}</Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {review.reviewText}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Dialog
          open={openAddReviewModal}
          onClose={() => setOpenAddReviewModal(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{ sx: { borderRadius: 3 } }}
        >
          <DialogContent sx={{ p: 0 }}>
            <AddReviewForm
              companyId={id}
              onClose={() => setOpenAddReviewModal(false)}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default CompanyDetails;
