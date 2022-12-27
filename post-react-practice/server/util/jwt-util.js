import { promisify } from "util";
import jwt from "jsonwebtoken";
import redisClient from "./redis.js";

const sign = user => {
  const payload = {
    userId: user.userId,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(payload, process.env.SECRET, {
    algorithm: "HS256", // 암호화 알고리즘
    expiresIn: "30m",
    issuer: "Dev LKS",
  });
};

const verify = token => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
    return {
      ok: true,
      id: decoded.userId,
      role: decoded.role,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

const refresh = () => {
  return jwt.sign({}, process.env.SECRET, {
    // refresh token은 payload 없이 발급
    algorithm: "HS256", // 암호화 알고리즘
    expiresIn: "2H",
    issuer: "Dev LKS",
  });
};
const refreshVerify = async (token, userId) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const data = await getAsync(token);
    if (token === data) {
      try {
        jwt.verify(token, process.env.SECRET);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export { sign, verify, refresh, refreshVerify };
