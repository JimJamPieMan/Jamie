/*TODOlist

*/

//Sets up thr uptimerobot keeper upper
const express = require("express")
const expressApp = express()
expressApp.get("/", (req, res) => res.json("OK"))
expressApp.listen(process.env.PORT)


//Setup the requirements
const Commando = require('discord.js');
const Bot = new Commando.Client();
const search = require('youtube-search');
const randomPuppy = require('random-puppy');
const randomCat = require('random-cat');
const nodemailer = require('nodemailer');
const SyllaRhyme = require('syllarhyme');
const randomWords = require('random-words');
const getMemeUrls = require('get-meme-urls');
const yt = require('ytdl-core');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const settings = new Enmap({
  provider: new EnmapLevel({
    name: "settings"
  })
});
const getVideoId = require('get-video-id');
const fetchVideoInfo = require('youtube-info');
const htmlToText = require('html-to-text');
const fs = require("fs");
const Pornsearch = require('pornsearch');
const faye = "428449205581774848";
// const maker = Bot.users.find("id", process.env.myID);



//Default Settings
const defaultSettings = {
  prefix: "`",
  volume: "10"
}


//When the bot joins a server, make a new server settings for that server
Bot.on("guildCreate", guild => {
  settings.set(guild.id, defaultSettings);
  guild.channels.find("name", "announcements").send("```Holy shit what fuck is up guys, its ya boi James' bot. '`' is the default prefix bu that can be changed. If you want to know what I do just type `help and ill help you. BE FOREWARNED, I swear a lot. (Dear server owner, you must create a special role called 'Rue brick'. its case sensative and will give people more commands (see help command).```");
});


//When the bot leaves a server delete the server settings
Bot.on("guildDelete", guild => {
  settings.delete(guild.id);
});


//When the bot is turned on, set the activity
Bot.on('ready', () => {
  Bot.user.setUsername("Jamie");
  Bot.user.setActivity("type fucking `help " + "(" + Bot.guilds.size + ")");
});


//Setup the queue system for music
var servers = {};


//Meat and potatos
Bot.on("message", async message => {
  const guildConf = settings.get(message.guild.id);
  var serverPrefix = guildConf.prefix;
  var PREFIX = serverPrefix;


  //ignore embeds starting with ``
  if (message.content.startsWith("``")) {
    return;
  }


  //Ignore dms with a reply
  if (message.channel.type === "dm") {
    message.author.send("i dont work here and i never will, i am meant to be shared by the many");
    return;
  }


  //Makes it so when the bot is tagged with the word prefix after it send the guilds prefix
  if (message.content.startsWith("<@" + Bot.user.id + "> prefix")) {
    message.channel.send("this servers current prefix is " + "'" + guildConf.prefix + "'");
  }


  //yep
  if (message.content.startsWith('ur mom gay')) {
    message.channel.send("no u");
  }

  //yep 2.0
  if (message.content.startsWith('fuck me')) {
    message.channel.send("only if you ask nicely");
  }


  //Ignore all bots
  if (message.author.bot) {
    return;
  }


  //Setup the prefix, commands and args
  if (message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  //ignore things that aren't a command
  if (!(["volume", "showconf", "pupper", "kitty", "feedback", "bob", "elf", "freedom", "fuck", "fuckoff", "gtfo", "info", "manesh", "meme", "music", "help", "halloween", "funnysexthing", "eval", "poll", "nsfwvid", "kelsey", "mute", "unmute", "nsfwgif", "avatar", "men", "allserversmessage", "prefix"].includes(command))) {
    message.channel.send(message.author + " wee woo wee woo, we got a smart ass over here. (that command doesn't exist, you probs typed it wrong('help' will solve that(if you that command should exist, use the 'feedback' command to tell James what you really think or give a suggestion)))");
  } else {

    
    
    //Command for changing prefix
    if (command === "prefix") {
      if (message.member.hasPermission('ADMINISTRATOR')) {
        const key = "prefix";
        if (!guildConf.hasOwnProperty(key)) return message.reply("well ill be fucked as to how you got this error");
        var pre = args[0];
        if (!args[0]) {
          message.reply("could you try that again. *F O R  F U C K  S A K E*");
          return;
        }
        if (args.length >= 2) {
          message.channel.send("you can only set one prefix, cuck");
          return;
        } else {
          guildConf[key] = pre;
          settings.set(message.guild.id, guildConf);
          message.channel.send("@everyone THE FUCKING PREFIX IS NOW " + pre);
        }
      } else {
        message.channel.send("Who areeeeee you?");

      }
    }

    
    
    //Sends a message to all servers general chat
    if (command === "allserversmessage") {
      if (message.author.id !== process.env.myID) {
        message.channel.send(message.author + " you dont have permission to use this and no one ever will");
        var badPerson = message.author;
        Bot.fetchUser(process.env.myID)
          .then(user => {
            user.send("Someone tried to use the allserversmessage command. They were warned " + badPerson + " in " + message.guild.name)
          })
        return;
      }
      message.author.send("allserversmessage command used by you");
      var guildList = Bot.guilds.array();
      try {
        var messageToSend = args.join(" ");
        guildList.forEach(guild => guild.channels.find("name", "general").send(messageToSend));
      } catch (err) {
        console.log("Could not send message to a server");
      }
    }


    //Get your own avatar or a tagged one
    if (command === "avatar") {
      if (message.mentions.members.first()) {
        message.channel.send("https://cdn.discordapp.com/avatars/" + message.mentions.users.first().id + "/" + message.mentions.users.first().avatar + ".jpg?size=256");
      } else {
        message.channel.send("https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".jpg?size=256");
      }

    }
    

    //Unmutes a person
    if (command === "unmute") {
      let myRole = message.guild.roles.find("name", "Rue brick");
      if (!message.member.roles.has(myRole.id)) return message.channel.send("you need to get gooder to be able to do this you fucker");
      let member = message.mentions.members.first();
      if (!member) return message.channel.send("i need someone to unmute bischhh");
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("i need to get gooder to be able to do this");
      message.channel.overwritePermissions(member, {
          SEND_MESSAGES: true
        })
        .then(updated => message.channel.send("`" + member.displayName + "` has had their voice be heard `" + message.member.displayName + "`"))
        .catch(er => message.channel.send("shit went up and fuck went down"));
    }


    //Mutes a person
    if (command === "mute") {
      let myRole = message.guild.roles.find("name", "Rue brick");
      if (!message.member.roles.has(myRole.id)) return message.channel.send("you need to get gooder to be able to do this you fucker");
      let member = message.mentions.members.first();
      if (!member) return message.channel.send("i need someone to mute bischhh");
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("i need to get gooder to be able to do this");
      message.channel.overwritePermissions(member, {
          SEND_MESSAGES: false
        })
        .then(updated => message.channel.send("`" + member.displayName + "` has had their opinion shut the fuck down `" + message.member.displayName + "`"))
        .catch(er => message.channel.send("shit went up and fuck went down"));
    }


    // kelsey
    if (command === "kelsey") {
      message.channel.send("barb coo", {
        tts: true
      });
    }


    //Well i think we all know what this does
    if (command === "nsfwgif") {
      if (message.channel.nsfw || message.channel.name.includes("nsfw")) {
        if (!args[0]) {
          message.channel.send("add some words to search idiot");
          return;
        } else {
          message.channel.startTyping();
          var searchTerm = args.join(" ");
          var driver;
          const pornGif = new Pornsearch(searchTerm, driver = 'sex');
          pornGif.gifs()
            .then(function (gifs) {
              var oneToShow = Math.floor(Math.random() * gifs.length);
              message.channel.stopTyping();
              const embed = {
                "title": "nowShowingPorngif() " + "'" + gifs[oneToShow].title + "'",
                "color": 9442302,

                "image": {
                  "url": gifs[oneToShow].url
                },
              };
              message.channel.send({
                embed
              });
            }).catch(err => {
              message.reply("maybe try another search term for your sick gifs");
              message.channel.stopTyping();
            });
        }
      } else {
        message.channel.send("soz fam cant use that here. go do your weird shit in the nsfw channel. there might be kids watching");
      }
    }


    //wtf
    if (command === "nsfwvid") {
      if (message.channel.nsfw || message.channel.name.includes("nsfw")) {
        if (!args[0]) {
          message.channel.send("add some words to search idiot");
          return;
        } else {
          message.channel.startTyping();
          var searchTerm = args.join("_");
          var driver;
          const Searcher = new Pornsearch(searchTerm, driver = 'pornhub');
          Searcher.videos()
            .then(function (videos) {
              var searchAmount = videos.length;
              var oneToShow = Math.floor(Math.random() * searchAmount);
              message.channel.stopTyping();
              const embed = {
                "title": "nowShowingPornvid() " + "'" + videos[oneToShow].title + "'",
                "color": 9442302,
                "image": {
                  "url": videos[oneToShow].thumb
                },
                "fields": [{
                    name: "how long this shit is",
                    value: videos[oneToShow].duration
                  },
                  {
                    name: "linky link",
                    value: videos[oneToShow].url
                  }
                ]
              };
              message.channel.send({
                embed
              });
            }).catch(err => {
              message.reply("maybe try another search term for your sick videos");
              message.channel.stopTyping();
            });
        }
      } else {
        message.channel.send("soz fam cant use that here. go do your weird shit in the nsfw channel. there might be kids watching");
      }
    }


    //democracy in action
    if (command === "poll") {
      if (!args) return message.reply("You must have something to vote for!")
      if (!message.content.includes("?")) return message.reply("Include a ? in your vote!")
      message.channel.send(`:ballot_box:  ${message.author.username} started a vote! React to my next message to vote on it. :ballot_box: `);
      const pollTopic = await message.channel.send(message.content.slice(5));
      await pollTopic.react(`✅`);
      await pollTopic.react(`⛔`);
      const filteryes = (reaction) => reaction.emoji.name === '✅';
      const filterno = (reaction) => reaction.emoji.name === '⛔';
      const collectoryes = pollTopic.createReactionCollector(filteryes, {
        time: 15000
      });
      const collectorno = pollTopic.createReactionCollector(filterno, {
        time: 15000
      });
      collectoryes.on('collect', r => console.log(`Collected ${r.emoji.name}`));
      collectorno.on('collect', r => console.log(`Collected ${r.emoji.name}`));
      collectoryes.on('end', collectedyes => message.channel.send(` ✅ Collected ${collectedyes.size} items`));
      collectorno.on('end', collectedno => message.channel.send(` ⛔ Collected ${collectedno.size} items`));
    }


    //The famed eval command
    if (command === "eval") {
      const clean = text => {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
      }
      if (message.author.id !== process.env.myID) {
        message.channel.send(message.author + " you dont have permission to use this and no one ever will");
        var badPerson = message.author;
        Bot.fetchUser(process.env.myID)
          .then(user => {
            user.send("Someone tried to use the eval command. They were warned " + badPerson + " in " + message.guild.name)
          })
        return;
      }
      message.author.send("eval command used by you");
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        message.channel.send(clean(evaled), {
          code: "xl"
        });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }


    //Gives a random sex thing (idk)
    if (command === "funnysexthing") {
      let phraseObj = JSON.parse(fs.readFileSync("./phrase.json", "utf8"));
      var phraseSaying = Math.floor(Math.random() * phraseObj.saying.length);
      message.channel.send(phraseObj.saying[phraseSaying]);
    }


    //Gives the amount of time to halloween
    if (command === "halloween") {
      var oneMinute = 60 * 1000;
      var oneHour = oneMinute * 60;
      var oneDay = oneHour * 24;
      var today = new Date();
      var nextHalloween = new Date();
      nextHalloween.setMonth(9);
      nextHalloween.setDate(30);
      if (today.getMonth() == 9 && today.getDate() > 30) {
        nextHalloween.setFullYear(nextHalloween.getFullYear() + 1);
      }
      var diff = nextHalloween.getTime() - today.getTime();
      diff = Math.floor(diff / oneDay);
      message.channel.send("OMG ITS ONLY " + diff + " DAYS TILL HALLOWEEN BETTER GET READY FUCKERS", {
        tts: true
      });
    }


    //Changes the volume
    if (command === "volume") {
      const key = "volume";
      if (!guildConf.hasOwnProperty(key)) return message.reply("well ill be fucked as to how you got this error");
      var vol = args[0];
      if (!args[0] || isNaN(args[0])) {
        message.reply("could you try that again. *F O R  F U C K  S A K E*");
      } else {
        guildConf[key] = vol;
        settings.set(message.guild.id, guildConf);
        message.channel.send("THE FUCKING PREFIX IS NOW " + vol);
      }
    }


    //Shows the volume
    if (command === "showconf") {
      var configVol = guildConf.volume;
      var configPre = guildConf.prefix;
      message.channel.send(`this servers volume is fucking : \`\`\`${configVol}\`\`\``);
      message.channel.send(`this servers prefix is fucking : \`\`\`${configPre}\`\`\``);
    }


    //Sends a random pupper
    if (command === "pupper") {
      randomPuppy()
        .then(url => {
          message.reply("here is you dogger " + url);
        })
    }


    //Sends a random kitty
    if (command === "kitty") {
      var url = randomCat.get();
      message.reply("here the fuck is is your kitty " + url + " (this is the actual shittest api ever)");
    }


    //Sends feedback to my personal email
    if (command === "feedback") {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.pass
        }
      });
      var emailsender = message.author.username;
      if (!args[0]) {
        message.reply('you might want to add some fucking text you fuck');
        console.log('message didnt send');
      } else {
        message.channel.startTyping();
        var messageText = args.join(" ");
        var mailOptions = {
          from: 'jamesbotfeedback@gmail.com',
          to: 'rudlandjames@gmail.com',
          subject: 'You got some feedback on your bot fam. (From ' + emailsender + ')',
          text: messageText
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            message.reply('well fuck it didnt work maybe gove it another fucking hot');
            message.channel.stopTyping();
          } else {
            message.reply('Your fucking feedback was sent so thats fucking great');
            message.channel.stopTyping();
          }
        });
      }
    }


    //Sends a picture of bob the builder
    if (command === "bob") {
      message.reply("pls sned bob" + " https://imgur.com/a/iCv7s");
    }


    //Makes an elf on the shelf meme
    if (command === "elf") {
      SyllaRhyme(function (sr) {
        var rword = randomWords();
        var words = sr.rhymes(rword);
        var randomAnswer1 = words[Math.floor(Math.random() * words.length)];
        var randomAnswer2 = words[Math.floor(Math.random() * words.length)];
        message.reply("You've heard of elf on a shelf. Now get ready for " + randomAnswer1 + " on a " + randomAnswer2);
      })
    }


    //Sends the declaration of independance
    if (command === "freedom") {
      message.reply("<FREEDOM>'MURICA</FREEDOM>", {
        file: "freedom.txt"
      });
    }


    //Moves you a predetermined channel
    if (command === "fuck") {
      let myRole = message.guild.roles.find("name", "Rue brick");
      if (!message.member.roles.has(myRole.id)) return message.channel.send("you need to get gooder to be able to do this you fucker");
      if (!message.member.voiceChannel) {
        message.channel.send("if i were to move you when your not in a voice channel the whole world would probably explode and we dont want that do we so maybe get in a channel, Dick!");
        return;
      }
      var channels = message.guild.channels.filter(channel => channel.type === 'voice');
      var channelcount = message.guild.channels.size
      var guildname = message.guild.name;
      var channelTogo = channels.map(channel => channel.id);
      var voicechan = Math.floor(Math.random() * channelTogo.length);
      var finalChannel = channelTogo[voicechan];
      message.member.setVoiceChannel(finalChannel);
      message.reply('Seeya you fuck');
    }


    //moves someone else to another channel
    if (command === "fuckoff") {
      let myRole = message.guild.roles.find("name", "Rue brick");
      if (!message.member.roles.has(myRole.id)) return message.channel.send("you need to get gooder to be able to do this you fucker");
      var member = message.mentions.members.first();
      if (!message.member.voiceChannel) {
        message.channel.send("now that would be a little rude wouldn't it you fuck");
        return;
      }
      if (!member.voiceChannel) {
        message.channel.send("wow you must really hate them, they arent even in a voice channel");
        return;
      }
      var channels = message.guild.channels.filter(channel => channel.type === 'voice');
      var channelcount = message.guild.channels.size
      var guildname = message.guild.name;
      var channelTogo = channels.map(channel => channel.id);
      var voicechan = Math.floor(Math.random() * channelTogo.length);
      var finalChannel = channelTogo[voicechan];
      member.setVoiceChannel(finalChannel).then((member) => {
        message.channel.send("you moved that fucker go you bitch ");
      }).catch(() => {
        message.channel.send("oopsy poopsie you got a moopsie");
      });
    }


    //Makes the bot leave
    if (command === "gtfo") {
      let myRole = message.guild.roles.find("name", "Rue brick");
      if (message.member.roles.has(myRole.id)) {
        var voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
          return message.reply("why the fuck would you want me to leave if you aren't in a chat you fuck leave me the fuck alone");
        } else {
          voiceChannel.leave();
        }
      } else {
        var channels = message.guild.channels.filter(channel => channel.type === 'voice');
        var channelcount = message.guild.channels.size
        var guildname = message.guild.name;
        var channelTogo = channels.map(channel => channel.id);
        var voicechan = Math.floor(Math.random() * channelTogo.length);
        var finalChannel = channelTogo[voicechan];
        message.member.setVoiceChannel(finalChannel);
        message.say("HOW FUCKIN DARE YOU TRY TO KICK ME");
      }
    }

    //Used to play local mp3 files from the server before it was moved to a different hosting service
    // if (command === "sounds") {
    //   message.reply("don work, the way it hosted means this dont work now sadly");
    //   /*
    //   var voiceChannel = message.member.voiceChannel;
    //     if (!voiceChannel){
    //         return message.reply("if you want to hear fucking sounds get in a fucking channel");
    //       }
    //             else if (args[0] === "" || isNaN(args[0])){
    //               message.reply("for fuck sake what the fuck do you want me to play. (1: good good cut got it great, 2: they got t, 3: fun fueled family fuel fun for the whole adventure family, 4: as nebble say brontasorus, 5: CHiPS!!!, 5.1:CHiPS!!!!, 6:ITS A FUN TIME, 7:i love babies, 8:that kid kicked sand in cool cats face, 9:three flavours of wine");
    //       }
    //       else{
    //         var soundtoplay = args[0].toString();
    //         console.log(args[0]);
    //          message.channel.sendMessage('i joined your fucking channel  (do not do the sounds command again because i havent done the queue code yet and its proving to be a lil bitch. thanks, love james)');
    //        voiceChannel.join().then(connection => {
    //            console.log("joined channel");
    //            const dispatcher = connection.playFile("assets/"+args[0] + '.mp3');
    //            dispatcher.on("end", end => {
    //                console.log("left channel");
    //                message.channel.sendMessage("either the song ended and i left or some fucker didnt read the above message and did the command again. either way fuck you");
    //                voiceChannel.leave();
    //            });
    //        }).catch(err => console.log(err));
    //      }*/
    // }


    //Gives a little info on the bot
    if (command === "info") {
      message.reply('i was made by <@201669657105530880>. he made so i swear alot so thats fucking good. if you need some fucking help just type "' + guildConf.prefix + 'help". thanks bicthesz.');
    }


    //Men
    if (command === "men") {
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/two-and-a-half-men-movie-poster-2003-1020478794.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/two-and-a-half-men-movie-poster-2003-1020478794.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/two-and-a-half-men-movie-poster-2003-1020478794.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/two-and-a-half-men-movie-poster-2003-1020478794.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/two-and-a-half-men-movie-poster-2003-1020478794.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/two-and-a-half-men-movie-poster-2003-1020478794.jpg");
    }
    

    //Sends 5 pictures of a random Indian man a friend found
    if (command === "manesh") {
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/YZp0vDp%20-%20Imgur.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/YZp0vDp%20-%20Imgur.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/YZp0vDp%20-%20Imgur.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/YZp0vDp%20-%20Imgur.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/YZp0vDp%20-%20Imgur.jpg");
      message.channel.send("https://raw.githubusercontent.com/JimJamPieMan/james-bot/glitch/manip/YZp0vDp%20-%20Imgur.jpg");
    }


    //Sends a meme
    if (command === "meme") {
      getMemeUrls(args[0]).then(result => {
        message.reply(result[0] + " i am not gonna lie, this is a fucking shit meme, i havent even seen it i just fucking know");
      }).catch(err => {
        message.reply("whoops fuck went up and shit went down!");
      });
    }


    //Plays music, pretty simple
    if (command === "music") {
      if (!args[0]) {
        message.reply("maybe you should learn how to bot bitch {usage " + guildConf.prefix + "music play <url> || stop || skip || pause || resume}");
      } else {
        switch (args[0]) {
          case "play":
            if (!message.member.voiceChannel) {
              message.channel.send("if you want to hear me get in a fucking voice channel you cuck");
              return;
            }
            if (!args[1]) {
              message.reply("i need a youtube link to play nothing else works(FUCK YEAH SEARCH IS HERE BITCHHHHHH) (usage " + guildConf.prefix + "music play <url> || <searchterm> || stop || skip || pause || resume)");
              return;
            }
            if (message.content.includes("http://") || message.content.includes("https://")) {
              if (message.content.includes("youtube") || message.content.includes("youtu.be")) {
                if (!servers[message.guild.id]) {
                  servers[message.guild.id] = {
                    queue: []
                  }
                }
                var server = servers[message.guild.id];
                server.queue.push(args[1]);
                message.channel.send("i added that bitch to the queueueueuueueueueuueueueueu");

                if (!message.guild.voiceConnection) {
                  message.member.voiceChannel.join().then(function (connection) {
                    play(connection, message);
                  }).catch(err => {
                    // handle err
                    message.reply("i cant join for some reason, hmm. (check if my permissions are okay)");
                  });
                }
                break;
              } else {
                message.reply('only youtube links are allowed you fucking fucccck');
              }
            } else {
              var opts = {
                maxResults: 1,
                key: process.env.youtubeapi,
                type: 'video'
              };
              args.shift();
              var searchTerm = args.join("_");
              search(searchTerm, opts, function (err, results) {
                if (err) {
                  console.log(err);
                  message.channel.send("maybe try a different search term");
                  return;
                }
                var searchUrl = results[0].link;
                message.channel.send(searchUrl);
                if (!servers[message.guild.id]) {
                  servers[message.guild.id] = {
                    queue: []
                  }
                }
                var server = servers[message.guild.id];
                server.queue.push(searchUrl);
                message.channel.send("i added that bitch to the queueueueuueueueueuueueueueu");

                if (!message.guild.voiceConnection) {
                  message.member.voiceChannel.join().then(function (connection) {
                    play(connection, message);
                  });
                }
              });
            }
            break;
          case "skip":
            var server = servers[message.guild.id];
            if (server.dispatcher) {
              server.dispatcher.end();
              message.channel.send("i skipped that bitch just like skipping in primary school");
            }
            break;

          case "stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) {
              message.guild.voiceConnection.disconnect();
            }
            break;

          case "pause":
            var server = servers[message.guild.id];
            if (server.dispatcher) {
              server.dispatcher.pause();
              message.channel.send("paused mother fukaaaaaaa");
            }
            break;

          case "resume":
            var server = servers[message.guild.id];
            if (server.dispatcher) {
              server.dispatcher.resume();
              message.channel.send("resumed mother fukaaaaaaa");
            }
            break;

          case "queue":
            var server = servers[message.guild.id];
        }
        function play(connection, message) {
          var server = servers[message.guild.id];
          server.dispatcher = connection.playStream(yt(server.queue[0], {
            filter: "audioonly"
          }));
          var vidIDforSearch = getVideoId(server.queue[0]).id;
          fetchVideoInfo(vidIDforSearch).then(function (videoInfo) {
            var minutes = Math.floor(videoInfo.duration / 60);
            var seconds = videoInfo.duration - minutes * 60;
            var oldDes = videoInfo.description;
            var normalDes = htmlToText.fromString(oldDes, {
              wordwrap: false
            });
            if (normalDes.length > 50) {
              normalDes = normalDes.substr(0, 50) + '[...(See more)](' + videoInfo.url + ')';
            }
            let phraseObj = JSON.parse(fs.readFileSync("./phrase.json", "utf8"));
            var phraseFooter = Math.floor(Math.random() * phraseObj.saying.length);
            const embed = {
              "title": "nowPlaying() " + "'" + videoInfo.title + "'",
              "description": normalDes,
              "color": 9442302,
              "footer": {
                "text": phraseObj.saying[phraseFooter]
              },
              "image": {
                "url": videoInfo.thumbnailUrl
              },
              "fields": [{
                  name: "how long this shit is",
                  value: minutes + "m" + seconds + "s"
                },
                {
                  name: "linky link",
                  value: videoInfo.url
                }
              ]
            };
            message.channel.send({
              embed
            });
          });
          var serverVol = guildConf.volume;
          server.dispatcher.setVolume(serverVol);
          server.queue.shift();
          server.dispatcher.on("end", function () {
            if (server.queue[0]) {
              setTimeout(() => play(connection, message), 200)
              message.channel.send("i am playing the next song in the queue motherfuckerrrrrr");
            } else {
              connection.disconnect();
              message.channel.send("k. done");
            }
          });
        }
      }
    }


    
    //Sends the user a help embed
    if (command === "help") {
      const embed = {
        "title": "dont be  stupid in the discord server, read the help",
        "description": "hey you wanted help so here are all the commands bitchhhhh. the prefix is" + PREFIX + "which is the button next to the 1 without a modifier.",
        "color": 9442302,
        "footer": {
          "text": "thank you, love from james xoxo (if you have a suggestion (cool api, cool command) use the " + guildConf.prefix + "feedback command"
        },
        "thumbnail": {
          "url": "https://cdn.glitch.com/ed065e92-daf8-4718-90ec-7b7d3c3337ce%2Fgreenaf.png?1521260734263"
        },
        "author": {
          "name": "hey, james here. have some help you fuck"
        },
        "fields": [{
            "name": PREFIX + "pupper",
            "value": "finds a random pupper"
          },
          {
            "name": PREFIX + "kitty",
            "value": "everytime you type it you get a cat but its the shittest api ever"
          },
          {
            "name": PREFIX + "feedback",
            "value": "sends james some feedback to his personal email adress ~~hahahahahahahahahahah~~whoops"
          },
          {
            "name": PREFIX + "bob",
            "value": "sneds a pic of bob the builder because why the fuck not"
          },
          {
            "name": PREFIX + "elf",
            "value": "the elf on the shelf meme but shit"
          },
          {
            "name": PREFIX + "pupper",
            "value": "sned as a random pupper"
          },
          {
            "name": PREFIX + "freedom",
            "value": "FUCK YEAH FREEDOM 'MURICA"
          },
          {
            "name": PREFIX + "fuck",
            "value": "moves youto another fucking channel"
          },
          {
            "name": PREFIX + "fuckoff",
            "value": "moves a person you tagged to another fucking channel"
          },
          {
            "name": PREFIX + "gtfo",
            "value": "kicks the bot from the fucking voice channel or if it fucking breaks. (requires a role called 'Rue brick' (case sensative))"
          },
          {
            "name": PREFIX + "info",
            "value": "gives a little bit of info on the piece of shit that is this bot"
          },
          {
            "name": PREFIX + "manesh",
            "value": "manesh^5"
          },
          {
            "name": PREFIX + "meme",
            "value": "gets a meme but yet again another shit api"
          },
          {
            "name": PREFIX + "music",
            "value": "okay so this one was a right little bitch to do and requried to redo the entire command system on the bot. the command is music followed by either play or stop or skip or pause or resume. after the play command MUST be a youtube link, search might be coming soon, we will see. for example '" + guildConf.prefix + "music play https://youtu.be/1suebohSF1w'."
          },
          {
            "name": PREFIX + "volume",
            "value": "holy fuck, using the very latest in volume6969 tech-fucking-nology theres a fucking volume command. your probably thinking, 'FUCK'. i know, fuck."
          },
          {
            "name": PREFIX + "halloween",
            "value": "HOLY SHIT HALLOWEEN IS THIS YEAR"
          },
          {
            "name": PREFIX + "funnysexthing",
            "value": "this one time in the overwatch general chat in GGOZ..."
          },
          {
            "name": PREFIX + "poll",
            "value": "fucking democracy in action"
          },
          {
            "name": PREFIX + "nsfwvid",
            "value": "you fucking degenerates"
          },
          {
            "name": PREFIX + "nsfwgif",
            "value": "you fucking degenerates. But now in Gifs!"
          },
          {
            "name": PREFIX + "kelsey",
            "value": "i dont know, this one just sorta happened"
          },
          {
            "name": PREFIX + "mute",
            "value": "mute a person from typing in a text channel. usage " + guildConf.prefix + "mute @<user you want to mute> (requires a role called 'Rue brick' (case sensative))"
          },
          {
            "name": PREFIX + "unmute",
            "value": "unmute a person from typing in a text channel. usage " + guildConf.prefix + "unmute @<user you want to unmute>(requires a role called 'Rue brick' (case sensative))"
          },
          {
            "name": PREFIX + "prefix + <new prefix>",
            "value": "changes the server prefix to what ever you want, it can be anything with out spaces"
          },
          {
            "name": PREFIX + "avatar",
            "value": "gets the avatar of yourself or a tagged person"
          },
          {
            "name": "prefix",
            "value": "if you '@' me and say prefix i will tell you the current prefix for the server"
          }
        ]
      };
      message.channel.send(message.author + " i slid right into your fucking dms");
      message.author.send("a whhhholllle lotta help for you", {
        embed
      });
    }
  }

});

//Logs the bot in with a secret token
Bot.login(process.env.TOKEN);