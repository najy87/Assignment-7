const { Router } = require("express");
const {User,Comment,Post} = require('../../DB')

const router = Router()
const {createPost,deletePost,getPostsWithDetails,getPostsWithCommentCount} = require('./post.service')


router.get('/',async (req,res,next)=>{
    try {
        const {title, content,description} = req.body
        const createdPost = await createPost({title, content,description})
        return res.status(201).json({massege:'post created successfully',succsess:true,post:{createdPost}})


    } catch (error) {
    return res.status(error.cause || 500 ).json({massege:error.massege,succsess:false})
    }
})



router.get('/comment-count', async (req, res, next) => {
  try {
    const posts = await getPostsWithCommentCount()
    if (!posts || posts.length === 0) throw new Error('no posts found', { cause: 404 })

    return res.status(200).json({
      massege: 'posts retrieved successfully',
      succsess: true,
      posts: posts
    })
  } catch (error) {
    return res.status(error.cause || 500).json({
      massege: error.massege || error.message,
      succsess: false
    })
  }
})


router.get('/details', async (req, res, next) => {
    
  try {
    const posts = await getPostsWithDetails()
    if(getPostsWithDetails)
    return res.status(200).json({
      massege: 'posts retrieved successfully',
      succsess: true,
      posts
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      massege: error.message,
      succsess: false
    })
  }

})





router.get('/comment-count', async (req, res, next) => {
  try {
    const posts = await getPostsWithCommentCount()
    if (!posts || posts.length === 0) throw new Error('no posts found', { cause: 404 })

    return res.status(200).json({
      massege: 'posts retrieved successfully',
      succsess: true,
      posts: posts
    })
  } catch (error) {
    return res.status(error.cause || 500).json({
      massege: error.massege || error.message,
      succsess: false
    })
  }
})



router.delete('/:id',async (req,res,next)=>{
    try {
        const {id} = req.params;
        const deletedPost = await deletePost(id)
        if(!deletedPost) throw new Error ('post not found',{cause:404}) 
        return res.status(200).json({massege:"post deleted sussessfully",succsess:true,post:deletedPost})
    } catch (error) {
    return res.status(error.cause || 500 ).json({massege:error.massege,succsess:false})    
}
   
})



module.exports ={postRouter : router}