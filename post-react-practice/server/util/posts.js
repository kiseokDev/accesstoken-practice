import userDatabase from "../UserDatabase.js";
import jwt from "jsonwebtoken";
const getUserIdFromToken = (req, res) => {
  const { body, title } = req.body;
  const token = req.cookies?.accessToken;
  try {
    if (!token) {
      res.status(401).json("Not Authorized");
      return;
    }
    const data = jwt.verify(token, process.env.SECRET);
    const userData = userDatabase.filter(
      user => user.userId === data.userId
    )[0];
    const { userId } = userData || null;
    return userId;
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export default getUserIdFromToken;
