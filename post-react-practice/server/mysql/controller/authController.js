import { verify } from "../../util/jwt-util.js";

const authJWT = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    const result = verify(token);
    console.log("--------------------------");
    console.log(result);
    if (result.ok) {
      //oken이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
      res.status(200).json(result);
    } else {
      // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
      res.status(401).json({
        ok: false,
        message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
      });
    }
  }
};

export { authJWT };
