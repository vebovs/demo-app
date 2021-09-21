const express = require('express');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

app.use(cors({allowedHeaders: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let posts = require('./db');

app.get('/api', (req, res) => {
    try {
        res.status(200);
        res.send('Welcome to the demo API!');
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.send('Something went wrong!');
    }
});

app.get('/api/posts', (req, res) => {
    try {
        res.status(200);
        res.json(posts);
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.send('Something went wrong!');
    }
});

app.get('/api/post/:id', (req, res) => {
    try {
        const post = posts.find(post => post.id === req.params.id);
        if(post) {
            res.status(200);
            res.json(post);
        } else {
            res.status(400);
            res.send('No post found!');
        }
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.send('Something went wrong!');
    }
});

app.post('/api/post', (req, res) => {
    try {
        if(!req.body.title || !req.body.text) {
            res.status(400);
            res.send('Missing title or text!');
        } else {
            const post = {
                id: uuid.v4(),
                title: req.body.title,
                text: req.body.text
            }
            posts.push(post);
            res.status(200);
            res.json(post);
        }
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.send('Something went wrong!');
    }
});

app.put('/api/post/:id/:title/:text', (req, res) => {
    console.log(req.params);
    try {
        const post = posts.find(post => post.id === req.params.id);
        if(post) {
            post.title = req.params.title;
            post.text = req.params.text;
            posts.find(post => {
                if(post.id === req.params.id) {
                    post.title = req.params.title;
                    post.text = req.params.text;
                }
            });
            res.status(200);
            res.json(post);
        } else if(!req.params.title || !req.params.text) {
            res.status(400);
            res.send('Missing title or text!');
        } else if(!post) {
            res.status(400);
            res.send('No post found!');
        }
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.send('Something went wrong!');
    }
});

app.delete('/api/post/:id', (req, res) => {
    try {
        const post = posts.find(post => post.id === req.params.id);
        if(post) {
            posts = posts.filter(post => post.id !== req.params.id);
            res.status(200);
            res.send('Post deleted!');
        } else {
            res.status(400);
            res.send('No post found!');
        }
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.send('Something went wrong!');
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started at port: ' + port));