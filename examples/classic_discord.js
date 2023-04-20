//This example uses classic text commands. Make sure you have the Privileged Message Content intent enabled.

//Dependencies: Discord.js + the voice library and InvidJS
const Discord = require("discord.js");
const InvidJS = require("@invidjs/invid-js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  AudioPlayerStatus,
} = require("@discordjs/voice");

//Your token goes here. You may edit it in directly as well.
const token = process.env.BOT_TOKEN || process.argv[2];

//Creating a client
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

//Ready event
client.on("ready", () => {
  console.log("I am ready!");
});

//Commands
client.on("messageCreate", async (message) => {

  //Play command
  if (message.content.startsWith("!play")) {
    if (!message.member.voice.channel)
      return message.reply("You must join a voice channel first!");
    let args = message.content.split("play ")[1].split(" ")[0];

    //Fetching an instance.
    let instances = await InvidJS.fetchInstances({
      url: args.split("/w")[0],
    });
    let instance = instances[0];

    //Fetching the required video data.
    let video = await InvidJS.fetchVideo(instance, args.split("=")[1]);

    //Fetching the best format.
    let format = video.formats.find(
      (format) => format.audio_quality === InvidJS.AudioQuality.Medium
    );

    //Fetching the given stream.
    let stream = await InvidJS.fetchSource(instance, video, format, {
      saveTo: InvidJS.SaveSourceTo.Memory,
      parts: 10,
    });

    //Creating a player.
    let connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    let player = createAudioPlayer();
    let resource = createAudioResource(stream, {
      inputType: stream.type,
    });
    player.play(resource);
    connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  }

  //Stop command
  if (message.content.startsWith("!stop")) {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) return message.channel.send("The bot is already stopped!");
    else {
      connection.destroy();
      return message.reply("Stopped!");
    }
  }
});

client.login(token);
