const authorization = (...role) => {
  // this authorization function return a middile thats why we write a middileware function
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "fail",
        error: "you are not authorized to access this",
      });
    }
    next();
  };
};

module.exports = authorization;
