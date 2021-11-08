const MessageEmbed = require("discord.js").MessageEmbed;

const execute = ({ client, message, args }) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Minha Embed")
    .setURL("https://www.linkedin.com/in/pedrobadm/")
    .setAuthor(
      "Pedro Barros",
      `https://cdn.discordapp.com/${message.guild.id}/${message.guild.icon}.png`
    );

  message.channel.send(embed);
};

module.exports = {
  name: "embed",
  help: "Retorna uma MessageEmbed",
  embed: execute,
};
