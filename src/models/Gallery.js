// models/Gallery.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Gallery = sequelize.define(
  "Gallery",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quote: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    portfolio_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true, // Jika Anda menggunakan nama kolom dengan garis bawah
  }
);

export default Gallery;
