exports.run = (newMember) => {
  const Discord = require("discord.js"); // Require Discord.js for app to run
  const client = global.client; // Prepare a client for the bot
  const config = require("../config.json"); // Require the config file for the bot
  const sql = require("sqlite"); // SQL Database, requires the sqlite module


  if (global.counterstrikeWaitingCount = 10) {
    //write players to Database
    sql.run(`INSERT INTO gameResults (gameType, player1Id, player2Id, player3Id, player4Id, player5Id, player6Id, player7Id, player8Id, player9Id, player10Id) VALUES (COUNTERSTRIKE,`global.counterstrikeWaitingList[0]`,`global.counterstrikeWaitingList[1]`,`global.counterstrikeWaitingList[2]`,`global.counterstrikeWaitingList[3]`,`global.counterstrikeWaitingList[4]`,`global.counterstrikeWaitingList[5]`,`global.counterstrikeWaitingList[6]`,`global.counterstrikeWaitingList[7]`,`global.counterstrikeWaitingList[8]`,`global.counterstrikeWaitingList[9]`)`);

    //choose teams
    //create channels
    //move users
    //start game
    //game
    //delete channels
    //get results
    //write results
    //levelling
  }
};
