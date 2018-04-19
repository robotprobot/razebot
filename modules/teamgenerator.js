module.exports.generate = (amountofteam1, amountofteam2, gametype) => {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot

     var maxPlayersPerTeam;
     if gametype == "CS" {
       maxPlayersPerTeam = 5;
     }
     // other games here

     function generateTeam() {
       var result = Math.floor(Math.random() * 2) + 1;
       if (result == 1) && (amountofteam1 < maxPlayersPerTeam) {
         amountofteam1 = amountofteam1 + 1
         return result;
       }
       else if (result == 1) && (amountofteam1 == maxPlayersPerTeam) {
         generateTeam();
       }
       else if (result == 2) && (amountofteam2 < maxPlayersPerTeam) {
         amountofteam2 = amountofteam2 + 1
         return result;
       }
       else if (result == 2) && (amountofteam2 == maxPlayersPerTeam) {
         generateTeam();
       }

    generateTeam();
}
