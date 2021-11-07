const dotenv = require("dotenv");
const { Client, Intents } = require("discord.js");

const {kickMember, banMember} = require('./commands')

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .substring(PREFIX.length)
      .split(/\s+/);


    switch(CMD_NAME){
      case 'kick':
        kickMember({message,args});
        break;

      case 'ban': 
        banMember({message,args});
        break;
    }    
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
