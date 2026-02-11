const {Post} = require('../../DB')



const createPost = async (postData)=>{
    // prepare data 
    // const user = new User(userData)

    // const createdUser = await user.save()
    
    const createdPost = await Post.create(postData)
    return createdPost;
}



const getPostsWithDetails = async () => {
  const posts = await Post.findAll({
    attributes: ['id', 'title'],
    include: [
      { model: User, attributes: ['id', 'name'] },
      { model: Comment, attributes: ['id', 'content'] }
    ]
  })

  if (!posts || posts.length === 0) throw new Error('no posts found')
  return posts
}


const getPostsWithCommentCount = async () => {
  const posts = await Post.findAll({
    attributes: [
      'id',
      'title',
    ]})

  if (!posts || posts.length === 0) throw new Error('no posts found')

  return posts
}



const deletePost = async (condition)=>{
    const post =await Post.findByPk(condition)
    if(!post) throw new Error ('post not found',{cause:404})
    return post.destroy(condition) 
} 


module.exports= {createPost,deletePost,getPostsWithDetails,getPostsWithCommentCount}