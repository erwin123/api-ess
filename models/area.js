'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    AreaCode: DataTypes.STRING,
    ParentAreaCode: DataTypes.STRING,
    Description: DataTypes.STRING,
    Levels: DataTypes.NUMBER,
    CreateDate: {
      type: DataTypes.STRING,
      get() {
        const title = this.getDataValue('CreateDate');
        // 'this' allows you to access attributes of the instance
        return moment(this.getDataValue('CreateDate')).format("YYYY-MM-DD HH:mm:sss");
      }
    },
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
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