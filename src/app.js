import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://i.pinimg.com/originals/a6/58/d5/a658d5378a5e497fea8c564a7a217191.png",
  },
  {
    username: "patrick",
    avatar: "https://www.rbsdirect.com.br/imagesrc/25747316.jpg?w=700",
  },
  {
    username: "sandy",
    avatar:
      "https://i.pinimg.com/originals/dc/9b/be/dc9bbe88452d20e9f630d9abc0069649.jpg",
  },
  {
    username: "lulamolusco",
    avatar:
      "https://i1.sndcdn.com/avatars-G3hIAVrD9pY3NkLx-JzayQw-t500x500.jpg",
  },
  {
    username: "siriguejo",
    avatar:
      "https://i.kym-cdn.com/entries/icons/facebook/000/026/111/4917038d8bbd7fe362bed691690c7da4.jpg",
  },
];

const tweets = [
  {
    username: "bobesponja",
    tweet: "mensagem 14",
  },
  {
    username: "bobesponja",
    tweet: "mensagem 13",
  },
  {
    username: "sandy",
    tweet: "mensagem 12",
  },
  {
    username: "lulamolusco",
    tweet: "mensagem 11",
  },
  {
    username: "patrick",
    tweet: "mensagem 10",
  },
  {
    username: "siriguejo",
    tweet: "mensagem 9",
  },
  {
    username: "patrick",
    tweet: "mensagem 8",
  },
  {
    username: "sandy",
    tweet: "mensagem 7",
  },
  {
    username: "patrick",
    tweet: "mensagem 6",
  },
  {
    username: "lulamolusco",
    tweet: "mensagem 5",
  },
  {
    username: "siriguejo",
    tweet: "mensagem 4",
  },
  {
    username: "bobesponja",
    tweet: "mensagem 3",
  },
  {
    username: "sandy",
    tweet: "mensagem 2",
  },
  {
    username: "bobesponja",
    tweet: "mensagem 1",
  },
];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const newUser = {
    username,
    avatar,
  };

  users.push(newUser);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.headers.user;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const newTweet = {
    username,
    tweet,
  };

  tweets.unshift(newTweet);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const page = req.query.page;
  const lastTweets = [];

  tweets.map((tweet) => {
    users.find((user) => {
      if (user.username === tweet.username) {
        tweet.avatar = user.avatar;
      }
    });
  });

  if (page >= 1) {
    if (page === 1) {
      for (let i = 0; i < 10; i++) {
        if (i < tweets.length) {
          lastTweets.push(tweets[i]);
        }
      }
    } else {
      for (let j = 0; j < 10; j++) {
        if (10 * (page - 1) + j > tweets.length - 1) {
          break;
        } else {
          lastTweets.push(tweets[10 * (page - 1) + j]);
        }
      }
    }
  } else {
    res.status(400).send("Informe uma página válida!");
    return;
  }

  res.send(lastTweets);
});

app.get("/tweets/:USERNAME", (req, res) => {
  const username = req.params.USERNAME;
  const userTweets = tweets.filter((tweet) => tweet.username === username);

  if (userTweets.length === 0) {
    res.status(404).send("Não há tweets publicados");
    return;
  }

  res.send(userTweets);
});

app.listen(5000);
