module.exports = {
   join: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module
     const logging = require('../modules/logging.js');

     console.log(`Joined server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
     logging.serverConnectionJoin();
   }
}
module.exports = {
   leave: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module

     console.log(`Disconnected/removed from: ${guild.name} (id: ${guild.id})`);
     logging.serverConnectionLeave();
   }
}
