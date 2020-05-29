var mysql = require('mysql');

class Create {
    constructor(conn) {
        this.conn = conn;
    }

    createPost(post) {
        if (err)
        throw (err);

        return this.conn.query(
            `INSERT INTO posts (userId, title, url, createdAt, updatedAt)
             VALUES (?, ?, ?, NOW(), NOW(), ?)`,
            [post.userId, post.title, post.url]
        )
        .then(result => {
            return result.insertId;
        });
    }

    createComment(comment) {
        return this.conn.query(`
            INSERT INTO comments (userId, postId, text, createdAt, updatedAt)
            VALUES (?, ?, ?, NOW(), NOW())`,
            [comment.userId, comment.postId, comment.text]
        )
        .then(result => {
            return result.insertId;
        });
    }

    createVote(vote) {
        if (err)
        throw (err);

        return this.conn.query(`
            INSERT INTO votes (postId, userId, voteDirection)
            VALUES (?, ?, ?)`,
            [vote.postId, vote.userId, vote.voteDirection]
        );

    }};

    module.exports = create;