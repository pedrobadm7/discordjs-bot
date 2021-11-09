const MessageEmbed = require("discord.js").MessageEmbed;

const execute = ({ client, message, args }) => {
  const embed = {
    color: "#0099ff",
    title: `Seja bem-vindo, ${message.author.username}#${message.author.discriminator}!!`,
    description: "Um server de amigos para amigos",
    thumbnail: {
      url: message.author.avatar
        ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${
            message.author.discriminator % 5
          }.png`,
    },
    url: "https://www.linkedin.com/in/pedrobadm/",
    author: {
      name: "Amigos do Blau Blau",
      icon_url: `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`,
      url: "https://github.com/pedrobadm7",
    },
    fields: [
      {
        name: "Você é o membro n°",
        value: message.guild.memberCount.toString(10),
        inline: true,
      },
      {
        name: "Server ativo desde:",
        value: "08/11/2021",
        inline: true,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "Pedro Barros ©  2021. Todos os direitos reservados",
    },
  };

  message.channel.send({ embeds: [embed] });
};

module.exports = {
  name: "embed",
  help: "Retorna uma MessageEmbed",
  embed: execute,
};
