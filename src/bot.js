const dotenv = require("dotenv");
const { Client, Intents } = require("discord.js");

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
    if (CMD_NAME === "kick") {
      if (message.member.permissions.has("KICK_MEMBERS"))
        return message.reply(
          "Vilão, melhor ir parando por aqui, você não tem permissões, fraga?"
        );
      if (args.length === 0)
        return message.reply("Preciso de um ID válido meu chegado");
      const member = message.guild.members.cache.get(args[0]);

      if (member) {
        member.kick().then((member) => {
          message.channel.send(`${member} foi de base`).catch((err) => {
            message.channel.send(
              "Vilão, deu ruim, conseguir banir o menor não"
            );
          });
        });
      } else {
        message.channel.send("Não encontrei o membro não meu glorioso Jedi");
      }
    } else if (CMD_NAME === "ban") {
      if (message.member.permissions.has("BAN_MEMBERS"))
        return message.reply(
          "Vilão, melhor ir parando por aqui, você não tem permissões, fraga?"
        );
      if (args.length === 0)
        return message.reply("Preciso de um ID válido meu chegado");
      message.guild.members.ban(args[0]).catch((err) => console.log(err));
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
