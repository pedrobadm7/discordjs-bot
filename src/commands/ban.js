const {
  hasNoIdResponse,
  noPermissionToKickResponse,
  notFoundMessage,
} = require("../commandsResponse");

const execute = ({ client, message, args }) => {
  if (message.member.permissions.has("BAN_MEMBERS")) {
    return noPermissionToKickResponse(message);
  }

  if (args.length === 0) return hasNoIdResponse(message);

  const member = message.guild.members.cache.get(args[0]);

  if (member) {
    return message.guild.members.ban(args[0]).catch((err) => console.log(err));
  }

  return notFoundMessage(message);
};

module.exports = {
  name: "ban",
  help: "Esse comando irá banir um usuário da guilda",
  banMember: execute,
};
