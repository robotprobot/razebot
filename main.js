/* BOT FRAMEWORK FOR A DISCORD SERVER - CODENAME RAZEBOT
   USING DISCORD.JS LIBRARIES AND THE OFFICIAL DISCORD API
   CREATED 24/09/2017
   MADE BY STEVEN WHEELER (robotprobot#8211)

   main.js is the main file for the bot
   included should be a commands folder, a soundfiles folder, and a config.json.

   Bot is partially modifiable and can be changed via config.json.
   (Do not change the token in config.json. This will break the connection to Discord!)
*/

// <<<--- Variables start past this line! --->>>

const Discord = require("discord.js"); // Require Discord.js for app to run
const client = new Discord.Client(); // Prepare a client for the bot
const fs = require("fs"); // Prepare file reading
const config = require("./config.json"); // Require the config file for the bot
const sql = require("sqlite"); // SQL Database, requires the sqlite module
const mainVersion = "1.0.0";
const statstrackVersion = "1.1.0";


// <<<--- Code starts past this line! --->>>

client.login(config.loginToken); // Connect to the Discord service and provide bots identity to server

/* THIS SEGMENT CAPTURES ERRORS AND CREATES A DUMP FILE.
   THIS WILL HOPEFULLY PREVENT FULL ON CRASHES AND THE BOT MAY BE ABLE TO RECOVER.
*/
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));
/* END OF ERROR AND DUMPING SEGMENT.
   BE CAREFUL IF HANDING OUT DEBUG LOGS BECAUSE THEY WILL CONTAIN THE BOTS LOGIN TOKEN.
*/

client.on("ready", () => { // Once bot has connected and initialised, do this part
  console.log(""); // "Dont let them back in, im teaching them a lesson about spacing"
  console.log(""); // Spacing
  console.log(config.botName + " online and ready!");
  console.log(""); // Spacing
  console.log('"RAZEBOT Discord Bot Framework" - V' + mainVersion);
  console.log('"STATSTRACK Statistics Tracking System" - V' + statstrackVersion);
  console.log(""); // Spacing
  console.log("RAZEBOT and STATSTRACK is developed by robotprobot (Steven Wheeler)");
  console.log("DISCORD: robotprobot#8211");
  console.log("TWITTER: @robot_probot");
  console.log("GITHUB: https://github.com/robotprobot/razebot");
  console.log(""); // Spacing
  console.log("Listening for commands with the " + config.prefix + " prefix!");
  console.log(""); // Spacing
  client.user.setGame('on ' + mainVersion + '. Ready!');

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
  // STATS DATABASE
  if (!fs.existsSync('./stats.sqlite')) {
    console.log("Stats database was not found, generating...");
    sql.open("./stats.sqlite"); // Create the database
    setTimeout(function() {
      sql.run("CREATE TABLE IF NOT EXISTS stats (userId TEXT, points INTEGER, wins INTEGER, losses INTEGER, level INTEGER)"); // Create table
    }, 500);
  }
  else {
    sql.open("./stats.sqlite"); // Open the database
  };
  // LOGS FILE
  if (!fs.existsSync('./log.txt') && config.loggingEnabled == "TRUE") {
    console.log("Log file was not found, generating...");
    var stream = fs.createWriteStream('./log.txt');
    stream.once('open', function(fd) { // Open the file to write to it
      stream.write('Log generated on ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -- You can modify what actions are logged, or turn off logging completely in config.json");
      stream.end(); // Close the file and save
 });

  fs.readdir("../commands", (err, files) => { // Read the commands folder and prepare commands for use
  if (err) return console.error(err); // If reading fails, write to console and abort
    files.forEach(file => { // Prepare each file
      let eventFunction = require(`./commands/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });
};

setTimeout(function() { // Bot boot logger
  if (config.loggingEnabled == "TRUE" && config.loggingStartup == "TRUE") {
  fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [STARTUP] - " + "Bot booted successfully.");
    }
  }, 500);
});

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

client.on("guildMemberAdd", member => { // Preparing the STATSTRACK file for a joining member if new
    sql.get(`SELECT * FROM stats WHERE userId = "${member.id}"`).then(row => {
      if (!row) {
        console.log("New client detected. Adding entry to database...");
        sql.run("INSERT INTO stats (userId, points, wins, losses, level) VALUES (?, ?, ?, ?, ?)", [member.id, 0, 0, 0, 0]);
      }
    }).catch(() => {
  });
});

client.on("message", message => { // Read messages and run the correct command if possible
  if (!message.guild) return; // If message is not in server (like a dm), reject
  if (message.author.bot) return; // If the message the bot wants to respond to is from itself, reject to prevent loops
  if (!message.content.startsWith(config.prefix)) return; // If the message does not contain the prefix, reject

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
    console.error(err); // IF THERE IS A FAILURE, THIS WILL DUMP IT TO CONSOLE!
    console.log('Command "' + command + '" was not found, requested by ' + message.author.username + '. (ID: ' + message.author.id + ')');
    message.channel.send("Command not recognised");
    if (config.loggingEnabled == "TRUE" && config.loggingCommand == "TRUE") {
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [COMMAND] - " + 'Command "' + command + '" was not found, requested by ' + message.author.username + '. (ID: ' + message.author.id + ')');
    };
    return;
  }
});

client.on("voiceJoin", function(user, voiceChannel) { // When someone joins a voice room
  if (!voiceChannel == config.tournamentJoinRoomID) return; // If voice room is not the designated room, reject
  const mainChannel = client.channels.get(config.tournamentJoinRoomID); // Prepare the designated channels ID
  mainChannel.join() // Join the designated channel
   .then(connection => { // Connection is an instance of VoiceConnection - Begin a instance
    const dispatcher = connection.playFile('./soundfiles/aplayerjoined.mp3'); // Play the mp3
   })
   .catch(console.log); // Catch errors and write to console
});
