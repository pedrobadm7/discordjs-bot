


const hasNoIdResponse = (eventMessageObject) => eventMessageObject.reply("Preciso de um ID válido meu chegado");

const noPermissionToKickResponse = (eventMessageObject) => eventMessageObject.reply(
  "Vilão, melhor ir parando por aqui, você não tem permissões, fraga?"
);

const notFoundMessage = (eventMessageObject) => eventMessageObject.channel.send("Não encontrei o membro não meu glorioso Jedi");

const kickMember =({message, args}) => {
  if (message.member.permissions.has("KICK_MEMBERS")){
    return noPermissionToKickResponse(message);
  }  
        
  if (args.length === 0) return hasNoIdResponse(message);
    
  const member = message.guild.members.cache.get(args[0]);

  if (member) {
    return  member.kick().then((member) => {
      message.channel.send(`${member} foi de base`).catch((err) => {
        message.channel.send(
          "Vilão, deu ruim, conseguir banir o menor não"
        );
      });
    });
  }
}
  

const banMember = ({message, args}) => {
  if (message.member.permissions.has("BAN_MEMBERS")) {
    return  noPermissionToKickResponse(message);
  }
   
  if (args.length === 0) return hasNoIdResponse(message);

  const member = message.guild.members.cache.get(args[0]);
  
  if(member) {
    return message.guild.members.ban(args[0]).catch((err) => console.log(err));
  }

  return notFoundMessage(message);    
} 


const Commands = {
  kickMember,
  banMember
}

module.exports = Commands