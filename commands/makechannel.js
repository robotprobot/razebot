// This command is unfinished, and is not commented for that reason.

exports.run = (client, message, args) => {
  function makeChannel(message){
        var server = message.guild;
        var name = message.author.username;

        server.createChannel(name, "text");
  }
}
