const express = require("express");
const cors = require("cors");
const path = require("path");
const { rootRouter } = require("./routers");
const { sequelize } = require("./models");
const app = express();
app.use(cors());
app.use(express.json());

const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

app.use("/api/v1", rootRouter);
// lession 32 give the guide to set up api in postman

app.listen(3030, async () => {
  console.log("App listening on port 3000");
  try {
    await sequelize.authenticate();
    console.log("Connect OK");
  } catch (err) {
    console.error("Connect fail");
  }
});

// https://viblo.asia/p/tao-model-migration-seeds-voi-sequelize-1VgZvOXplAw
