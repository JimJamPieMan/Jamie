 const Commando = require('discord.js');
 const Bot = new Commando.Client();
 //const config = require('/config.json');
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

 // Just setting up a default configuration object here, to have somethign to insert.
 const defaultSettings = {
   prefix: "`",
   modLogChannel: "mod-log",
   modRole: "Moderator",
   adminRole: "Administrator",
   welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
   volume: "10"
 }

 Bot.on("guildCreate", guild => {
   // Adding a new row to the collection uses `set(key, value)`
   settings.set(guild.id, defaultSettings);
 });

 Bot.on("guildDelete", guild => {
   // Removing an element uses `delete(key)`
   settings.delete(guild.id);
 });

 Bot.on("guildMemberAdd", member => {
   // This executes when a member joins, so let's welcome them!
   const guildConf = settings.get(member.guild.id);

   // Our welcome message has a bit of a placeholder, let's fix that:
   const welcomeMessage = guildConf.welcomeMessage.replace("{{user}}", member.user.tag)

   // we'll send to the default channel - not the best practice, but whatever
   member.guild.defaultChannel.send(welcomeMessage).catch(console.error);
 });

 Bot.on('ready', () => {

   Bot.user.setActivity("type fucking `help");

 })



 var servers = {};
 Bot.on("message", async message => {

   if (message.content.startsWith("ur mom gay")) {
     message.channel.send("no u");
   } else {

     const guildConf = settings.get(message.guild.id);

     // We also stop processing if the message does not start with our prefix.

     // This event will run on every single message received, from any channel or DM.

     // It's good practice to ignore other bots. This also makes your bot ignore itself
     // and not get into a spam loop (we call that "botception").
     if (message.author.bot) return;

     // Also good practice to ignore any message that does not start with our prefix,
     // which is set in the configuration file.
     if (message.content.indexOf(PREFIX) !== 0) return;

     // Here we separate our "command" name, and our "arguments" for the command.
     // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
     // command = say
     // args = ["Is", "this", "the", "real", "life?"]
     const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();

     // Let's go with a few common example commands! Feel free to delete or change those.
     //   var allCommands = ["pupper","kitty","feedback", "bob", "elf", "freedom", "fuck","fuckoff", "gtfo", "sounds", "info", "manesh","meme","music","wolfjob","help"];
     //
     // if(!command!=allCommands){
     //     message.reply("wow looks like we got a smart bitch over here, you think i know wverything eh? use `help for an actual command");
     // }
     // else{

     // if (command !== "pupper"||"kitty"||"feedback"||"bob"|| "elf"|| "freedom"|| "fuck"||"fuckoff"|| "gtfo"|| "sounds"|| "info"||"manesh"||"meme"||"music"||"wolfjob"||"help"||"volume"){
     //   message.channel.send("THAT SHIT DONT WORK WITH ME");
     // }
     //  else{

     if (command === "volume") {
       // Command is admin only, let's grab the admin value:


       const key = "volume";

       // Since we inserted an object, it comes back as an object, and we can use it with the same properties:
       if (!guildConf.hasOwnProperty(key)) return message.reply("This key is not in the configuration.");

       // Now we can finally change the value. Here we only have strings for values so we won't
       // bother trying to make sure it's the right type and such.


       //IF YOU FUKCING TOUCH THE NEXT LINE OF CODE I WILL PERSONALLY COMMIT RITUAL SEPPKU ON YOUR FRONT DOOR AND MAKE IT LOOK LIKE YOU DID IT
       var vol = args[0];
       guildConf[key] = vol;

       // Then we re-apply the changed value to the PersistentCollection
       settings.set(message.guild.id, guildConf);

       // We can confirm everything's done to the client.
       message.channel.send(`Guild configuration item ${key} has been changed to:\n\`${vol}\``);

     }

     // Now let's make another command that shows the configuration items.
     if (command === "showconf") {
       var config = guildConf.volume;
       message.channel.send(`this servers volume is fucking : \`\`\`${config}\`\`\``);
     }



     if (command === "pupper") {
       randomPuppy()
         .then(url => {
           message.reply("here is you dogger " + url);
         })



     }
     if (command === "kitty") {
       var url = randomCat.get();
       message.reply("here the fuck is is your kitty " + url + " (this is the actual shittest api ever)");
     }

     if (command === "feedback") {
       var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: 'jamesbotfeedback@gmail.com',
           pass: 'Astro12345@'
         }
       });
       var emailsender = message.author.username;

       console.log(args[0]);


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


     if (command === "bob") {

       message.reply("pls sned bob" + " https://imgur.com/a/iCv7s");
     }



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

     if (command === "freedom") {
       message.reply("<FREEDOM>'MURICA</FREEDOM>", {
         file: "freedom.txt"
       });

     }




     if (command === "fuck") {
       message.member.setVoiceChannel('354951906147434496');
       message.reply('Seeya you fuck');
     }



     if (command === "fuckoff") {
       var member = message.mentions.members.first();
       // Kick
       member.setVoiceChannel("354951906147434496").then((member) => {
         // Successmessage
         message.channel.send("you moved that fucker go you bitch ");
       }).catch(() => {
         // Failmessage
         message.channel.send("oopsy poopsie you got a moopsie");
       });
     }


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


     if (command === "info") {
       message.reply('i was made by <@201669657105530880>. he made so i swear alot so thats fucking good. if you need some fucking help just type "`help". thanks bicthesz');
     }

     if (command === "manesh") {
       message.channel.send("https://imgur.com/a/5yIzw");
       message.channel.send("https://imgur.com/a/5yIzw");
       message.channel.send("https://imgur.com/a/5yIzw");
       message.channel.send("https://imgur.com/a/5yIzw");
       message.channel.send("https://imgur.com/a/5yIzw");
       message.channel.send("https://imgur.com/a/5yIzw");
     }

     if (command === "meme") {
       getMemeUrls(args[0]).then(result => {
         message.reply(result[0] + " i am not gonna lie, this is a fucking shit meme, i havent even seen it i just fucking know");
       }).catch(err => {
         // handle err
         message.reply("whoops fuck went up and shit went down!")
       });
     }


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

             if (!servers[message.guild.id]) servers[message.guild.id] = {
               queue: []
             }
             var server = servers[message.guild.id];

             server.queue.push(args[1]);

             message.channel.sendMessage("i added that bitch to the queueueueuueueueueuueueueueu");

             if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message);
             });
             break;
           case "skip":
             var server = servers[message.guild.id];

             if (server.dispatcher) server.dispatcher.end();
             message.channel.sendMessage("i skipped that bitch just like skipping in primary school");
             break;

           case "stop":
             var server = servers[message.guild.id];

             if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
             message.channel.sendMessage("k. c u fagut");
             break;

           case "pause":
             var server = servers[message.guild.id];

             if (server.dispatcher) server.dispatcher.pause();
             message.channel.sendMessage("paused mother fukaaaaaaa");
             break;

           case "resume":
             var server = servers[message.guild.id];

             if (server.dispatcher) server.dispatcher.resume();
             message.channel.sendMessage("resumed mother fukaaaaaaa");
             break;


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

             if (server.queue[0]) play(connection, message);
             else connection.disconnect();
             message.channel.sendMessage("look at all those songs that just played");

           });

         }
       }
     }



     if (command === "wolfjob") {
       message.reply("because i started hosting this bot else where i feel that the image you require shouldn't be on the internet");
     }
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
 //Bot.registry.registerGroup('pupper', 'pupper');
 // Bot.registry.registerGroup('kitty', 'kitty');
 // Bot.registry.registerGroup('wolfjob', 'wolfjob');
 // Bot.registry.registerGroup('poll', 'poll');
 // Bot.registry.registerGroup('meme', 'meme');
 // Bot.registry.registerGroup('freedom', 'freedom');
 // Bot.registry.registerGroup('elf', 'elf');
 // Bot.registry.registerGroup('feedback', 'feedback');
 // Bot.registry.registerGroup('sounds', 'sounds');
 // Bot.registry.registerGroup('gtfo', 'gtfo');
 // Bot.registry.registerGroup('info', 'info');
 // Bot.registry.registerGroup('play', 'play');
 // Bot.registry.registerGroup('bob', 'bob');
 // Bot.registry.registerGroup('fuck', 'fuck');
 // Bot.registry.registerGroup('fuckoff', 'fuckoff');
 // Bot.registry.registerGroup('manesh', 'manesh');
 // Bot.registry.registerGroup('playtest', 'playtest');
 // // Bot.registry.registerGroup('pause', 'pause');






 // Bot.registry.registerDefaults();


 Bot.login(process.env.TOKEN);
