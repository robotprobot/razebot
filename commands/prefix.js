const config = require("../config.json");

exports.run = (client, message, args) => {
  //if (!message.)
  let newPrefix = message.content.split(" ").slice(1,2)[0]; // Cut off random characters
  config.prefix = newPrefix; // Put new prefix into config.json

  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error); // Save config.json
  console.log("Prefix was changed. New prefix is: " + newPrefix); // Say in console that prefix changed
  console.log("A reboot may be necessary to complete the prefix change.");
} // Go back to main.js
