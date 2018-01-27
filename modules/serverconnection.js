module.exports = {
   join: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = new Discord.Client({forceFetchUsers: true}); // Prepare a client for the bot
     const talkedRecently = new Set(); // Set for cooldown username storage
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module

     console.log(`Joined server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
     if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
       fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Joined server joined: ' + guild.name + ' (id: '+ guild.id + '). This guild has ' + guild.memberCount + ' members!');
     };
   }
}
module.exports = {
   leave: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = new Discord.Client({forceFetchUsers: true}); // Prepare a client for the bot
     const talkedRecently = new Set(); // Set for cooldown username storage
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module
     const mainVersion = versioninfo.mainVersion;
     const commandsframeworkVersion = versioninfo.commandsframeworkVersion;
     const loggingframeworkVersion = versioninfo.loggingframeworkVersion;
     const statstrackVersion = versioninfo.statstrackVersion;
     var tournamentJoinRoomUserAmount = 0;
     var currentlyactive = false;
     var appIntegrityTestResult = "PASSED!"; // App integrity is not measured yet, therefore automatically passes each time.
                                             // APP INTEGRITY CHECK IS NOT A PRIORITY AND WILL LIKELY BE A END OF DEVELOPMENT TASK.
     console.log(`Disconnected/removed from: ${guild.name} (id: ${guild.id})`);
     if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
        fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Disconnected/removed from: ' + guild.name + ' (id: '+ guild.id + ').');
     };
   }
}
