// This needs to send a message containing the ping when requested.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Allow filesystem read and write

exports.run = (client, message, args) => {
    message.channel.send({embed: { // Prepare a embed
      color: 3447003,
      author: {
        name: config.botName,
        icon_url: client.user.avatarURL
      },
      title: "Bot response time (ping)",
      fields: [{
        name: "Results",
        value: "Response time: " + (new Date().getTime() - message.createdTimestamp + " ms")
      } // Prepare message and collect response time
    ],
      timestamp: new Date(),
      footer: {
      icon_url: client.user.avatarURL,
      text: config.botName
    } // Finalise and send
    }});
}; // Go back to main.js
