const {
  hasNoIdResponse,
  noPermissionToKickResponse,
} = require("../commandsResponse");

const execute = ({ client, message, args }) => {
  const member = message.guild.members.cache.get(args[0]);
  if (message.member.permissions.has("KICK_MEMBERS")) {
    return noPermissionToKickResponse(message);
  }

  if (args.length === 0) return hasNoIdResponse(message);

  if (member) {
    return member.kick().then((member) => {
      message.channel.send(`${member} foi de base`).catch((err) => {
        message.channel.send("Vilão, deu ruim, não consegui banir o menor não");
      });
    });
  }
};

module.exports = {
  name: "kick",
  help: "Esse comando irá kickar um usuário da guilda",
  kickMember: execute,
};
