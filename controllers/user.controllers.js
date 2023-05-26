const { user, sequelize } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// import gravatarUrl from 'gravatar-url';
const gravatarUrl = require("gravatar");
// import "gravatar-url"

const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    //make defaut avatar
    const avatarUrl = gravatarUrl.url(email);
    // generate a random string
    const salt = bcryptjs.genSaltSync(10);

    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      avatar: avatarUrl,
    });
    res.status(201).send(newUser);
  } catch ({ error }) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    newUser = await user.findOne({
      where: {
        email,
      },
    });
    if (newUser) {
      const isAuth = bcryptjs.compareSync(password, newUser.password);
      if (isAuth) {
        const token = jwt.sign(
          { email: newUser.email, type: newUser.type },
          "thien-tan",
          { expiresIn: 30 * 60 }
        );
        res.status(200).send({
          isTrue: true,
          email: email,
          message: "Dang nhap thanh cong",
          token: token,
        });
      } else {
        res.status(500).send({
          isTrue: false,
          message: "Tai khoan hoac mat khau khong dung",
        });
      }
    } else {
      res.status(404).send({ message: "khong tim thay user" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  const urlImage = `http://localhost:3000/${file.path}`;
  const userInformation = req.user;
  const userFound = await user.findOne({
    where: {
      email: userInformation.email,
    },
  });
  userFound.avatar = urlImage;

  await userFound.save();
  return res.send({
    message: "File uploaded successfully.",
    link: urlImage,
    user: userFound,
  });
};

const getAllTrip = async (req, res) => {
  try {
    const [result, metadata] = await sequelize.query(
      //remember require sequelize from models
      `select users.name as userName, fromSta.name as fromStation, toSta.name as toStation
      from users
      inner join tickets on users.id = tickets.user_id
      inner join trips on trips.id = tickets.trip_id
      inner join stations as fromSta on fromSta.id = trips.fromStation
      inner join stations as toSta on toSta.id = trips.toStation;`
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  uploadAvatar,
  getAllTrip,
};
