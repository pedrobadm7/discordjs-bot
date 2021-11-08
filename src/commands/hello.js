const execute = ({ client, message, args }) => {
  console.log(args);
  return message.reply(
    `Olá, ${args} seja bem-vindo(a) a este servidor de gente doida`
  );
};

module.exports = {
  name: "hello",
  help: "Esse comando irá saudar um novo usuário!",
  hello: execute,
};
