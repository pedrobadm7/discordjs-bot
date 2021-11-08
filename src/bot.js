const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { Client, Intents, Collection } = require("discord.js");
const { Player } = require("discord-music-player");

const { kickMember } = require("./commands/kick");
const { banMember } = require("./commands/ban");
const { hello } = require("./commands/hello");
const { helpUser } = require("./commands/help");
const { play } = require("./commands/play");
const { embed } = require("./commands/embed");

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
client.commands = new Collection();
client.queues = new Map();
client.player = new Player(client, {
  ytdlRequestOptions: {
    highWaterMark: 1 << 25,
    filter: "audioonly",
  },
});

const commandFiles = fs
  .readdirSync(path.join(__dirname, "./commands"))
  .filter((filename) => filename.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`${client.user.tag} está na área papae.`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let guildQueue = client.player.getQueue(message.guild.id);
  if (message.content.startsWith(process.env.PREFIX)) {
    const args = message.content.slice(process.env.PREFIX.length).split(/\s+/);
    const CMD_NAME = args.shift().toLowerCase();

    switch (CMD_NAME) {
      case "kick":
        kickMember({ client, message, args });
        break;

      case "ban":
        banMember({ client, message, args });
        break;

      case "hello":
        hello({ client, message, args });
        break;

      case "help":
        helpUser({ client, message, args });
        console.log(guildQueue);
        break;

      case "play":
        play({ client, message, args });
        break;

      case "skip":
        guildQueue.skip();
        break;

      case "stop":
        guildQueue.stop();
        message.reply("Parando essa bagaça");
        break;

      case "now":
        message.reply(`Now playing: ${guildQueue.nowPlaying}`);

        break;

      case "pause":
        guildQueue.setPaused(true);
        message.reply("Música pausada");
        break;

      case "resume":
        guildQueue.setPaused(false);
        message.reply("Música despausada");
        break;

      case "progress":
        const ProgressBar = guildQueue.createProgressBar();
        message.reply(ProgressBar.prettier);
        break;

      case "embed":
        embed({ client, message, args });
        break;

      default:
        return message.reply("Não conheço essa giria, pae");
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
