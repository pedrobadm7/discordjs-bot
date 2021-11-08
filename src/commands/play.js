const searchSong = require("yt-search");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
const ytdl = require("ytdl-core-discord");

const execute = ({ client, message, args }) => {
  const songName = args.join(" ");
  try {
    searchSong(songName, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result && result.videos.length > 0) {
          const song = result.videos[0];
          playSong({ client, message, song });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const playSong = async ({ client, message, song }) => {
  if (!song) {
  }
  if (!message.member.voice.channel) {
    return message.channel.send(
      "Você deve entrar em um canal de voz para reproduzir a música, amigo"
    );
  }

  let queue = client.queues.get(message.guild.id);
  if (!queue) {
    const voiceChannel = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    queue = {
      volume: 10,
      connection: voiceChannel,
      dispatcher: null,
      songs: [song],
    };

    const dispatcher = queue.connection.play(await ytdl(song.url), {
      type: "opus",
    });
    queue.dispatcher = dispatcher;
    client.queues.set(message.guild.id, queue);
  }
};

module.exports = {
  name: "play",
  help: "Reproduz a música desejada",
  play: execute,
};
