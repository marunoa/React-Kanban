'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    classMethods: {
      /*associate: function(models) {
        // associations can be defined here
        models.User.belongsTo(models.Cards, {
          foreignKey: 'card_id'
        });
      }*/
    }
  });
  return User;
};