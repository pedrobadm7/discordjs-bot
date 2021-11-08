const execute = ({ client, message, args }) => {
  let functionResponsability = "=====Dicas da quebrada=====\n\n";
  client.commands.forEach((command) => {
    if (command.help) {
      functionResponsability += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
    }
  });
  return message.channel.send(functionResponsability);
};

module.exports = {
  name: "help",
  help: "Exibe a ajuda de todos os comandos",
  helpUser: execute,
};
