// This needs to take the requesters userID, search for it in the stats directory and then pull up results.

const config = require("../config.json"); // Require access to the config.json
const statsFolder = require("../stats"); // Require access to the stats folder
const fs = require("fs"); // Require the ability to read and write with the filesystem

exports.run = (client, message, args) => {
  var userStats = statsFolder + " " + client;
    console.log("Command 'stats' used.") // Log that command was used in console
    message.channel.send({embed: { // Prepare a embed
      color: 3447003,
      author: {
        name: client,
        icon_url: client.user.avatarURL
      },
      title: "Stats for " + client,
      fields: [{
        name: "Points:",
        value: userStats.points,
        name: "Wins:",
        value: userStats.wins,
        name: "Losses:",
        value: userStats.losses,
        name: "Level:",
        value: userStats.level,
      } // Prepare message
    ],
      timestamp: new Date(),
      footer: {
      icon_url: client.user.avatarURL,
      text: config.botName
    } // Finalise and send
    }});
} // Go back to main.js
