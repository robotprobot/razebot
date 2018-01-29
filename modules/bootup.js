module.exports = {
   boot: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const versioninfo = require("../versioninfo.json"); // Require the versioninfo file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module
     const mainVersion = versioninfo.mainVersion;
     const commandsframeworkVersion = versioninfo.commandsframeworkVersion;
     const loggingframeworkVersion = versioninfo.loggingframeworkVersion;
     const statstrackVersion = versioninfo.statstrackVersion;

     if (config.loginToken == "") {
       throw 'Config.json is not properly setup. Please set this up before attempting to launch the bot.';
     }

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
       console.log("RAZEBOT and all other modules are developed by robotprobot (Steven Wheeler)");
       console.log(" DISCORD: robotprobot#8211");
       console.log(" TWITTER: @robot_probot");
       console.log(" GITHUB: https://github.com/robotprobot/razebot");
       console.log(" RAZEBOT WEBSITE: https://robotprobot.github.io/razebot/")
       if (config.logDownloadingAllowed == "TRUE") {
         console.log(""); // Spacing
         console.log("ALERT: Remote Log Downloading is enabled!");
         console.log("It is your responsibility to ensure that the Administration Text Room on Discord (defined in config.json)");
         console.log("is secure and only allowed people can access.");
         console.log("To disable Remote Log Downloading, set LogDownloadingAllowed to false in config.json.");
       }
       console.log(""); // Spacing
       console.log("Listening for commands with the " + config.prefix + " prefix!");
       console.log(""); // Spacing
       client.user.setActivity('on ' + mainVersion + '. "' + config.prefix + ' help"');

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
         sql.open("../database.sqlite"); // Create the database
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
       });
     };

     setTimeout(function() { // Bot boot logger
       if (config.loggingEnabled == "TRUE" && config.loggingStartup == "TRUE") {
         fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [STARTUP] - " + "Bot booted successfully.");
       }
     }, 500);
   })
 }
}
