import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const authenticateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(400);
    throw new Error("Kindly login");
  }
});

export default authenticateToken;
