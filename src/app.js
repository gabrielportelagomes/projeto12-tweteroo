import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const users = [
  {
    username: "bobesponja",
    avatar: "https://i.pinimg.com/originals/a6/58/d5/a658d5378a5e497fea8c564a7a217191.png"
  },
  {
    username: "patrick",
    avatar: "https://www.rbsdirect.com.br/imagesrc/25747316.jpg?w=700"
  },
  {
    username: "sandy",
    avatar: "https://i.pinimg.com/originals/dc/9b/be/dc9bbe88452d20e9f630d9abc0069649.jpg"
  },
  {
    username: "lulamolusco",
    avatar: "https://i1.sndcdn.com/avatars-G3hIAVrD9pY3NkLx-JzayQw-t500x500.jpg"
  },
  {
    username: "siriguejo",
    avatar: "https://i.kym-cdn.com/entries/icons/facebook/000/026/111/4917038d8bbd7fe362bed691690c7da4.jpg"
  }
];

const tweets = [
  {
    username: "bobesponja",
    tweet: "mensagem 1"
  },
  {
    username: "bobesponja",
    tweet: "mensagem 2"
  },
  {
    username: "sandy",
    tweet: "mensagem 3"
  },
  {
    username: "lulamolusco",
    tweet: "mensagem 4"
  },
  {
    username: "patrick",
    tweet: "mensagem 5"
  },
  {
    username: "siriguejo",
    tweet: "mensagem 6"
  },
  {
    username: "patrick",
    tweet: "mensagem 7"
  },
  {
    username: "sandy",
    tweet: "mensagem 8"
  },
  {
    username: "patrick",
    tweet: "mensagem 9"
  },
  {
    username: "lulamolusco",
    tweet: "mensagem 10"
  },
  {
    username: "siriguejo",
    tweet: "mensagem 11"
  },
  {
    username: "bobesponja",
    tweet: "mensagem 12"
  },
  {
    username: "sandy",
    tweet: "mensagem 13"
  },
  {
    username: "bobesponja",
    tweet: "mensagem 14"
  }
];

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
