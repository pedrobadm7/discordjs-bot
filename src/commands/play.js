const {
  notFoundSong,
  hasToEnterInVoiceChannel,
} = require("../commandsResponse");

const searchSong = require("yt-search");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
const ytdl = require("ytdl-core-discord");

const execute = ({ client, message, args }) => {
  const songName = args.join(" ");
  try {
    searchSong(songName, (err, result) => {
      if (err) {
        return notFoundSong(message);
      } else if (result && result.videos.length > 0) {
        playSong({ client, message, args });
      } else {
        return message.reply("Não sei tocar essa aí não, malz");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const playSong = async ({ client, message, args }) => {
  let queue = client.queues.get(message.guild.id);

  if (!message.member.voice.channel) {
    return hasToEnterInVoiceChannel(message);
  }

  if (!queue) {
    queue = client.player.createQueue(message.guild.id);
    const guildQueue = client.player.getQueue(message.guild.id);

    await queue.join(message.member.voice.channel);

    await queue.play(args.join(" ")).catch((_) => {
      if (!guildQueue) queue.stop();
    });
    return message.channel.send(`Estou tocando ${guildQueue.nowPlaying}`);
  } else {
    queue = client.player.createQueue(message.guild.id);
    await queue.join(message.member.voice.channel);
    await queue.playlist(args.join(" ")).catch((_) => {
      if (!guildQueue) {
        console.log("Fila da Guilda inexistente");
      }
    });
  }
};

module.exports = {
  name: "play",
  help: "Reproduz a música desejada",
  play: execute,
};
