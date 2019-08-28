'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    AreaCode: DataTypes.STRING,
    ParentAreaCode: DataTypes.STRING,
    Description: DataTypes.STRING,
    Levels: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Area.associate = function (models) {
    // associations can be defined here
  };
  return Area;
};