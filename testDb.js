const db = require("./models");

const testUser = async () => {
  try {
    const newUser = db.User.create({
      name: "Bruce",
      email: "bruce@bruce.com",
      password: "password1234",
    });
  } catch (err) {
    console.log(err);
  }
};

testUser();
