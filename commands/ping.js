const config = require("../config.json");

exports.run = (client, message, args) => {
    //message.channel.send("Pong! Response time: " + (new Date().getTime() - message.createdTimestamp + " ms")).catch(console.error);
    console.log("Command 'ping' used.") // Log that command was used in console
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
} // Go back to main.js
