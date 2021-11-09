const MessageEmbed = require("discord.js").MessageEmbed;

const execute = ({ client, message, args }) => {
  if (args.length === 0) {
    const embed = {
      title: "Escolha suas áreas de interesse meu parceiro",
      description:
        "Para escolher uma área de interesse, dê uma risadinha... Brinks! Apenas reaja com Emoji que desejar. Cada área de interesse possui um emoji, representados abaixo:",
      author: {
        name: "Amigos do Blau Blau",
        icon_url: `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`,
        url: "https://github.com/pedrobadm7",
        fields: [
          { name: "Dev", value: "💻", inline: true },
          { name: "Games", value: "🎮", inline: true },
        ],
      },
    };

    message.member.send({ embeds: [embed] }).then((embed) => {
      const collector = embed.createReactionCollector((reaction, user) =>
        ["💻", "🎮"].includes(reaction.emoji.name)
      );
      collector.on("collect", (reaction, user) => {
        console.log(reaction.emoji.name);
      });
    });
  }
};

module.exports = {
  name: "role",
  help: "Atribui cargos a um usuário",
  role: execute,
};
