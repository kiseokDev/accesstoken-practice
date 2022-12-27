import userDatabase from "../UserDatabase.js";
import jwt from "jsonwebtoken";

const login = (req, res) => {
  const { email, password } = req.body;
  const userInfo = userDatabase.filter(item => item.email === email)[0];
  if (!userInfo) {
    res.status(403).json("Forbidden");
  } else {
    try {
      // accessToken 발급
      const accessToken = jwt.sign(
        {
          userId: userInfo.userId,
          username: userInfo.username,
          email: userInfo.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "5m",
          issuer: "Dev LKS",
        }
      );
      //refreshToken 발급
      const refreshToken = jwt.sign(
        {
          userId: userInfo.userId,
          username: userInfo.username,
          email: userInfo.email,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: "24h",
          issuer: "Dev LKS",
        }
      );
      // token 전송
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
        // httpOnly : true, javascript 에서 token 접근 불가
      });
      res.status(200).json("login success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const accessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = userDatabase.filter(user => user.email === data.email)[0];
    const { password, ...others } = userData;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

const refreshToken = (req, res) => {
  // 용도 : access token 갱신
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET);
    const userData = userDatabase.filter(user => user.email === data.email)[0];

    //새로 발급
    const accessToken = jwt.sign(
      {
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "5m",
        issuer: "Dev LKS",
      }
    );
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });

    res.status(200).json("Access Token Recreated");
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginSucess = (req, res) => {
  const token = req.cookies?.accessToken;
  try {
    if (!token) {
      res.status(401).json("Not Authorized");
    } else {
      const data = jwt.verify(token, process.env.SECRET);
      const userData = userDatabase.filter(
        user => user.email === data.email
      )[0];
      const { password, ...others } = userData;
      res.status(200).json(others);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const logout = (req, res) => {
  console.log("logout");
  try {
    res.cookie("accessToken", "");
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export { login, accessToken, refreshToken, loginSucess, logout };
