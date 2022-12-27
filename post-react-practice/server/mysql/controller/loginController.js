import userDatabase from "../../UserDatabase.js";
import * as jwt from "../../util/jwt-util.js";
import redisClient from "../../util/redis.js";

const login = (req, res) => {
  // 로그인 로직
  const { email, password } = req.body;
  const userInfo = userDatabase.filter(item => item.email === email)[0];
  const success = userInfo ? true : false;

  if (success) {
    const accessToken = jwt.sign(userInfo);
    const refreshToken = jwt.refresh();

    redisClient.set(userInfo.userId, refreshToken);

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      // httpOnly : true, javascript 에서 token 접근 불가
    });
    res.status(200).json({
      ok: true,
      data: userInfo,
    });
  } else {
    res.status(401).json({
      ok: false,
      message: "password is incorrect",
    });
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

export { login, logout };
