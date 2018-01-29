exports.run = (oldMember, newMember) => {
  const Discord = require("discord.js"); // Require Discord.js for app to run
  const client = global.client; // Prepare a client for the bot
  const talkedRecently = global.talkedRecently; // Set for cooldown username storage
  const fs = require("fs"); // Prepare file reading
  const config = require("../config.json"); // Require the config file for the bot
  const sql = require("sqlite"); // SQL Database, requires the sqlite module
  const voiceCount = global.voiceCount;

  const firstjoin = require('./modules/voice/voicefirstjoin.js');
  const otherjoins = require('./modules/voice/voiceotherjoins.js');
  const gameprep = require('./modules/game/gameprep.js');
  const gamesys = require('./modules/game/gamesys.js');
  const gameafter = require('./modules/game/gameafter.js');
  const lockchannel = require('./modules/channellock/channellocker.js');
  const unlockchannel = require('./modules/channellock/channelunlocker.js');
  const donate = require('./modules/donate.js');

  if (newMember == config.tournamentJoinRoomID) {
    voiceCount = voiceCount + 1;


  }

  else if (oldMember == config.tournamentJoinRoomID) {
    voiceCount = voiceCount - 1;
    if (voiceCount == 0) {
      return;
    }
  }
};
