const tokenAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "Token Not Valid! Please Login Again",
    });
  }
  try {
    const decode = jwt.verify(token, "sushant1234");
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Token Not Valid! Please Login Again",
    });
  }
};

// authorized roles
const authorizedRoles = (middle) => {
  return (req, res, next) => {
    if (middle.includes(req.user.role)) {
      return res.status(403).json({
        message: "You have not authorized for this role",
      });
    }
    next();
  };
};

module.exports = { authorizedRoles, tokenAuth };
