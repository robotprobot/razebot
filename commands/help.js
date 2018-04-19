// This needs to output a list of available commands to the user.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const commandsFolder = ("./commands/"); // Tells where the commands folder is to read for this list
const fs = require("fs"); // Allow filesystem read and write

exports.run = (client, message, args) => {
  var readfiles = []; // prepare an array
  fs.readdirSync(commandsFolder).forEach(file => { // read the commands folder
    readfiles.push(file); // put each file name in folder into the array
  });
  finalresult1 = readfiles.toString(); // take the array and turn it into a string
  finalresult2 = finalresult1.replace(/\/r/, '/'); // remove symbols
  finalresult3 = finalresult2.replace(/,/g,'    '); // replace commas with a space
  finalresult4 = finalresult3.replace(/.js/g, ''); // remove extensions
  //console.log(finalresult4);
  message.channel.send({embed: { // Prepare a embed
    color: 3447003,
    author: {
      name: config.botName,
      icon_url: client.user.avatarURL
    },
    title: "",
    fields: [{
      name: "Commands list",
      value: finalresult4
    } // Prepare message and collect response time
  ],
    timestamp: new Date(),
    footer: {
    icon_url: client.user.avatarURL,
    text: config.botName
  } // Finalise and send
  }});
}; // Go back to main.js
