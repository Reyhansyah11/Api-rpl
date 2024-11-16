// models/Category.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Gallery from "./Gallery.js";
import TopProject from "./TopProject.js";

const Category = sequelize.define('Category', {
    name_jurusan: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Menambahkan relasi one-to-many
Category.hasMany(Gallery, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
});
Gallery.belongsTo(Category);

Category.hasMany(TopProject, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
});
TopProject.belongsTo(Category);

export default Category;