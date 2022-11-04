import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  const newUser = {
    username,
    avatar,
  };

  users.push(newUser);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  const newTweet = {
    username,
    tweet,
  };

  tweets.push(newTweet);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const lastTweets = tweets.slice(-10);
  lastTweets.map((tweet) => {
    users.find((user) => {
      if (user.username === tweet.username) {
        tweet.avatar = user.avatar;
      }
    });
  });
  res.send(lastTweets);
});

app.listen(5000);
