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
    global.counterstrikeWaitingList.push(user);
    counterStrike.run(newMember);
  }
  if (newMemberChannel == config.destinyRaidJoinRoomID) {
    destinyraidWaitingCount = destinyraidWaitingCount + 1
    global.destinyraidWaitingList.push(user);
    destinyRaid.run(newMember);
  }
  if (newMemberChannel == config.rainbowSixSiegeJoinRoomID) {
    rainbowsixWaitingCount = rainbowsixWaitingCount + 1
    global.rainbowsixWaitingList.push(user);
    rainbowSix.run(newMember);
  }
  if (newMemberChannel == config.overwatchJoinRoomID) {
    overwatchWaitingCount = overwatchWaitingCount + 1
    global.overwatchWaitingList.push(user);
    overwatch.run(newMember);
  }

  if (oldMemberChannel == config.counterStrikeJoinRoomID) {
    counterstrikeWaitingCount = counterstrikeWaitingCount - 1
    global.counterstrikeWaitingList.splice(global.counterstrikeWaitingList.indexOf(user), 1);
  }
  if (oldMemberChannel == config.destinyRaidJoinRoomID) {
    destinyraidWaitingCount = destinyraidWaitingCount - 1
    global.destinyraidWaitingList.splice(global.destinyraidWaitingList.indexOf(user), 1);
  }
  if (oldMemberChannel == config.rainbowSixSiegeJoinRoomID) {
    rainbowsixWaitingCount = rainbowsixWaitingCount - 1
    global.rainbowsixWaitingList.splice(global.rainbowsixWaitingList.indexOf(user), 1);
  }
  if (oldMemberChannel == config.overwatchJoinRoomID) {
    overwatchWaitingCount = overwatchWaitingCount - 1
    global.overwatchWaitingList.splice(global.overwatchWaitingList.indexOf(user), 1);
  }
};
