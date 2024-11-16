// models/TopProject.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TopProject = sequelize.define('TopProject', {
    project_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url_project: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},  {
    underscored: true, // Jika Anda menggunakan nama kolom dengan garis bawah
  }
);

export default TopProject;