/*
  BOT FRAMEWORK FOR A DISCORD SERVER - CODENAME RAZEBOT
   USING DISCORD.JS LIBRARIES AND THE OFFICIAL DISCORD API
   CREATED 24/09/2017
   MADE BY STEVEN WHEELER (Discord: robotprobot#8211)

   main.js is the main file for the bot
   included should be a commands folder, a soundfiles folder, and a config.json.
   Other miscellanious files may also be required. The bot will alert when a file is required.
   All necessary files are available on the github for this project.

   Bot is partially modifiable and can be changed via config.json.
   (This will need to be setup before first use!)
*/

// <<<--- Variables start past this line! --->>>

const Discord = require("discord.js"); // Require Discord.js for app to run
const client = new Discord.Client({forceFetchUsers: true}); // Prepare a client for the bot
const talkedRecently = new Set(); // Set for cooldown username storage
const fs = require("fs"); // Prepare file reading
const config = require("./config.json"); // Require the config file for the bot
const sql = require("sqlite"); // SQL Database, requires the sqlite module
const mainVersion = "1.0.3";
const commandsframeworkVersion = "1.0.1";
const loggingframeworkVersion = "1.0.2";
const statstrackVersion = "1.0.3";
var tournamentJoinRoomUserAmount = 0;
var currentlyactive = false;
var appIntegrityTestResult = "PASSED!"; // App integrity is not measured yet, therefore automatically passes each time.

// <<<--- Variables end here! --->>>


// <<<--- Bootup code starts past this line! --->>>

console.log("[SYSTEM INITIALIZE] Booting initialized...");
console.log("[SYSTEM CONNECTING] Attempting connection to Discord...");
client.login(config.loginToken); // Connect to the Discord service and provide bots identity to server

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

client.on("ready", () => { // Once bot has connected and initialised, do this part
  console.log("[DISCORD CONNECTED] Connection successful.");
  console.log(`[DISCORD RESPONDED] Logged in as ${client.user.tag}!`);
  console.log(""); // "Dont let them back in, im teaching them a lesson about spacing"
  console.log(config.botName + " online and ready!");
  console.log(""); // Spacing
  console.log("ACTIVE MODULES:");
  console.log(' "RAZEBOT Discord Bot Framework" - V' + mainVersion);
  console.log(' "COMMANDIT Modular Commands System" - V' + commandsframeworkVersion);
  console.log(' "LOGIT Access Violation And Command Logging System" - V' + loggingframeworkVersion);
  console.log(' "STATSTRACK Statistics Tracking Backend" - V' + statstrackVersion);
  console.log(""); // Spacing
  console.log("Application integrity check: " + appIntegrityTestResult);
  console.log(""); // Spacing
  console.log("RAZEBOT and all other modules are developed by robotprobot (Steven Wheeler)");
  console.log(" DISCORD: robotprobot#8211");
  console.log(" TWITTER: @robot_probot");
  console.log(" GITHUB: https://github.com/robotprobot/razebot");
  console.log(""); // Spacing
  console.log("Listening for commands with the " + config.prefix + " prefix!");
  console.log(""); // Spacing
  client.user.setGame('on ' + mainVersion + '. "' + config.prefix + ' help"');

  if (config.loggingEnabled !== "TRUE") { // Alert about logging disabled
    console.log("Logging is disabled in config.json! No logging will occur.");
  };

  /* CHECK IF DIRECTORIES EXIST ON BOOT */
  // SOUNDFILES DIRECTORY
  if (!fs.existsSync('./soundfiles/')) {
    console.log("Soundfiles folder was not found, install is likely corrupt, please reinstall.");
    process.exit(-1);
  };
  // COMMANDS DIRECTORY
  if (!fs.existsSync('./commands/')) {
    console.log("Commands folder was not found, install is likely corrupt, please reinstall.");
    process.exit(-1);
  };
  // ASSETS DIRECTORY
  if (!fs.existsSync('./assets/')) {
    console.log("Assets folder was not found, install is likely corrupt, please reinstall.");
    process.exit(-1);
  };
  // MAIN DATABASE
  if (!fs.existsSync('./database.sqlite')) {
    console.log("Main database was not found, generating...");
    sql.open("./database.sqlite"); // Create the database
    setTimeout(function() {
      sql.run("CREATE TABLE IF NOT EXISTS stats (userId TEXT, points INTEGER, wins INTEGER, losses INTEGER, level INTEGER)"); // Create table
      sql.run("CREATE TABLE IF NOT EXISTS gameResults (gameId TEXT, gameType TEXT, winningTeam INTEGER, player1Id TEXT, player1Team INTEGER, player2Id TEXT, player2Team INTEGER, player3Id TEXT, player3Team INTEGER, player4Id TEXT, player4Team INTEGER, player5Id TEXT, player5Team INTEGER)"); // Create table
    }, 500);
  }
  else {
    sql.open("./database.sqlite"); // Open the stats database
  };
  // LOGS FILE
  if (!fs.existsSync('./log.txt') && config.loggingEnabled == "TRUE") {
    console.log("Log file was not found, generating...");
    var stream = fs.createWriteStream('./log.txt');
    stream.once('open', function(fd) { // Open the file to write to it
      stream.write('Log generated on ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -- You can modify what actions are logged, or turn off logging completely in config.json");
      stream.end(); // Close the file and save
  }
);
};

setTimeout(function() { // Bot boot logger
  if (config.loggingEnabled == "TRUE" && config.loggingStartup == "TRUE") {
  fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [STARTUP] - " + "Bot booted successfully.");
    }
  }, 500);
});

// <<<--- Bootup code ends here! --->>>


// <<<--- Server connect/disconnect code starts past this line! --->>>

client.on("guildCreate", guild => { // Notes in console when bot has joined a server
  console.log(`Joined server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
    fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Joined server joined: ' + guild.name + ' (id: '+ guild.id + '). This guild has ' + guild.memberCount + ' members!');
  };
});

client.on("guildDelete", guild => { // Notes in console when bot has left or been removed from a server
  console.log(`Disconnected/removed from: ${guild.name} (id: ${guild.id})`);
  if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
    fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Disconnected/removed from: ' + guild.name + ' (id: '+ guild.id + ').');
  };
});

// <<<--- Server connect/disconnect code ends here! --->>>


// <<<--- Command system code starts past this line! --->>>

client.on("message", message => { // Read messages and run the correct command if possible
  if (!message.guild) return; // If message is not in server (like a dm), reject
  if (message.author.bot) return; // If the message the bot wants to respond to is from itself, reject to prevent loops
  if (!message.content.startsWith(config.prefix)) return; // If the message does not contain the prefix, reject
  if (talkedRecently.has(message.author.id)) {
    message.reply("you are currently on cooldown! Please wait 2.5 seconds before sending another command.");
    return;
  };

  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  console.log(message.author.username + " (ID: " + message.author.id + ") is now on cooldown for 2.5 seconds.");
  setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
  talkedRecently.delete(message.author.id);
  }, 2500);

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // If message accepted, remove prefix
  const command = args.shift().toLowerCase(); // Change resulting message to lowercase

  try {
    let commandFile = require(`./commands/${command}.js`); // Search for a corrosponding command
    commandFile.run(client, message, args); // If command exists, run it
    console.log('Command "' + command + '" was found successfully and used by ' + message.author.username + '. (ID: ' + message.author.id + ')');
    if (config.loggingEnabled == "TRUE" && config.loggingCommand == "TRUE") {
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [COMMAND] - " + 'Command "' + command + '" was found successfully and used by ' + message.author.username + '. (ID: ' + message.author.id + ')');
    };
    return;
  } catch (err) { // Else tell user that command was not found
    if (config.consoleDebuggingEnabled == "TRUE") {
      console.error(err); // IF THERE IS A FAILURE, THIS WILL DUMP IT TO CONSOLE!
    };
    console.log('Command "' + command + '" was not found, requested by ' + message.author.username + '. (ID: ' + message.author.id + ')');
    message.channel.send("Command not recognised");
    if (config.loggingEnabled == "TRUE" && config.loggingCommand == "TRUE") {
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [COMMAND] - " + 'Command "' + command + '" was not found, requested by ' + message.author.username + '. (ID: ' + message.author.id + ')');
    };
    return;
  }
});

// <<<--- Command system code ends here! --->>>


// <<<--- New client database populator code starts past this line! --->>>

client.on("guildMemberAdd", member => { // Preparing the STATSTRACK file for a joining member if new
    sql.get(`SELECT * FROM stats WHERE userId = "${member.id}"`).then(row => {
      if (!row) {
        console.log("New client detected. Adding entry to database...");
        sql.run("INSERT INTO stats (userId, points, wins, losses, level) VALUES (?, ?, ?, ?, ?)", [member.id, 0, 0, 0, 0]);
      }
    }).catch(() => {
  });
});

// <<<--- New client database populator code ends here! --->>>


// <<<--- Tournament system code starts past this line! --->>>

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannelID;
  let oldUserChannel = oldMember.voiceChannelID;
  const voiceChannel = config.tournamentJoinRoomID;
  var firstJoin;

  //if(newUserChannel == config.tournamentJoinRoomID) {
  //  if (newMember.bot) return;
  //  tournamentJoinRoomUserAmount = tournamentJoinRoomUserAmount + 1;
  //    if (tournamentJoinRoomUserAmount == 1 || tournamentJoinRoomUserAmount == 2) {
  //      if (currentlyactive == false) {
  //      console.log(tournamentJoinRoomUserAmount);
  //        currentlyactive = true;
  //        firstJoin = newMember.username;
  //        newMember.voiceChannel.join()
  //          .then(connection => {
  //            firstvoicefile = connection.playFile('./soundfiles/aplayerjoined.mp3');
  //            firstvoicefile.once("end", () => {
  //              secondvoicefile = connection.playFile('./soundfiles/preparingtournament.mp3');
  //              secondvoicefile.once("end", () => {
  //                thirdvoicefile = connection.playFile('./soundfiles/selecttournament.mp3');
  //                thirdvoicefile.once("end", () => {
  //                 currentlyactive = false;
  //                });
  //              });
  //            });
  //          });
  //        };
  //      }
  //    else if (tournamentJoinRoomUserAmount == 3 && currentlyactive == false) {
  //      console.log(tournamentJoinRoomUserAmount);
  //      currentlyactive = true;
  //      newMember.voiceChannel.join()
  //      .then(connection => {
  //        firstvoicefile = connection.playFile('./soundfiles/aplayerjoined.mp3');
  //        firstvoicefile.once("end", () => {
  //          secondvoicefile = connection.playFile('./soundfiles/waitingforplayers/waiting3.mp3');
  //          secondvoicefile.once("end", () => {
  //            currentlyactive = false;
  //          });
  //        });
  //      });
  //    }
  //    else if (tournamentJoinRoomUserAmount == 4 && currentlyactive == false) {
  //     console.log(tournamentJoinRoomUserAmount);
  //      currentlyactive = true;
  //      newMember.voiceChannel.join()
  //      .then(connection => {
  //        firstvoicefile = connection.playFile('./soundfiles/aplayerjoined.mp3');
  //        firstvoicefile.once("end", () => {
  //          secondvoicefile = connection.playFile('./soundfiles/waitingforplayers/waiting2.mp3');
  //          secondvoicefile.once("end", () => {
  //            currentlyactive = false;
  //          });
  //        });
  //      });
  //    }
  //    else if (tournamentJoinRoomUserAmount == 5 && currentlyactive == false) {
  //      console.log(tournamentJoinRoomUserAmount);
  //      currentlyactive = true;
  //      newMember.voiceChannel.join()
  //      .then(connection => {
  //        firstvoicefile = connection.playFile('./soundfiles/aplayerjoined.mp3');
  //        firstvoicefile.once("end", () => {
  //          secondvoicefile = connection.playFile('./soundfiles/waitingforplayers/waiting1.mp3');
  //          secondvoicefile.once("end", () => {
  //            currentlyactive = false;
  //          });
  //        });
  //      });
  //    }
  //    else if (tournamentJoinRoomUserAmount >= 6) {
  //      console.log(tournamentJoinRoomUserAmount);
  //        //play 5
  //    }
  //else if (oldUserChannel == config.tournamentJoinRoomID) {
  // tournamentJoinRoomUserAmount = tournamentJoinRoomUserAmount - 1;
  // console.log(tournamentJoinRoomUserAmount);
  //}}
});
