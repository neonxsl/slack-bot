require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/clanker-ping", async ({ ack, respond }) => {
  try {
    await ack();
    const start = Date.now();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
  } catch (error) {
    console.error(error);
  }
});

app.command("/clanker-joke", async ({ ack, respond }) => {
  try {
    await ack();
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "I told my computer I needed a break, and it said no problem, it froze immediately.",
      "Why do Java developers wear glasses? Because they don't C#.",
      "There are 10 types of people in the world: those who understand binary and those who don't.",
      "A SQL query walks into a bar, walks up to two tables and asks: Can I join you?"
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await respond({ text: joke });
  } catch (error) {
    console.error(error);
  }
});

app.command("/clanker-roll", async ({ ack, respond, command }) => {
  try {
    await ack();
    const sides = parseInt(command.text) || 6;
    const roll = Math.floor(Math.random() * sides) + 1;
    await respond({ text: `You rolled a d${sides}: ${roll}` });
  } catch (error) {
    console.error(error);
  }
});

app.command("/clanker-8ball", async ({ ack, respond, command }) => {
  try {
    await ack();
    const answers = [
      "It is certain.",
      "Without a doubt.",
      "Yes, definitely.",
      "You may rely on it.",
      "Ask again later.",
      "Cannot predict now.",
      "Don't count on it.",
      "My sources say no.",
      "Very doubtful."
    ];
    const answer = answers[Math.floor(Math.random() * answers.length)];
    const question = command.text || "...no question asked";
    await respond({ text: `Question: ${question}\nAnswer: ${answer}` });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();