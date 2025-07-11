import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import Navbar from "./Navbar";
import AddCompanyForm from "./AddCompanyForm";

const PAGE_LIMIT = 20;

const CompanyList = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [city, setCity] = useState();
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    setCompanies([]);
    setPage(1);
    setHasMore(true);
  }, [city, sortBy, debouncedSearch]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/companies/GetCities"
        );
        setCities(res.data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    setCompanies([]);
    setPage(1);
    setHasMore(true);
    setFetchTrigger((prev) => prev + 1);
  }, [city, sortBy, debouncedSearch]);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:3000/api/companies/GetAllcompanies",
          {
            params: {
              city,
              sortBy,
              page,
              limit: PAGE_LIMIT,
              search: debouncedSearch,
            },
          }
        );

        const newCompanies = res.data.companies || res.data;

        if (page === 1) {
          setCompanies(newCompanies);
        } else {
          setCompanies((prev) => [...prev, ...newCompanies]);
        }

        if (newCompanies.length < PAGE_LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, [fetchTrigger, page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSave = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("foundedOn", data.foundedOn);
      formData.append("city", data.city);
      if (data.logo) {
        formData.append("logo", data.logo);
      }

      const response = await axios.post(
        "http://localhost:3000/api/companies/companyAdd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCompanies([]);
      setPage(1);
      setHasMore(true);
      setFetchTrigger((prev) => prev + 1);

      setOpenAddModal(false);
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Failed to save company");
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {Array(fullStars)
          .fill("★")
          .map((_, i) => (
            <Typography
              key={`full-${i}`}
              sx={{ color: "#FFD700", fontSize: "1rem" }}
            >
              ★
            </Typography>
          ))}
        {halfStar && (
          <Typography sx={{ color: "#FFD700", fontSize: "1rem" }}>⯪</Typography>
        )}
        {Array(emptyStars)
          .fill("★")
          .map((_, i) => (
            <Typography
              key={`empty-${i}`}
              sx={{ color: "#E0E0E0", fontSize: "1rem" }}
            >
              ★
            </Typography>
          ))}
      </Box>
    );
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
        <Box
          sx={{
            position: "sticky",
            top: { xs: 64, sm: 64 },
            zIndex: 100,
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            mb: 4,
            gap: 2,
            flexWrap: "wrap",
            py: 2,
            px: 1,
            borderBottom: "1px solid #eee",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Autocomplete
              options={cities}
              value={city || null}
              onChange={(event, newValue) => setCity(newValue)}
              freeSolo={false}
              clearOnEscape
              sx={{
                width: { xs: "100%", sm: 250 },
                minHeight: 40,
                ".MuiInputBase-root": { minHeight: 40 }, // consistent input height
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select City"
                  size="small"
                  sx={{ width: "100%" }}
                />
              )}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: { xs: "100%", sm: 250 },
                minHeight: 40,
                ".MuiInputBase-root": { minHeight: 40 },
              }}
            />

            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => setOpenAddModal(true)}
              sx={{
                background: "linear-gradient(90deg, #800080, rgb(93, 32, 215))",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgb(93, 32, 215), #800080)",
                },
                whiteSpace: "nowrap",
                minHeight: 40,
              }}
            >
              + Add Company
            </Button>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="small"
              sx={{ minWidth: 120, minHeight: 40 }}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="location">Location</MenuItem>
            </Select>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Result Found: {companies.length}
        </Typography>

        {companies.map((company) => (
          <Paper
            key={company._id}
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              minHeight: 80,
              width: "100%",
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Box
              component="img"
              src={`http://localhost:3000${company.logo}`}
              alt={company.name}
              sx={{
                width: 48,
                height: 48,
                objectFit: "contain",
                marginRight: 2,
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
            />

            <Box sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "#222",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.location || "N/A"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 0.5,
                }}
              >
                {renderStars(parseFloat(company.averageRating) || 0)}
                <Typography variant="caption" sx={{ color: "#666" }}>
                  {company.reviews?.length || 0} Reviews
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                marginLeft: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                minWidth: 100,
              }}
            >
              <Typography variant="caption" sx={{ color: "#999", mb: 0.5 }}>
                {company.foundedOn
                  ? `Founded on ${new Date(
                      company.foundedOn
                    ).toLocaleDateString("en-GB")}`
                  : "Reg. Date N/A"}
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#333",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#555" },
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  paddingX: 1.5,
                  paddingY: 0.5,
                  minHeight: "26px",
                }}
                onClick={() => navigate(`/company/${company._id}`)}
              >
                Detail Review
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
      {hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
            sx={{
              backgroundColor: "#800080",
              "&:hover": { backgroundColor: "#660066" },
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
      <AddCompanyForm
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default CompanyList;
