// This will be a command that can only be run by the ownerID. It would force level up the user (for testing purposes)

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs");

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID
  const userFile = require(`../stats/${userID}.json`); // Find the file that matches the userID
  if (userID == config.ownerID) {
    // level up
    userFile.points = 25; // Add 25 points
    userFile.level = 1; // Increase level by 1 (which is 25 points)
    fs.writeFileSync(`../stats/${userID}.json`); // , JSON.stringify(config), (err) => console.error); // save file
    message.channel.send("Force levelup complete. New level is: " + userFile.level);
  } else {
    // deny level up
    message.channel.send("Insufficient permissions");
    console.log("Someone attempted to force level up with insufficient permissions. Denied.");
  };
}; // Go back to main.js
