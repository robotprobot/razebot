// This needs to take the requesters userID, search for it in the stats directory and then pull up results.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Require the ability to read and write with the filesystem

exports.run = (client, message, args) => {
  var userID = message.author.id;
  let userFile = JSON.parse(fs.readFile(`../stats/${userID}.json`));

  var embed = new Discord.RichEmbed()
    .setTitle("Stats for " + message.author.username)
    .setColor(0x00AE86)
    .setTimestamp()
    .addField("Points", `${userFile.points}`, true)
    .addField("Wins", `${userFile.wins}`, true)
    .addField("Losses", `${userFile.losses}`, true)
    .addField("Level", `${userFile.level}`, true)
    message.channel.send({embed});

  //  console.log("Command 'stats' used.") // Log that command was used in console
  //  message.channel.send({embed: { // Prepare a embed
  //    color: 3447003,
  //    author: {
  //      icon_url: message.author.avatarURL
  //    },
  //    title: "Stats for " + message.author.username,
  //    fields: [{
  //      name: "Points:",
  //      value: `userStats.points`
  //    },
  //    {
  //      name: "Wins:",
  //      value: `userStats.wins`
  //    },
  //    {
  //      name: "Losses:",
  //      value: `userStats.losses`
  //    },
  //    {
  //      name: "Level:",
  //      value: `userStats.level`
  //    }
  //  ],
  //    timestamp: new Date(),
  //    footer: {
  //    icon_url: client.user.avatarURL,
  //    text: config.botName
  //  } // Finalise and send
  //  }});
} // Go back to main.js
