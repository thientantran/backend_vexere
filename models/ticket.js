"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, trip }) {
      // define association here
      this.belongsTo(user, { foreignKey: "user_id" });
      this.belongsTo(trip, { foreignKey: "trip_id" });
    }
  }
  Ticket.init(
    {},
    {
      sequelize,
      modelName: "ticket",
    }
  );
  return Ticket;
};
