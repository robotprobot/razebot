// BOT FRAMEWORK FOR A DISCORD SERVER - CODENAME RAZEBOT
// USING DISCORD.JS LIBRARIES AND THE OFFICIAL DISCORD API
// CREATED 24/09/2017
// MADE BY STEVEN WHEELER (robotprobot#8211)

// main.js is the main file for the bot
// included should be a commands folder, and a config.json.

// Bot is partially modifiable and can be changed via config.json.
// (Do not change the token in config.json. This will break the connection to Discord!)

// <<<--- Code starts past this line! --->>>

const Discord = require("discord.js"); // Require Discord.js for app to run
const client = new Discord.Client(); // Prepare a client for the bot
const config = require("./config.json"); // Require the config file for the bot
const fs = require("fs"); // Prepare file reading
//const registeredUsers = require("./stats/registeredusers.json"); // Load a list of registered players

client.login(config.token); // Connect to the Discord service and provide bots identity to server

client.on("ready", () => {
  //let userPoints = JSON.parse(fs.readFileSync("./stats/registeredusers.json", "utf8"));
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

//client.on("guildMemberAdd", (member) => {
//  var playerData = `./stats/${member}.json`
//  if (!playerData.exists()) {
//    fs.writeFileSync(playerData, function(err) {
//    if(err) {
        //return console.log(err);
//    }
//    console.log("The file was saved!");
//});

fs.readdir("./commands/", (err, files) => { // Read the commands folder and prepare commands for use
  if (err) return console.error(err); // If reading fails, write to console and abort
  files.forEach(file => { // Prepare each file
    let eventFunction = require(`./commands/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (!message.guild) return; // If message is not in server (like a dm), reject
  if (message.author.bot) return; // If the message the bot wants to respond to is from the bot, reject to prevent loops
  if(message.content.indexOf(config.prefix) !== 0) return; // If the message does not contain the prefix, reject

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // If message accepted, remove prefix
  const command = args.shift().toLowerCase(); // Change resulting message to lowercase

  try {
    let commandFile = require(`./commands/${command}.js`); // Search for a corrosponding command
    commandFile.run(client, message, args); // If command exits, run it
  } catch (err) { // Else tell user that command was not found
    console.error(err);
    console.log("Unrecognised command entered with a prefix.");
    console.log("Command was: " + command);
    message.channel.send("Command not recognised");
    console.log("Informed user command is unrecognised.")
  }
});
