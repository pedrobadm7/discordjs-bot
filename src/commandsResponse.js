const hasNoIdResponse = (eventMessageObject) =>
  eventMessageObject.reply("Preciso de um ID válido meu chegado");

const noPermissionToKickResponse = (eventMessageObject) =>
  eventMessageObject.reply(
    "Vilão, melhor ir parando por aqui, você não tem permissões, fraga?"
  );

const notFoundMessage = (eventMessageObject) =>
  eventMessageObject.channel.send(
    "Não encontrei o membro não meu glorioso Jedi"
  );

const Commands = {
  hasNoIdResponse,
  noPermissionToKickResponse,
  notFoundMessage,
};

module.exports = Commands;
