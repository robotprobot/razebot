exports.run = (newMember) => {
  const Discord = require("discord.js"); // Require Discord.js for app to run
  const client = global.client; // Prepare a client for the bot
  const config = require("../config.json"); // Require the config file for the bot
  const sql = require("sqlite"); // SQL Database, requires the sqlite module
  const teamgenerator = require("../modules/teamgenerator.js");

  if (global.counterstrikeWaitingCount = 10) {
    var amountofteam1;
    var amountofteam2;
    var gametype = "CS";

    var player1teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player2teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player3teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player4teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player5teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player6teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player7teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player8teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player9teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype); // choose team 1 or 2
    var player10teamrandom = teamgenerator.generate(amountofteam1, amountofteam2, gametype);  // choose team 1 or 2

    //write to database
    sql.run(`INSERT INTO gameResults(gameType, player1Id, player2Id, player2Team, player3Id, player3Team, player4Id, player4Team, player5Id, player5Team, player6Id, player6Team, player7Id, player7Team, player8Id, player8Team, player9Id, player9Team, player10Id, player10Team) VALUES(`global.counterstrikeWaitingList[0]`,`player1teamrandom`,`global.counterstrikeWaitingList[1]`,`player2teamrandom`,`global.counterstrikeWaitingList[2]`,`player3teamrandom`,`global.counterstrikeWaitingList[3]`,`player4teamrandom`,`global.counterstrikeWaitingList[4]`,`player5teamrandom`,`global.counterstrikeWaitingList[5]`,`player6teamrandom`,`global.counterstrikeWaitingList[6]`,`player7teamrandom`,`global.counterstrikeWaitingList[7]`,`player8teamrandom`,`global.counterstrikeWaitingList[8]`,`player9teamrandom`,`global.counterstrikeWaitingList[9]`,`player10teamrandom`)`);
    //put the id into a variable for updating later? or we just gonna search the database?

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
