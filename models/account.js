'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    Username: DataTypes.STRING,
    PasswordSalt: DataTypes.STRING,
    PasswordHash: DataTypes.STRING,
    Email: DataTypes.STRING,
    Role: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING,
    Locked: DataTypes.NUMBER,
    LastLogin: DataTypes.DATE
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Account.associate = function (models) {
    // associations can be defined here
  };
  return Account;
};