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

const notFoundSong = (eventMessageObject) =>
  eventMessageObject.channel.send(
    "Eae, quer que eu adivinhe o que você quer ouvir? Escreve o nome da música meu chegado"
  );

const hasToEnterInVoiceChannel = (eventMessageObject) =>
  eventMessageObject.channel.send(
    "Você deve entrar em um canal de voz para reproduzir a música, amigo"
  );

const Commands = {
  hasNoIdResponse,
  noPermissionToKickResponse,
  notFoundMessage,
  notFoundSong,
  hasToEnterInVoiceChannel,
};

module.exports = Commands;
