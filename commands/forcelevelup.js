// This will be a command that can only be run by the ownerID. It would force level up the user (for testing purposes)

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs");

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID
  const userFile = require(`../stats/${userID}.json`); // Find the file that matches the userID
  if (userID == config.ownerID) {
    // level up
    userFile.points = +25; // Add 25 points
    userFile.level = +1; // Increase level by 1 (which is 25 points)
    fs.writeFileSync(`${userFile}`, JSON.stringify(content), function (err) {
      if (err) {
        console.log("An error occured when force levelling up. Likely could not change file.");
        message.channel.send("An error has occured. See console for details.");
        return;
      }
      console.log("Force level up was used and completed successfully.")
      message.channel.send("Force level up complete. New level is: " + userFile.level);
    });
  } else {
    // deny level up
    message.channel.send("Insufficient permissions");
    console.log("Someone attempted to force level up with insufficient permissions. Denied.");
  };
}; // Go back to main.js
