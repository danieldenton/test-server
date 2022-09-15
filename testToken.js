const jwt = require("jsonwebtoken");

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
    const secret = "my secret";
    const token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
    console.log(token);
  } catch (err) {
    console.log(err);
  }
};

jwtTest();
