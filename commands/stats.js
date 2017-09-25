// This needs to take the requesters userID, search for it in the stats directory and then pull up results.

const config = require("../config.json"); // Require access to the config.json
const statsFolder = require("." + config.statsDirectory); // Require access to the stats folder
const fs = require("fs"); // Require the ability to read and write with the filesystem
