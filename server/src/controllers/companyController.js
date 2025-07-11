import Company from "../models/Company.js";

export const companyAdd = async (req, res) => {
  try {
    const company = new Company({
      name: req.body.name,
      location: req.body.location,
      foundedOn: req.body.foundedOn,
      city: req.body.city,

      logo: req.file
        ? `/uploads/${req.file.filename}`
        : "https://via.placeholder.com/150",
    });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetAllcompanies = async (req, res) => {
  try {
    const {
      search,
      city,
      sortBy,
      sortOrder = "asc",
      page = 1,
      limit = 20,
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const match = {};
    if (search) {
      match.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }
    if (city) match.city = { $regex: city, $options: "i" };

    const isRatingSort = sortBy === "rating";
    const sortField = isRatingSort ? "averageRating" : sortBy || "name";
    const sortDirection = isRatingSort
      ? -1
      : sortOrder.toLowerCase() === "desc"
      ? -1
      : 1;

    const sort = {};
    sort[sortField] = sortDirection;

    console.log("match", match);
    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              {
                $avg: {
                  $map: {
                    input: "$reviews",
                    as: "review",
                    in: "$$review.rating",
                  },
                },
              },
              0,
            ],
          },
        },
      },
      { $sort: sort },
      { $skip: (pageNum - 1) * limitNum },
      { $limit: limitNum },
    ];

    const companies = await Company.aggregate(pipeline);

    const totalCount = await Company.countDocuments(match);

    res.json({ companies, totalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetSinglecompanies = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate("reviews");
    if (!company) return res.status(404).json({ error: "Company not found" });
    const averageRating = company.reviews.length
      ? (
          company.reviews.reduce((sum, review) => sum + review.rating, 0) /
          company.reviews.length
        ).toFixed(1)
      : 0;
    res.json({ ...company.toObject(), averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetCities = async (req, res) => {
  try {
    const cities = await Company.distinct("city");
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
