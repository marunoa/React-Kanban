'use strict';
module.exports = function (sequelize, DataTypes) {
  var Card = sequelize.define('Cards', {
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    assignedTo: DataTypes.STRING,
  }, {
    classMethod: {

    }
  });
  return Card;
};
