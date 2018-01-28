/*
  BOT FRAMEWORK FOR A DISCORD SERVER - CODENAME RAZEBOT
   USING DISCORD.JS LIBRARIES AND THE OFFICIAL DISCORD API
   CREATED 24/09/2017
   MADE BY STEVEN WHEELER (Discord: robotprobot#8211)

   Main.js is the main file for the bot.
   Included should be a modules folder, a commands folder, a soundfiles folder, a assets folder, and a config.json.
   Other miscellanious files may also be required. The bot will alert when a file is required.
   All necessary files are available on the github for this project.

   Bot is partially modifiable and can be changed via config.json.
   (This will need to be setup before first use!)
*/

// <<<--- Variables start past this line! --->>>

const Discord = require("discord.js"); // Require Discord.js for app to run
global.client = new Discord.Client({forceFetchUsers: true}); // Prepare a client for the bot
global.talkedRecently = new Set(); // Set for cooldown username storage
const fs = require("fs"); // Prepare file reading
const config = require("./config.json"); // Require the config file for the bot
const versioninfo = require("./versioninfo.json"); // Require the versioninfo file for the bot
const sql = require("sqlite"); // SQL Database, requires the sqlite module

// <<<--- Variables end here! --->>>


// <<<--- Module requiring starts here! --->>>

const bootup = require('./modules/bootup.js');
const serverconnection = require('./modules/serverconnection.js');
const commandhandler = require('./modules/commandhandler.js');
const clientjoin = require('./modules/clientjoined.js');
const voicesystem = require('./modules/voicesystem.js');

// <<<--- Module requiring ends here! --->>>

// <<<--- Module activation starts here! --->>>

bootup.boot();

client.on("message", (message) => {
  commandhandler.run(message);
});

client.on("guildCreate", guild => {
  serverconnection.join();
});

client.on("guildDelete", guild => {
  serverconnection.leave();
});

client.on("guildMemberAdd", (member) => {
  clientjoin.run(member);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  voicesystem.main(); // empty / unfinished
});

// <<<--- Module activation ends here! --->>>
