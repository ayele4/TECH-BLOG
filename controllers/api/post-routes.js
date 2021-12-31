const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', (req, res) => {
    Post.create({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
           'post_body',
           'title',
           'created_at', 
        ],
        include: [
            {
                model: comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_id'],
                include: {
                    model: user,
                    attributes: ['username']
                }
            },  
            {
                model:user,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_body',
           'title',
           'created_at',
        ],
        include: [
            {
                model: comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_id'],
                include: {
                    model: user,
                    attributes: ['username'] 
            }
        },
        {
            model:user,
            attributes: ['username']
        }
        ]
    })
    .then(dbPostData => {
        if(dbPostData) {
            res.status(400).json({ message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    }); 
});

router.post('/', withAuth, (req, res) => {
    post.create({
        title: req.body.title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/:id', withAuth, (req, res) => {
    post.updte(
        {
            title: req.body.title,
            post_body: req.body.post_body
        },
        {
           where: {
               id: req.params.id
           } 
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
        res.status(400).json({message: 'No post found with this id'});
        return;
    }
            res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});


router.delete('/:id' ,withAuth, (req, res) =>{
    post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(400).json({message: 'No post found with this id'});
        return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;