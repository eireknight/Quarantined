var express = require("express");

function Schema (title, url, author, category, score, votes, comments, created, views, type, text){
this.title = title;
this.url = url;
this.author = author;
this.category = category;
this.score = score;
this.votes = votes;
this.comments = comments;
this.created = created;
this.views = views;
this.type = type;
this.text = text;
}

var app = express();

var commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

commentSchema.set("toJSON");
commentSchema.options.toJSON = function(res) {
  var obj = {res};
  delete obj.id;
  return obj;
};

var postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [{ user: Schema.Types.ObjectId, vote: Number, _id: false }],
  comments: [commentSchema],
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  type: { type: String, default: 'link', required: true },
  text: { type: String },
});

postSchema.set('toJSON');
postSchema.options.toJSON = function(res) {
  var obj = {res};
  delete obj._id;
  return obj;
};


postSchema.methods.vote = function (user, vote) {
  var existingVote = this.votes.find(item => item.user._id.equals(user));

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (vote === 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      // change vote
      this.score += vote;
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
  }

  return this.save();
};

postSchema.methods.addComment = function (author, body) {
  this.comments.push({ author, body });
  return this.save();
};

postSchema.methods.removeComment = function (id) {
  var comment = this.comments.id(id);
  if (!comment) throw new Error('Comment not found');
  comment.remove();
  return this.save();
};

postSchema.post('save', function (doc, next) {
  if (this.wasNew) this.vote(this.author._id, 1);
  doc
    .populate('author')
    .populate('comments.author')
    .execPopulate()
    .then(() => next());
});

var Post = express.model('Post', postSchema);

module.exports = Post;