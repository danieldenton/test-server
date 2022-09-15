const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtTest = async () => {
  try {
    // get server res when user is logged in
    // create jwt payload
    const payload = {
      name: "Im a user",
      id: "1234",
      //   no password
      email: "email@email.com",
    };
    // sign the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    console.log(token);
    // decode the jwt -- make sure that the secret in the jwt is the same as our server
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
  } catch (err) {
    console.log(err);
  }
};

jwtTest();
