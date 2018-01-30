exports.run = (oldMember, newMember) => {
  const Discord = require("discord.js"); // Require Discord.js for app to run
  const client = global.client; // Prepare a client for the bot
  const config = require("../config.json"); // Require the config file for the bot

  const counterStrike = require('../modules/games/counterstrikejoin.js');
  const destinyRaid = require('../modules/games/destinyraidjoin.js');
  const rainbowSix = require('../modules/games/rainbowsixjoin.js');
  const overwatch = require('../modules/games/overwatchjoin.js');

  let newMemberChannel = newMember.voiceChannelID;
  let oldMemberChannel = oldMember.voiceChannelID;

  var counterstrikeWaitingCount = global.counterstrikeWaitingCount;
  var destinyraidWaitingCount = global.destinyraidWaitingCount;
  var rainbowsixWaitingCount = global.rainbowsixWaitingCount;
  var overwatchWaitingCount = global.overwatchWaitingCount;

  var user = client.users.get(newMember.id);

  if (newMemberChannel == config.counterStrikeJoinRoomID) {
    counterstrikeWaitingCount = counterstrikeWaitingCount + 1
    counterstrikeWaitingList.add(user);
    counterStrike.run(newMember);
  }
  if (newMemberChannel == config.destinyRaidJoinRoomID) {
    destinyraidWaitingCount = destinyraidWaitingCount + 1
    destinyraidWaitingList.add(user);
    destinyRaid.run(newMember);
  }
  if (newMemberChannel == config.rainbowSixSiegeJoinRoomID) {
    rainbowsixWaitingCount = rainbowsixWaitingCount + 1
    rainbowsixWaitingList.add(user);
    rainbowSix.run(newMember);
  }
  if (newMemberChannel == config.overwatchJoinRoomID) {
    overwatchWaitingCount = overwatchWaitingCount + 1
    overwatchWaitingList.add(user);
    overwatch.run(newMember);
  }

  if (oldMemberChannel == config.counterStrikeJoinRoomID) {
    counterstrikeWaitingCount = counterstrikeWaitingCount - 1
  }
  if (oldMemberChannel == config.destinyRaidJoinRoomID) {
    destinyraidWaitingCount = destinyraidWaitingCount - 1
  }
  if (oldMemberChannel == config.rainbowSixSiegeJoinRoomID) {
    rainbowsixWaitingCount = rainbowsixWaitingCount - 1
  }
  if (oldMemberChannel == config.overwatchJoinRoomID) {
    overwatchWaitingCount = overwatchWaitingCount - 1
  }
};
