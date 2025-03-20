var DataTypes = require("sequelize").DataTypes;
var _BlogTag = require("./blogTag");
var _Blog = require("./blog");
var _Category = require("./category");
var _Comment = require("./comment");
var _Tag = require("./tag");
var _User = require("./user");

function initModels(sequelize) {
  var Category = _Category(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Tag = _Tag(sequelize, DataTypes);
  var BlogTag = _BlogTag(sequelize, DataTypes);
  var Blog = _Blog(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  
  

  Blog.belongsToMany(Tag, { as: 'tagIdTags', through: BlogTag, foreignKey: "blogId", otherKey: "tagId" });
  Tag.belongsToMany(Blog, { as: 'blogIdBlogs', through: BlogTag, foreignKey: "tagId", otherKey: "blogId" });
  BlogTag.belongsTo(Blog, { as: "blog", foreignKey: "blogId"});
  Blog.hasMany(BlogTag, { as: "blogTags", foreignKey: "blogId"});
  Comment.belongsTo(Blog, { as: "blog", foreignKey: "blogId"});
  Blog.hasMany(Comment, { as: "comments", foreignKey: "blogId"});
  Blog.belongsTo(Category, { as: "category", foreignKey: "categoryId"});
  Category.hasMany(Blog, { as: "blogs", foreignKey: "categoryId"});
  BlogTag.belongsTo(Tag, { as: "tag", foreignKey: "tagId"});
  Tag.hasMany(BlogTag, { as: "blogTags", foreignKey: "tagId"});
  Blog.belongsTo(User, { as: "author", foreignKey: "authorId"});
  User.hasMany(Blog, { as: "blogs", foreignKey: "authorId"});
  Comment.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Comment, { as: "comments", foreignKey: "userId"});

  return {
    BlogTag,
    Blog,
    Category,
    Comment,
    Tag,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
