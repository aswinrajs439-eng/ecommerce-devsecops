const admin = (req, res, next) => {
  console.log("USER DATA:", req.user);

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
};

module.exports = { admin };