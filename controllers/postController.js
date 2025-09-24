const posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'}
];

// @desc   get all posts
// @route  GET api/posts
const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) res.status(200).json(posts.slice(0, limit));
    res.status(200).json(posts);
};

// @desc   get single post
// @route  GET api/posts/:id
const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`A post with the ID of ${id} was not found`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
};

// @desc   create post
// @route  POST api/posts
const createPost = (req, res, next) => {
    console.log("body do req POST: ", req.body);
    const newPost = {
        id: Date.now(),
        title: req.body.title
    }
    if (!newPost.title) {
        const error = new Error("Please provide a title");
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(posts);
};

// @desc   update post
// @route  PUT api/posts/:id
const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`The post with the ID of ${id} was not found`);
        error.status = 404;
        return next(error);
    }
    if (!req.body.title) {
        const error = new Error(`Please provide a title to Update the Post`);
        error.status = 400;
        return next(error);
    }
    post.title = req.body.title;
    res.status(201).json({ mgs: `Post with an ID of ${id} was updated succesufly`, posts });
};

// @desc   delete post
// @route  DELETE api/posts/:id
const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.status(200).json({ msg: `Post with an ID of ${id} was Deleted with success` });
    } else {
        const error = new Error('The post ID provided was not Found');
        error.status = 404;
        return next(error);
    }
};

export { getPosts, getPost, createPost, updatePost, deletePost };