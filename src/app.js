import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
];

const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  const newUser = {
    username,
    avatar,
  };

  users.push(newUser);
  res.send("OK");
});

app.listen(5000);