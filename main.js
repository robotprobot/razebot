<<<<<<< HEAD
// BOT FRAMEWORK FOR A DISCORD SERVER - CODENAME RAZEBOT
// USING DISCORD.JS LIBRARIES
// CREATED 24/09/2017
// MADE BY STEVEN WHEELER (robotprobot#8211)
=======
// BOT FRAMEWORK FOR A DISCORD SERVER
// USING DISCORD.JS LIBRARIES
// CREATED 24/09/2017
// MADE BY STEVEN WHEELER
>>>>>>> 866a7eaaed30a9ebb05f4cd59c00a4a04e52c45a

// main.js is the main file for the bot
// included should be a commands folder, and a config.json.

<<<<<<< HEAD
// Bot is partially modifiable and can be changed via config.json.
// (Do not change the token in config.json. This will break the connection to Discord!)

=======
>>>>>>> 866a7eaaed30a9ebb05f4cd59c00a4a04e52c45a
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.on("ready", () => {
  console.log(""); // "Dont let them back in, im teaching them a lesson about spacing"
  console.log(config.botName + " online and ready!");
  console.log("V1.0.0");
  console.log("Developed by robotprobot (Steven Wheeler)");
  console.log("DISCORD: robotprobot#8211");
  console.log("TWITTER: @robot_probot");
  console.log(""); // Spacing
  console.log("Listening for commands with the " + config.prefix + " prefix!");
  console.log(""); // Spacing
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./commands/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
    console.log("Unrecognised command entered with a prefix.");
    console.log("Command was: " + command);
    message.channel.send("Command not recognised");
    console.log("Informed user command is unrecognised.")
  }
});

client.login(config.token);
