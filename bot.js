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
const PREFIX = "`";
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const settings = new Enmap({
  provider: new EnmapLevel({
    name: "settings"
  })
});
//Default Settings
const defaultSettings = {
  prefix: "`",
  modLogChannel: "mod-log",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
  volume: "10"
}
//When the bot joins a server, make a new server settings for that server
Bot.on("guildCreate", guild => {
  settings.set(guild.id, defaultSettings);
});
//When the bot leaves a server delete the server settings
Bot.on("guildDelete", guild => {
  settings.delete(guild.id);
});
//When the bot is turned on, se the activity
Bot.on('ready', () => {
  Bot.user.setActivity("type fucking `help");
});
//Setup the queue system for music
var servers = {};
Bot.on("message", async message => {
  if (message.content.startsWith("ur mom gay")) {
    message.channel.send("no u");
  } else {
    const guildConf = settings.get(message.guild.id);
    if (message.content.indexOf(PREFIX) !== 0) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

//Changes the volume
    if (command === "volume") {
      const key = "volume";
      if (!guildConf.hasOwnProperty(key)) return message.reply("well ill be fucked as to how you got this error");
      var vol = args[0];
      guildConf[key] = vol;
      settings.set(message.guild.id, guildConf);
      message.channel.send(`THE FUCKING VOLUME IS NOW \n\`${vol}\``);
    }

//Shows the volume
    if (command === "showvol") {
      var config = guildConf.volume;
      message.channel.send(`this servers volume is fucking : \`\`\`${config}\`\`\``);
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
          user: 'jamesbotfeedback@gmail.com',
          pass: 'Astro12345@'
        }
      });
      var emailsender = message.author.username;
      if (!args[0]) {
        message.reply('you might want to add some fucking text you fuck');
        console.log('message didnt send');
      } else {
        console.log(emailsender);
        var messageText = args.join(" ");
        var mailOptions = {
          from: 'jamesbotfeedback@gmail.com',
          to: 'rudlandjames@gmail.com',
          subject: 'You got some feedback on your bot fam. (From ' + emailsender + ')',
          text: messageText
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            message.reply('well fuck it didnt work maybe gove it another fucking hot');
          } else {
            console.log('Email sent: ' + info.response);
            message.reply('Your fucking feedback was sent so thats fucking great');
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
      SyllaRhyme(function(sr) {
        var rword = randomWords();
        console.log(rword);
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
      message.member.setVoiceChannel('354951906147434496');
      message.reply('Seeya you fuck');
    }

//moves someone else to another channel
    if (command === "fuckoff") {
      var member = message.mentions.members.first();
      member.setVoiceChannel("354951906147434496").then((member) => {
        message.channel.send("you moved that fucker go you bitch ");
      }).catch(() => {
        message.channel.send("oopsy poopsie you got a moopsie");
      });
    }

//Makes the bot leave
    if (command === "gtfo") {
      let myRole = message.guild.roles.find("name", "Rue brick");
      console.log(myRole.id);
      if (message.member.roles.has(myRole.id)) {
        var voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
          return message.reply("why the fuck would you want me to leave if you aren't in a chat you fuck leave me the fuck alone");
          console.log(message.member);
        } else {
          voiceChannel.leave();
        };
      } else {
        message.member.setVoiceChannel('354951906147434496');
        message.say("HOW FUCKIN DARE YOU TRY TO KICK ME");
      }
    }

//Used to play local mp3 files from the server before it was moved to a different hosting service
    if (command === "sounds") {
      message.reply("don work, the way it hosted means this dont work now sadly");
      /*
      var voiceChannel = message.member.voiceChannel;
        if (!voiceChannel){
            return message.reply("if you want to hear fucking sounds get in a fucking channel");
          }
                else if (args[0] === "" || isNaN(args[0])){
                  message.reply("for fuck sake what the fuck do you want me to play. (1: good good cut got it great, 2: they got t, 3: fun fueled family fuel fun for the whole adventure family, 4: as nebble say brontasorus, 5: CHiPS!!!, 5.1:CHiPS!!!!, 6:ITS A FUN TIME, 7:i love babies, 8:that kid kicked sand in cool cats face, 9:three flavours of wine");
          }
          else{
            var soundtoplay = args[0].toString();
            console.log(args[0]);
             message.channel.sendMessage('i joined your fucking channel  (do not do the sounds command again because i havent done the queue code yet and its proving to be a lil bitch. thanks, love james)');
           voiceChannel.join().then(connection => {
               console.log("joined channel");
               const dispatcher = connection.playFile("assets/"+args[0] + '.mp3');
               dispatcher.on("end", end => {
                   console.log("left channel");
                   message.channel.sendMessage("either the song ended and i left or some fucker didnt read the above message and did the command again. either way fuck you");
                   voiceChannel.leave();
               });
           }).catch(err => console.log(err));
         }*/
    }

//Gives a little info on the bot
    if (command === "info") {
      message.reply('i was made by <@201669657105530880>. he made so i swear alot so thats fucking good. if you need some fucking help just type "`help". thanks bicthesz');
    }

//Sends 5 pictures of a random Indian man a friend found
    if (command === "manesh") {
      message.channel.send("https://imgur.com/a/5yIzw");
      message.channel.send("https://imgur.com/a/5yIzw");
      message.channel.send("https://imgur.com/a/5yIzw");
      message.channel.send("https://imgur.com/a/5yIzw");
      message.channel.send("https://imgur.com/a/5yIzw");
      message.channel.send("https://imgur.com/a/5yIzw");
    }

//Sends a meme
    if (command === "meme") {
      getMemeUrls(args[0]).then(result => {
        message.reply(result[0] + " i am not gonna lie, this is a fucking shit meme, i havent even seen it i just fucking know");
      }).catch(err => {
        // handle err
        message.reply("whoops fuck went up and shit went down!")
      });
    }

//Plays music, pretty simple
    if (command === "music") {
      if (!args[0]) {
        message.reply("maybe you should learn how to bot bitch {usage '`music play <url> || stop || skip || pause || resume}");
      } else {
        switch (args[0]) {
          case "play":
            if (!message.member.voiceChannel) {
              message.channel.send("if you want to hear me get in a fucking voice channel you cuck");
              return;
            }
            if (!args[1]) {
              message.reply("i need a youtube link to play nothing else works(search coming in a bit i think) (usage '`music play <url> || stop || skip || pause || resume)");
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
                message.channel.sendMessage("i added that bitch to the queueueueuueueueueuueueueueu");
                if (!message.guild.voiceConnection) {
                  message.member.voiceChannel.join().then(function(connection) {
                  play(connection, message);
                });
              }
                break;
              } else {
                message.reply('only youtube links are allowed you fucking fucccck');
              }
            } else {
              var opts = {
                maxResults: 1,
                key: 'AIzaSyC1akpWfDs9Ik8du4H5mf4mE57DG__u314',
                type: 'video'
              };
              search(args[1], opts, function(err, results) {
                if (err) return console.log(err);
                var searchUrl = results[0].link;
                console.dir(searchUrl);
                message.channel.send(searchUrl);
                if (!servers[message.guild.id]) {
                  servers[message.guild.id] = {
                  queue: []
                }
              }
                var server = servers[message.guild.id];
                server.queue.push(searchUrl);
                message.channel.sendMessage("i added that bitch to the queueueueuueueueueuueueueueu");
                if (!message.guild.voiceConnection){
                  message.member.voiceChannel.join().then(function(connection) {
                  play(connection, message);
                });
              }
              });
            }
            break;
          case "skip":
            var server = servers[message.guild.id];
            if (server.dispatcher){
              server.dispatcher.end();
            message.channel.sendMessage("i skipped that bitch just like skipping in primary school");
          }
            break;
          case "stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
            message.channel.sendMessage("k. c u fagut");
          }
            break;
          case "pause":
            var server = servers[message.guild.id];
            if (server.dispatcher){ server.dispatcher.pause();
            message.channel.sendMessage("paused mother fukaaaaaaa");
          }
            break;
          case "resume":
            var server = servers[message.guild.id];
            if (server.dispatcher) {server.dispatcher.resume();
            message.channel.sendMessage("resumed mother fukaaaaaaa");
          }
            break;
          case "queue":
            var server = servers[message.guild.id];
            message.channel.send(`\`\`\`${server.queue.join(" <br> ")}\`\`\``);
        }

        function play(connection, message) {
          var server = servers[message.guild.id];
          server.dispatcher = connection.playStream(yt(server.queue[0], {
            filter: "audioonly"
          }));
          message.channel.sendMessage("i am playing the next song in the queue motherfuckerrrrrr");
          var serverVol = guildConf.volume;
          server.dispatcher.setVolume(serverVol);
          server.queue.shift();
          server.dispatcher.on("end", function() {
            if (server.queue[0]){
              play(connection, message);
            }else{ connection.disconnect();
            message.channel.sendMessage("look at all those songs that just played");
          }
          });
        }
      }
    }

//Used to send a picture of a wolf getting a hand job but that was alittle weird to host on the internet
    if (command === "wolfjob") {
      message.reply("because i started hosting this bot else where i feel that the image you require shouldn't be on the internet");
    }

//Sends the user a help embed
    if (command === "help") {
      const embed = {
        "title": "dont be  stupid in the discord server, read the help",
        "description": "hey you wanted help so here are all the commands bitchhhhh. the prefix is" + PREFIX + "which is the button next to the 1 without a modifier",
        "color": 9442302,
        "footer": {
          "text": "thank you, love from james xoxo"
        },
        "thumbnail": {
          "url": "https://www.jbhifi.com.au/FileLibrary/ProductResources/Images/217367-L-LO.jpg"
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
            "value": "kicks the bot from the fucking voice channel or if it fucking breaks"
          },
          {
            "name": PREFIX + "sounds",
            "value": "plays a sounds from the finest of fucking sounds (QUEUEING DOES NOT WORK HERE YETtm) (1: good good cut got it great, 2: they got t, 3: fun fueled family fuel fun for the whole adventure family, 4: as nebble say brontasorus, 5: CHiPS!!!, 5.1:CHiPS!!!!, 6:ITS A FUN TIME, 7:i love babies, 8:that kid kicked sand in cool cats face, 9:three flavours of wine, 10:BUZZINGA"
          },
          {
            "name": PREFIX + "wolfjob",
            "value": "bestfriends.jpg"
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
            "value": "okay so this one was a right little bitch to do and requried to redo the entire command system on the bot. the command is music followed by either play or stop or skip or pause or resume. after the play command MUST be a youtube link, search might be coming soon, we will see. for example '`music play https://youtu.be/1suebohSF1w'. probs gonna change it up to work like th others"
          },
          {
            "name": PREFIX + "volume",
            "value": "holy fuck, using the very latest in volume6969 tech-fucking-nology theres a fucking volume command. your probably thinking, 'FUCK'. i know, fuck."
          }
        ]
      };
      message.channel.sendMessage(message.author + " i slid right into your fucking dms");
      message.author.sendMessage("a whhhholllle lotta help for you", {
        embed
      });
    }
  }
});

//Logs the bot in with a secret token
Bot.login(process.env.TOKEN);
