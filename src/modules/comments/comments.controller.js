const { Comment, User, Post } = require("../models/index.model");
exports.bulkCreate = async (req, res) => {
  await Comment.bulkCreate(req.body.comments);
  res.json({ message: "Comments created" });
};

exports.updateComment = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (!comment) return res.json({ message: "comment not found" });

  if (comment.UserId != req.body.userId)
    return res.json({ message: "Not authorized" });

  comment.content = req.body.content;
  await comment.save();
  res.json({ message: "Comment updated" });
};

exports.findOrCreate = async (req, res) => {
  const [comment, created] = await Comment.findOrCreate({
    where: req.body
  });
  res.json({ comment, created });
};

exports.search = async (req, res) => {
  const comments = await Comment.findAll({
    where: {
      content: { [require("sequelize").Op.like]: `%${req.query.word}%` }
    }
  });
  comments.length
    ? res.json({ count: comments.length, comments })
    : res.json({ message: "no comments found" });
};

exports.newest = async (req, res) => {
  const comments = await Comment.findAll({
    where: { PostId: req.params.postId },
    limit: 3,
    order: [["createdAt", "DESC"]]
  });
  res.json(comments);
}; 


exports.getCommentDetails = async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Post,
        attributes: ["id", "title", "content"],
      },
    ],
  });

  if (!comment) {
    return res.json({ message: "no comment found" });
  }

  res.json(comment);
};