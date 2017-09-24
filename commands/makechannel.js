const config = require("../config.json");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  function makeChannel(message){
        var server = message.guild;
        var name = message.author.username;

        server.createChannel(name, "text");
  }
}
