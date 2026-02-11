const {Router} = require("express")
const controller = require("../controllers/comment.controller");
const { commentsRouter } = require("..");
const router = Router()

router.post("/", controller.bulkCreate);
router.post("/", );

router.patch("/:id", controller.updateComment);
router.post("/find-or-create", controller.findOrCreate);
router.get("/search", controller.search);
router.get("/newest/:postId", controller.newest);
router.get("/details/:id", controller.getCommentDetails);


module.exports = {commentsRouter:router};