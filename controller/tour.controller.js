const Tour = require("../models/Tour");

module.exports.getAllTours = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.sort) {
      // price quantity ---> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy == sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 1 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    const result = await Tour.find({})
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sort);
      const total=await Tour.countDocuments(filters);
      const pageCount=Math.ceil(total/queries.limit)
    res.status(200).json({
      status: "success",
      data: {pageCount,total,data:result},
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "cant get data ",
      error: err.message,
    });
  }
};

module.exports.saveTour = async (req, res, next) => {
  try {
    const result = await Tour.create(req.body);
    result.logger();
    res.status(200).json({
      status: "success",
      message: "data inserted successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "data not inserted ",
      error: err.message,
    });
  }
};

module.exports.getSingleTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Tour.find({ _id: id });
    await Tour.updateOne(
      { _id: id },
      { $inc: { viewCount: 1 } },
      {
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",

      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Cant get data ",
      error: err.message,
    });
  }
};

module.exports.updateSingleTour=async(req, res, next)=>{
  try {
    const { id } = req.params;
    const result = await Tour.updateOne({ _id: id },  req.body, { runValidators: true });
  
    res.status(200).json({
      status: "success",

      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Cant update data ",
      error: err.message,
    });
  }
}

module.exports.trendingTour=async(req, res, next)=>{
  try {
    const result = await Tour.find({}).sort({viewCount:-1}).limit(3);
 
    res.status(200).json({
      status: "success",

      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Cant find data ",
      error: err.message,
    });
  }
}
module.exports.cheapestTour=async(req, res, next)=>{
  try {
    const result = await Tour.find({}).sort({price:1}).limit(3);
  
    res.status(200).json({
      status: "success",

      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Cant find data ",
      error: err.message,
    });
  }
}
