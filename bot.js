/*TODOlist
--Birthday command, yep, i know but its cool and it should be done
^^Json files with the id of the guild
^^that way in future if anything wants to be added it can
^^put the date in there as a date then when the bot turn on or off what ever it reculculates the seconds till that time. 
^^its gonna go off american time but oh well

bitrthdays,
          reminder channel:
              name:
              date,
                day:
                month:
Other data in the future

-- make the img results paginate so jack doesnt get angry

*/

//Sets up thr uptimerobot keeper upper
const express = require("express")
const expressApp = express()
expressApp.get("/", (req, res) => res.json("OK FAM"))
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
const Kaori = require('kaori');
const moreSites = require('./moreSites');
const getJSON = require('get-json');
const appendjson = require('appendjson');
const GoogleImages = require('google-images');
const figlet = require('figlet');
var Twitter = require('twitter');
var Tclient = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});
const pg = require('phrase-generator');
var youtubeUrl = require("youtube-url");
var Canvas = require('canvas');
var Image = Canvas.Image;
const http = require("http");
var PRequest = require('pixl-request');
const faceapp = require('faceapp');
const superagent = require('superagent');
const send = require('quick.hook');
var owjs = require('overwatch-js');
var jsonfile = require('jsonfile');
var shortid = require('shortid');
const {
  setLongTimeout,
  setLongInterval,

  clearLongTimeout,
  clearLongInterval
} = require('set-long-timeout')();
var request = require('request');
const Pxlsrt = require('pxlsrt');


//Setup the queue system for music
var servers = {};

const defaultSettings = {
  grantableRoles: [],
  nonPrefixed: true,
  prefix: "`",
  volume: "0.5"
}

//When the bot joins a server, make a new server settings for that server, sends a entyrance message and one to the owner
Bot.on("guildCreate", guild => {
  settings.set(guild.id, defaultSettings);
  guild.channels.find("name", "general").send("```Holy shit what fuck is up guys, its ya boi Jamie. '`' is the default prefix but that can be changed. If you forget the prefix just '@' me and say 'prefix'. If you want to know what I do just type `help and ill help you. BE FOREWARNED, I swear a lot.```");
  guild.owner.send("Hey there, based on my masters code, your the server owner of " + guild.name + ". There are a few things to note. I have/need a special role called 'Rue brick', it allows for the use of the mute, unmute, fuck, fuckoff. It doesn't need any special permissions, give it to the people that you regard as admins. For convinience I created the roles when I joined so you just gotta add it to people. Its up to you but i wouldn't make the Rue brick role grantable because shit could go heywire pretty fucking quick. I very much recommend that you use the help command in order to understand which ones need Rue brick and which ones don't. I hope you enjoy my existance. Thanks");
  guild.createRole({
      name: 'Rue brick',
      color: 'BLACK',
    })
    .catch(console.error);
  var json = {
    "serverData": {
      "warns": []
    }
  };
  json = JSON.stringify(json);
  fs.writeFileSync('./' + guild.id + '.json', json, (err) => {
    if (!err) {
      console.log('done');
    } else if (err) {
      console.log(err);
    }
  });
});

//When the bot leaves a server delete the server settings
Bot.on("guildDelete", guild => {
  settings.delete(guild.id);
  var serverDataFile = './' + guild.id + '.json';
  fs.unlinkSync(serverDataFile);
});

function sendReminder(time, channel, message, guild, pos) {
  var now = new Date();
  var countdown = (time - now.getTime());
  // will call function after 30 days
const timeoutId = setLongTimeout(() => { 
  channel.send(message);
    var serverDataFile = './' + guild + '.json';
    fs.readFile(serverDataFile, 'utf-8', (err, data) => {
      if (err) throw err;
      var obj = JSON.parse(data);
      obj.serverData.warns.splice(pos, 1);
      var json = JSON.stringify(obj);
      fs.writeFile(serverDataFile, json, 'utf-8',(err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
    });}, countdown);
// stop timeout with ID returned

}

//When the bot is turned on, set the activity
Bot.on('ready', () => {
  Bot.user.setUsername("Jamie");
  setInterval(function () {
    Bot.user.setActivity("`help || (v69)");
  }, 120000);
  
console.log("Started");

  const guildNames = Bot.guilds.map(g => g.id);
  for (var i = 0; i < guildNames.length; i++) {
    var serverDataFile = './' + guildNames[i] + '.json';
    var obj = fs.readFileSync(serverDataFile, 'utf-8');
    var serverSettingsobj = JSON.parse(obj);
    var guild = Bot.guilds.find("id", guildNames[i]);
    var guildChannels = guild.channels.map(chan => chan);
    var reminder_Channel = guildChannels.filter(channel => channel.id === serverSettingsobj.serverData.reminderChannel);
    if (serverSettingsobj.serverData.reminderChannel != "") {
      if (serverSettingsobj.serverData.reminders.length != 0) {
        for (var j = 0; j < serverSettingsobj.serverData.reminders.length; j++) {
          sendReminder(serverSettingsobj.serverData.reminders[j].reminder[0].time, reminder_Channel[0], serverSettingsobj.serverData.reminders[j].reminder[0].title, guildNames[i], j);
        }
      }
    }
  }
  
  
  
});

Bot.on('guildMemberAdd', (guildMember) => {
  if (guildMember.guild.id != process.env.SPITROASTid) {
    return;
  } else {
    guildMember.addRole(guildMember.guild.roles.find(role => role.name === "Spit Roast"));
    guildMember.guild.channels.find("name", "announcements").send("hey, send nudes " + guildMember);
    guildMember.send("hey welcome to " + guildMember.guild.name + ", make sure you read the rules plz. they are in <#440780606289477633>");
  }
});

//Meat and potatos
Bot.on("message", async message => {

  //Ignore dms with a reply
  if (message.channel.type === 'dm') {
    message.author.send("nope not here, sorry");
    return;
  }

  if (message.content.toLowerCase().startsWith("jamie say")) {
    message.channel.send(message.content.replace("jamie say", ""));
  }

  //Ignore all bots
  if (message.author.bot) {
    return;
  }

  //Get prefix for that guild
  const guildConf = settings.get(message.guild.id);
  var serverPrefix = guildConf.prefix;
  var PREFIX = serverPrefix;

  //Makes it so when the bot is tagged with the word prefix after it send the guilds prefix
  if (message.content.toLowerCase() === ("<@" + Bot.user.id + "> prefix")) {
    message.channel.send("this servers current prefix is " + "'" + guildConf.prefix + "'");
  }

  //Prefix reset cos yep
  if (message.content.toLowerCase() === ("<@" + Bot.user.id + "> prefixreset")) {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (message.member.roles.has(myRole.id)) {
      const key = "prefix";
      guildConf[key] = '`';
      settings.set(message.guild.id, guildConf);
      message.channel.send(" THE FUCKING PREFIX IS NOW " + '`');
    }
  }

  //HELP IVE FALLEN AND I NEED @SOMEONE
  if (message.content.toLowerCase().startsWith("@someone")) {
    
    let filter = m => m.user.bot===false,
botCount = message.guild.members.filter(filter);

    
    
        var guildUsers = botCount.map(m => m.user.id);


    var randomUser = Math.floor(Math.random() * guildUsers.length);
    message.channel.send(message.author + " has fallen and can't get up and cant get up and needs @someone. (" + "<@" + guildUsers[randomUser] + ">" + ")");
  }


  //if the condition is true do them things
  if (guildConf.nonPrefixed === true) {
    //yep
    if (message.content.toLowerCase().startsWith('ur mom gay')) {
      message.channel.send("no u");
    }

    //yep 2.0
    if (message.content.toLowerCase().startsWith('fuck me')) {
      if (message.content.toLowerCase().includes('please')) {
        message.channel.send("where do you live. ill be right there");
        return;
      }
      message.channel.send("only if you ask nicely");
    }

    //yep 3.0
    if (message.content.toLowerCase().startsWith('hmm')) {
      message.channel.send({files: ['https://i.imgur.com/Kj6GH8C.gif']});
    }

    //yep, the return
    
    if (message.content.toLowerCase().startsWith('haha')) {
      message.channel.send({files: ['https://i.imgur.com/b0NbvBR.jpg']});
    }

    //copypasta 1
    if (message.content.toLowerCase().startsWith('yep good')) {
      message.channel.send("Yep good. Less than a week notice. This is how to organise. I guess you don't really realise that people have jobs and yknow can't just be like yo can't go to work every time someone didn't give them enough time to book off time");
    }

    //copypasta 2
    if (message.content.toLowerCase().startsWith('kpop')) {
      message.channel.send("kpop is the definition of cheap computer generated music made by people who do not have any passion in music and are only concerned with the money and the publicity that comes along with it and it is insulting that people actually consider it to be something of quality when there is so much better stuff out there from people who are actually passionate and care about the music THEY ACTUALLY CREATE.");
    }

    //REEEEEEEE
    if (message.content.toLowerCase().includes('@everyone')) {
      message.channel.send({files: ['https://i.imgur.com/FTB2stB.gif']});
      return;
    }

    //funny reaction
    if (message.content.toLowerCase().includes(" dick ") || message.content.toLowerCase().includes(" penis ")) {
      message.react("🍆");
    }

    if (message.content.toLowerCase().includes(" arse ") || message.content.toLowerCase().includes(" bum ") || message.content.toLowerCase().includes(" ass ") || message.content.toLowerCase().includes(" anus ")) {
      message.react("🍑");
    }

    if (message.content.toLowerCase().includes(" smegma ")) {
      message.react("🧀");
    }

    if (message.content.toLowerCase().includes(" vagina ") || message.content.toLowerCase().includes(" pussy ")) {
      message.react("🥑");
    }
  }

  //Setup the prefix, commands and args
  if (message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command==="test"){
    //message.channel.send("beep boop");
    var url = args[0];
    if (!url) {
      message.channel.send("***hurrrr hurrrr GIVE LINK***");
      return;
    }
    var request = new PRequest();
    request.get(url, function (err, resp, data) {
      if (err) {
        message.channel.send("failed to meme");
        throw err;
      }
     
    console.log(data);
    Pxlsrt.read(data).then(image => {
  image.filter('brute', { min: 10, max: 20, method: 'saturation', direction: 'vertical' }).write("./output.png");
      message.channel.send({files:["./output.png"]});
});
      
    });
   
  }

  //meme
  if (command === "servericon") {
    var url = args[0];
    if (!url) {
      message.channel.send("***hurrrr hurrrr GIVE LINK***");
      return;
    }
    var request = new PRequest();
    request.get(url, function (err, resp, data) {
      if (err) {
        message.channel.send("failed to meme");
        throw err;
      }
      message.channel.send("why is this server such a fucking meme");
      message.guild.setIcon(data);
    });
  }

  //revoke a warn
  if (command === "revokewarn") {
    var serverDataFile = './' + message.guild.id + '.json';
    var revokedWarn = false;
    var id = args[0];
    if (!args[0]) {
      message.channel.send("No ID given to delete");
      return;
    }
    fs.readFile(serverDataFile, 'utf-8', (err, data) => {
      if (err) throw err;
      var obj = JSON.parse(data);
      for (var i = 0; i < obj.serverData.warns.length; i++) {
        if (obj.serverData.warns[i].warnID == id) {
          obj.serverData.warns.splice(i, 1);
          revokedWarn = true;
          message.channel.send("Warning revoked");
        }
      }
      if (revokedWarn == false) {
        message.channel.send("An error happened. (Invalid ID)");
        return;
      }
      var json = JSON.stringify(obj);
      fs.writeFile(serverDataFile, json, 'utf8', (err) => {
        if (err) throw err;
      });
    });
  }

  if (command === "warn") {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (!message.member.roles.has(myRole.id)) {
      message.channel.send("To quote Hamlet, Act III, Scene III, Line 87, 'No'.");
      return;
    }
    var serverDataFile = './' + message.guild.id + '.json';
    var user = message.mentions.members.first();
    if (!user) {
      message.channel.send("please mention a valid user");
      return;
    }
    args.shift();
    if (!args[0]) {
      message.channel.send("please give a reason");
      return;
    }
    var warnid = shortid.generate();
    var reason = args.join(" ");
    fs.readFile(serverDataFile, 'utf-8', (err, data) => {
      if (err) throw err;
      var warning = {
        warnID: warnid,
        person: user.id,
        reason: reason
      }
      var obj = JSON.parse(data); //now it an object
      obj.serverData.warns.push(warning);
      //add some data
      var json = JSON.stringify(obj);
      fs.writeFile(serverDataFile, json, 'utf8', (err) => {
        if (err) throw err;
      });
    });
    var data = fs.readFileSync(serverDataFile, 'utf-8');
    var amountOfWarns = 1;
    data = JSON.parse(data);
    for (var i = 0; i < data.serverData.warns.length; i++) {
      if (data.serverData.warns[i].person == user.id) {
        amountOfWarns++;
      }
    }
    if (amountOfWarns >= 6) {
      user.ban(reason);
      message.channel.send("User Banned");
    } else if (amountOfWarns >= 5) {
      message.channel.send(user + " One more warn and you are Banned");
    } else if (amountOfWarns >= 3) {
      user.kick(reason);
      message.channel.send("User Kicked");
    } else if (amountOfWarns >= 2) {
      message.channel.send(user + " One more warn and you are kicked");
    }
    const embed = {
      "title": "Warning given to " + user.user.username,
      "color": 9442302,
      "fields": [{
        name: "UserId: ",
        value: user.id
      }, {
        name: "WarnID: ",
        value: warnid
      }, {
        name: "Reason: ",
        value: reason
      }]
    };
    message.channel.send({
      embed
    });
  }

  //ser the reminder channel
  if (command === "setreminderchannel") {
    var serverDataFile = './' + message.guild.id + '.json';
    var reChannel = message.mentions.channels.first();
    if (!reChannel) {
      message.channel.send("Plase give a give a fuck the next time you type this command. i. fucking e give tag a proper channel");
      return;
    }
    fs.readFile(serverDataFile, 'utf-8', (err, data) => {
      if (err) throw err;
      var newData = reChannel.id;
      var obj = JSON.parse(data); //now it an object
      obj.serverData.reminderChannel = newData;
      //add some data
      var json = JSON.stringify(obj);
      fs.writeFile(serverDataFile, json, 'utf8', (err) => {
        if (err) throw err;
      });
    });
    message.channel.send("reminder channel set as " + reChannel);
  }

  //setreminder
  if (command === "setreminder") {
    var serverDataFile = './' + message.guild.id + '.json';
    var oneMinute = 60 * 1000;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;
    var dateString = args[0]; // Oct 23
    var dateParts = dateString.split("/");
    if (isNaN(dateParts[2]) || isNaN(dateParts[1] - 1) || isNaN(dateParts[0])) {
      message.channel.send("please use the DD/MM/YYY format like the cunts down under do");
      return;
    }
    var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    args.shift();
    var reminderMessage = args.join(" ");
    if (!args[0]) {
      message.channel.send("please inculde a message for the reminder you feathered fuck");
      return;
    }
    var now = new Date();
    var countdown = ((dateObject.getTime()) - (now.getTime()));
    console.log(countdown);
    if ((dateObject.getTime()) <= (now.getTime())) {
      message.channel.send("***YOU SILLY FUCK, TIME TRAVEL DOESN'T EXIST YET. #LEGALISETIMETRVEL***");
      return;
    }
    fs.readFile(serverDataFile, 'utf-8', (err, data) => {
      if (err) throw err;
      var newData = {
        "reminder": [{
          "title": reminderMessage,
          "time": dateObject.getTime()
        }]
      };
      var obj = JSON.parse(data);
      if (obj.serverData.reminderChannel == "") {
        message.channel.send("THERES NO REMINDER CHANNEL SET YOU FUCCCCCC");
        return;
      }
      //now it an object
      obj.serverData.reminders.push(newData);
      var json = JSON.stringify(obj);
      fs.writeFile(serverDataFile, json, 'utf-8', (err) => {
        if (err) throw err;
      });
    });
    var data = fs.readFileSync(serverDataFile, 'utf-8');
    var obj = JSON.parse(data);
    var guild = Bot.guilds.find("id", message.guild.id);
    var guildChannels = guild.channels.map(chan => chan);
    var reminder_Channel = guildChannels.filter(channel => channel.id === obj.serverData.reminderChannel);
    message.channel.send("i think you should be reminded in " + (countdown) + "ms. honestly not too sure. but if it does happen it will be in <#" + obj.serverData.reminderChannel + ">");
    
const timeoutId = setLongTimeout(() => { reminder_Channel[0].send(reminderMessage); }, countdown);

  }


  //Is this ? meme maker
  if (command === "isthis") {
    if (!args[0]) {
      message.channel.send("***WHAT DO YOU WANT TO SAYYYYYYYY?***");
      return;
    }
    message.channel.startTyping();
    var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2FScreen%20Shot%202018-05-18%20at%202.14.23%20pm.png?1526618698092";
    var canvasSizex = 1490;
    var canvasSizey = 1118;
    var questionPosx = (canvasSizex / 2) - 30;
    var questionPosy = 1060;
    var textSize = 70;
    var personPosx = (canvasSizex * 0.05);
    var personPosy = 900;
    var objectPosx = (canvasSizex * 0.72);
    var objectPosy = 490;
    var request = new PRequest();
    request.get(url, function (err, resp, data) {
      if (err) throw err;
      var img = new Image();
      img.src = data;
      var allText = args.join(" ");
      var arrStr = allText.split(/[;;]/);
      var questionToType = arrStr[1];
      var personToType = arrStr[3];
      var objectToType = arrStr[5];
      var canvas = new Canvas(canvasSizex, canvasSizey);
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvasSizex, canvasSizey);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.font = textSize + 'px Serif';
      var questiontext = ctx.measureText(questionToType);
      if (questiontext.width >= 806) {
        message.channel.stopTyping();
        message.channel.send("the question text was a little too long. (yours was '" + questiontext.width + "'. should be no longer than 806)");
        return;
      }
      ctx.fillText(questionToType, questionPosx, questionPosy);
      var persontext = ctx.measureText(personToType);
      if (persontext.width >= 459) {
        message.channel.stopTyping();
        message.channel.send("tthe person text was a little too long. (yours was '" + persontext.width + "'. should be no longer than 459)");
        return;
      }
      ctx.fillText(personToType, personPosx, personPosy);
      var objecttext = ctx.measureText(objectToType);
      if (objecttext.width >= 779) {
        message.channel.stopTyping();
        message.channel.send("the object text was a little too long. (yours was '" + objecttext.width + "'. should be no longer than 779)");
        return;
      }
      ctx.fillText(objectToType, objectPosx - (objecttext.width / 2), objectPosy);
      var img = canvas.toDataURL();
      var data = img.replace(/^data:image\/\w+;base64,/, "");
      var buf = new Buffer(data, 'base64');
      message.channel.send({
        files: [{
          attachment: buf,
          name: 'is this ' + questionToType + '.png'
        }]
      });
      message.channel.stopTyping();
    });
  }

  //test
  if (command === "impersonate") {
    args.shift();
    var textToSay = args.join(" ");
    var memberToImpersonate = message.mentions.users.first();
    var memberInGuild = message.guild.members.find('id', memberToImpersonate.id);
    var webName;
    if (memberInGuild.nickname == null) {
      webName = memberToImpersonate.username;
    } else {
      webName = memberInGuild.nickname;
    }
    send(message.channel, textToSay, {
      name: webName,
      icon: "https://cdn.discordapp.com/avatars/" + memberToImpersonate.id + "/" + memberToImpersonate.avatar + ".jpg?size=256"
    });
    message.delete();
  }

  //notsobot face commmands
  if (command === "makeup") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url);
    try {
      let image = await faceapp.process(body, 'makeup')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'makeup.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;

    }
  }

  if (command === "wave") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'wave')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'wave.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "glasses") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'glasses')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'glasses.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "bangs") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'bangs')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'bangs.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "hipster") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'hipster')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'hipster.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "goatee") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'goatee')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'goatee.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "lion") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'lion')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'lion.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "impression") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'impression')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'impression.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "heisenberg") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'heisenberg')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'heisenberg.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "hollywood") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'hollywood')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'hollywood.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "hitman") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'hitman')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'hitman.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "pan") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'pan')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'pan.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "male") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'male')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'male.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "female") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'female')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'female.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "female2") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'female_2')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'female2.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "young") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'young')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'young.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "old") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'old')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'old.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "hot") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'hot')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'hot.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "smile2") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'smile_2')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'smile2.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  if (command === "smile") {
    message.channel.startTyping();
    var url = args[0];
    let {
      body
    } = await superagent.get(url)
    try {
      let image = await faceapp.process(body, 'smile')
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: image,
          name: 'smile.png'
        }]
      });
    } catch (error) {
      message.channel.stopTyping();
      message.channel.send("hey your request was gay so i denied it (***NO FACE DETECTED***)");
      return;
    }
  }

  //franklin meme maker
  if (command === "franklinmeme") {
    if (!args[0] || isNaN(args[0])) {
      message.channel.send("what format you want fam?");
      return;
    }
    message.channel.startTyping();
    if (args[0] == 1) {
      var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2FfranklinStart.png?1524639941124";
      var canvasSizex = 1512;
      var canvasSizey = 1720;
      var textPosx = canvasSizex / 2;
      var textPosy = 400;
      var textSize = 100;
    } else if (args[0] == 2) {
      var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2F2.jpg?1524737776785";
      var canvasSizex = 679;
      var canvasSizey = 768;
      var textPosx = canvasSizex / 2;
      var textPosy = 215
      var textSize = 45;
    } else if (args[0] == 3) {
      var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2F6.jpg?1524737777661";
      var canvasSizex = 442;
      var canvasSizey = 500;
      var textPosx = canvasSizex / 2;
      var textPosy = 140
      var textSize = 30;
    } else if (args[0] == 4) {
      var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2F3.jpg?1524737777791";
      var canvasSizex = 528;
      var canvasSizey = 603;
      var textPosx = (canvasSizex / 2) + 40;
      var textPosy = 150
      var textSize = 30;
    } else if (args[0] == 5) {
      var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2F5.jpg?1524737777932";
      var canvasSizex = 595;
      var canvasSizey = 672;
      var textPosx = canvasSizex / 2;
      var textPosy = 185
      var textSize = 30;
    } else if (args[0] == 6) {
      var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2F4.jpg?1524737778067";
      var canvasSizex = 595
      var canvasSizey = 673
      var textPosx = (canvasSizex / 2) + 40;
      var textPosy = 180
      var textSize = 30;
    } else if (args[0] == 7) {
      var url = "https://cdn.glitch.com/2b634e95-77b4-4fe3-9baa-d2bd7480eaa5%2F1.jpg?1524737778383";
      var canvasSizex = 595
      var canvasSizey = 877
      var textPosx = canvasSizex / 2;
      var textPosy = 240
      var textSize = 35;
    }
    args.shift();
    var request = new PRequest();
    request.get(url, function (err, resp, data) {
      if (err) throw err;
      var img = new Image();
      img.src = data;
      var textToType = args.join(" ");
      var canvas = new Canvas(canvasSizex, canvasSizey);
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvasSizex, canvasSizey);
      ctx.fillStyle = 'rgba(39, 101, 142, 1)';
      ctx.font = textSize + 'px Serif';
      var text = ctx.measureText(textToType);
      if (text.width >= 1100) {
        message.channel.stopTyping();
        message.channel.send("thats too big for me if you know what i mean");
        return;
      }
      ctx.fillText(textToType, textPosx - (text.width / 2), textPosy);
      //var text = ctx.measureText(args.join(" "))
      var img = canvas.toDataURL();
      var data = img.replace(/^data:image\/\w+;base64,/, "");
      var buf = new Buffer(data, 'base64');
      message.channel.send({
        files: [{
          attachment: buf,
          name: 'franklin.png'
        }]
      });
      message.channel.stopTyping();
    });
  }

  //jack
  if (command === "jack") {
    message.channel.send("sorry your not being " + message.channel.name + " enough could not be a degenerate shit");
  }

  //tweet
  if (command === "tweet") {
    var tweet = args.join(" ");
    Tclient.post('statuses/update', {
      status: tweet
    }, function (error, tweet, response) {
      if (!error) {
        message.channel.send("***i stuffed your tweet through the tubes and it has arrived at the end***");
      } else if (error) {
        message.channel.send("soz fam couldnt sendddddd itttt");
        message.channel.send("``` Code:" + error[0].code + " Message:" + error[0].message + "```");
      }
    });
  }

  //porncomments
  if (command === "porncomments") {
    message.channel.startTyping();
    getJSON('https://www.reddit.com/r/pornhubcomments/.json', function (error, response) {
      if (response) {
        var randomOne = Math.floor(Math.random() * response.data.children.length);
        const embed = {
          "title": "nowShowingFunnyComment(" + response.data.children[randomOne].data.title + ")",
          "color": 9442302,
          "image": {
            "url": response.data.children[randomOne].data.url
          },
          "footer": {
            "text": "🔼 " + response.data.children[randomOne].data.ups
          }
        };
        message.channel.send({
          embed
        });
        message.channel.stopTyping();
      }
      if (error) {
        message.channel.send("An unkown error has afuckinghappended. dont contact me");
        message.channel.stopTyping();
      }
    });
  }

  //aww
  if (command === "aww") {
    message.channel.startTyping();
    getJSON('https://www.reddit.com/r/aww/.json', function (error, response) {
      if (response) {
        var randomOne = Math.floor(Math.random() * response.data.children.length);
        const embed = {
          "title": "nowShowingCuteThing(" + response.data.children[randomOne].data.title + ")",
          "color": 9442302,
          "image": {
            "url": response.data.children[randomOne].data.url
          },
          "footer": {
            "text": "🔼 " + response.data.children[randomOne].data.ups
          }
        };
        message.channel.send({
          embed
        });
        message.channel.stopTyping();
      }
      if (error) {
        message.channel.send("An unkown error has afuckinghappended. dont contact me");
        message.channel.stopTyping();
      }
    });
  }

  //sbubby
  if (command === "sbubby") {
    message.channel.startTyping();
    getJSON('https://www.reddit.com/r/sbubby/.json', function (error, response) {
      if (response) {
        var randomOne = Math.floor(Math.random() * response.data.children.length);
        const embed = {
          "title": "nowShowingSbubby(" + response.data.children[randomOne].data.title + ")",
          "color": 9442302,
          "image": {
            "url": response.data.children[randomOne].data.url
          },
          "footer": {
            "text": "🔼 " + response.data.children[randomOne].data.ups
          }
        };
        message.channel.send({
          embed
        });
        message.channel.stopTyping();
      }
      if (error) {
        message.channel.send("An unkown error has afuckinghappended. dont contact me");
        message.channel.stopTyping();
      }
    });
  }

  //Franklin from reddit
  if (command === "franklin") {
    message.channel.startTyping();
    getJSON('https://www.reddit.com/r/franklinstories/.json', function (error, response) {
      if (response) {
        var randomOne = Math.floor(Math.random() * response.data.children.length);
        const embed = {
          "title": "nowShowingFranklin(" + response.data.children[randomOne].data.title + ")",
          "color": 9442302,
          "image": {
            "url": response.data.children[randomOne].data.url
          },
          "footer": {
            "text": "🔼 " + response.data.children[randomOne].data.ups
          }
        };
        message.channel.send({
          embed
        });
        message.channel.stopTyping();
      }
      if (error) {
        message.channel.send("An unkown error has afuckinghappended. dont contact me");
        message.channel.stopTyping();
      }
    });
  }

  //list roles
  if (command === "listroles") {
    var configRoles = guildConf.grantableRoles;
    if (configRoles.length <= 0) {
      message.channel.send("TEHRE REA NOEN AHEHAHHAHAHAHHAH");
    } else {
      message.channel.send(configRoles);
    }
  }

  //add role to the list of roles avalible
  if (command === "addgrantablerole") {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (message.member.roles.has(myRole.id)) {
      let addgrantrole = message.mentions.roles.first();
      if (!addgrantrole) {
        message.channel.send("either i cant see it (perms) or it just plain old doesnt exist");
        return;
      }
      var configRoles = guildConf.grantableRoles;
      if (configRoles.includes(addgrantrole.id)) {
        message.channel.send("that ones already there fam, use " + PREFIX + "listroles to get a list of grantable roles");
        return;
      }
      const key = "grantableRoles";
      var configRoles = guildConf.grantableRoles;
      guildConf[key] = configRoles + addgrantrole;
      settings.set(message.guild.id, guildConf);
      message.channel.send("added as a grantable role");
    } else {
      message.channel.send("YOUR FUCKING GAY AS FUCKING PENIS");
    }
  }

  //remove role to the list of roles avalible
  if (command === "removegrantablerole") {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (message.member.roles.has(myRole.id)) {
      let removegrantrole = message.mentions.roles.first();
      if (!removegrantrole) {
        message.channel.send("either i cant see it (perms) or it just plain old doesnt exist");
        return;
      }
      var configRoles = guildConf.grantableRoles;
      if (!configRoles.includes(removegrantrole.id)) {
        message.channel.send("that ones already not there fam, use " + PREFIX + "listroles to get a list of grantable roles");
        return;
      }
      const key = "grantableRoles";
      var configRoles = guildConf.grantableRoles;
      var editedConfigRoles = configRoles.replace("<@&" + removegrantrole.id + ">", "");
      guildConf[key] = editedConfigRoles;
      settings.set(message.guild.id, guildConf);
      message.channel.send("removed as a grantable role");
    } else {
      message.channel.send("YOUR FUCKING GAY AS FUCKING PENIS");
    }
  }

  //remove role from the user
  if (command === "removerole") {
    let roleToRemove = message.mentions.roles.first();
    if (!roleToRemove) {
      message.channel.send("either that role doesnt exist or i dont have the perms to add to you either way, hope you die early");
      return;
    }
    if (!message.member.roles.has(roleToRemove.id)) {
      message.channel.send("you dont got this role fam");
      return;
    } else {
      message.member.removeRole(roleToRemove.id)
        .then(function () {
          message.channel.send("woah dude nice removal of the role");
          return;
        })
        .catch(function () {
          var err = console.error;
          message.channel.send("hey, that didnt work. (Perms?)");
          return;
        });
    }
  }

  //list of role colours
  if (command === "rolecolours") {
    message.channel.send("```" + ['DEFAULT', 'AQUA', 'GREEN', 'BLUE', 'PURPLE', 'GOLD', 'ORANGE', 'RED', 'GREY', 'DARKER_GREY', 'NAVY', 'DARK_AQUA', 'DARK_GREEN', 'DARK_BLUE', 'DARK_PURPLE', 'DARK_GOLD', 'DARK_ORANGE', 'DARK_RED', 'DARK_GREY', 'LIGHT_GREY', 'DARK_NAVY', 'RANDOM'].join("\n") + "```");
  }

  //create role
  if (command === "createrole") {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (message.member.roles.has(myRole.id)) {
      if (!message.guild.roles.map(g => g.name).includes(args[0])) {
        if (args[1].startsWith("#") || (['DEFAULT', 'AQUA', 'GREEN', 'BLUE', 'PURPLE', 'GOLD', 'ORANGE', 'RED', 'GREY', 'DARKER_GREY', 'NAVY', 'DARK_AQUA', 'DARK_GREEN', 'DARK_BLUE', 'DARK_PURPLE', 'DARK_GOLD', 'DARK_ORANGE', 'DARK_RED', 'DARK_GREY', 'LIGHT_GREY', 'DARK_NAVY', 'RANDOM', ]).includes(args[1])) {
          message.guild.createRole({
              name: args[0],
              color: args[1],
              mentionable: true
            })
            .then(role => message.channel.send(`Created new role with name ${role.name} and color ${role.color}`))
            .catch(console.error)

        } else {
          message.channel.send("whoa okay so um will colours can either be " + PREFIX + "rolecolours or hex values. use this site to help you be smart. https://www.hexcolortool.com/");
        }
      } else {
        message.channel.send("i think that one already exists");
      }
    } else {
      message.channel.send("***who are youuuuuu***");
    }
  }

  //addrole to the user
  if (command === "addroll") {
    let roleToAdd = message.mentions.roles.first();
    if (!roleToAdd) {
      message.channel.send("either that role doesnt exist or i dont have the perms to add to you either way, hope you die early");
      return;
    }
    var configRoles = guildConf.grantableRoles;
    if (!configRoles.includes(roleToAdd.id)) {
      message.channel.send("yeah nah yeah nah yeah nah yeah nah yeah nah yeah nah yeah nah yeah nah thats not on the list, use " + PREFIX + "listroles to get a list of grantable roles");
      return;
    }
    if (message.member.roles.has(roleToAdd.id)) {
      message.channel.send("you already got this on fam");
      return;
    } else {
      message.member.addRole(roleToAdd.id)
        .then(function () {
          message.channel.send("woah dude nice addition of the role");
          return;
        })
        .catch(function () {
          var err = console.error;
          message.channel.send("hey, that didnt work. (Perms?)");
          return;
        });
    }
  }

  //delete role from the guild
  if (command === "deleterole") {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (message.member.roles.has(myRole.id)) {
      if (!message.mentions.roles.first()) {
        message.channel.send("you might want to give me a role to delete (just tag it!)");
        return;
      }
      var roleToDelete = message.mentions.roles.first();
      if (!roleToDelete) {
        message.channel.send("either that role doesnt exist or i dont have the perms to add to you either way, hope you die early");
        return;
      }
      message.channel.send("reply with either Yes or No to confirm, This role will also be removed from the grantable roles list. you've got ten seconds, GO QUICK BITCH (case sensitive)");
      const filter = m => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, {
        maxMatches: 1,
        time: 10000
      });
      collector.on('collect', (msg, collected) => {
        if (msg.content == "Yes") {
          message.channel.send("Yeah alright i can do that i can delete " + roleToDelete + " for you.");
          const key = "grantableRoles";
          var configRoles = guildConf.grantableRoles;
          var editedConfigRoles = configRoles.replace("<@&" + roleToDelete.id + ">", "");
          guildConf[key] = editedConfigRoles;
          settings.set(message.guild.id, guildConf);
          setTimeout(function () {
            roleToDelete.delete();
          }, 100);
        } else if (msg.content == "No") {
          message.channel.send("all g fam i know exactly how it feels not wanting to delete something. i wont delete " + roleToDelete);
        }
      });
      collector.on('end', collected => {
        if (collected.find("content", "Yes")) {
          message.channel.send("just confirming you deleted " + roleToDelete);
        } else if (collected.find("content", "No")) {
          message.channel.send("time ran out i think " + roleToDelete);
        } else {
          message.channel.send("time ranout bitch, better luck next time");
        }
      });
    } else {
      message.channel.send("***who are youuuuuu***");
    }
  }

  //Refresh enmap settings without having to leave and rejoin a guild
  if (command === "enmaprefresh") {
    if (message.author.id !== process.env.myID) {
      message.channel.send(message.author + " ***woah, dude this is a serious command***");
      var badPerson = message.author;
      Bot.fetchUser(process.env.myID)
        .then(user => {
          user.send("Someone tried to use the enmaprefresh command. They were warned " + badPerson + " in " + message.guild.name)
        })
      return;
    }
    message.author.send("enmaprefresh command used by you");
    Bot.guilds.forEach(guild => {
      settings.delete(guild.id);
    });
    setTimeout(function () {
      Bot.guilds.forEach(guild => {
        settings.set(guild.id, defaultSettings);
      });
      message.channel.send("***Enmap refreshed on all " + Bot.guilds.size + " servers***");
    }, 1000);
  }

  //toggle the nonprefixed commands
  if (command === "nonptoggle") {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (message.member.roles.has(myRole.id)) {
      const key = "nonPrefixed";
      if (guildConf.nonPrefixed === true) {
        guildConf[key] = false;
        settings.set(message.guild.id, guildConf);
        message.channel.send("toggled that shit off");
        return;
      }
      if (guildConf.nonPrefixed === false) {
        guildConf[key] = true;
        settings.set(message.guild.id, guildConf);
        message.channel.send("toggled that shit on");
        return;
      }
    } else {
      message.channel.send("***HEY you cant push my buttons, only more powerful people can***");
    }
  }

  //transforms text to ascii
  if (command === "texttoascii") {
    var text = args.join(" ");
    if (text.length > 21) {
      message.channel.send("hey man soz but that aint gonna work, its gonna have to be less than 21 characters. your last one was " + text.length + ". so just cut it down a bit and about now i realised this was a really long error message so i just kept going ahhahaahahahhah i need help because this command is actually broke af");
    } else {
      figlet(text, function (err, data) {
        if (err) {

          message.channel.send("***WHOOPS***");
          console.dir(err);
          return;
        }
        message.channel.send("```" + data + "```");
      });
    }
  }

  //ping pong but with discord
  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(Bot.ping)}ms`);
  }

  //yay google img search cos thats original
  if (command === "img") {
    message.channel.startTyping();
    const client = new GoogleImages(process.env.CSEID, process.env.youtubeapi);
    var searchTerm = args.join(" ");
    if (!args[0]) {
      message.channel.send("no search term? wow, you must be feeling lucky");
      return;
    }
    client.search(searchTerm)
      .then(function (images) {
        var randomOne = Math.floor(Math.random() * images.length);
        const embed = {
          "title": "Images()",
          "color": 9442302,
          "footer": {
            "text": images[randomOne].type
          },
          "image": {
            "url": images[randomOne].url
          },
        };
        message.channel.send({
          embed
        });
      }).catch(function (err) {

        message.channel.send("shit got fucked up (your search term was shit)");
      });
    //       const refresh = await message.channel.send("beep boop");
    //       await refresh.react(`🔄`);
    //       const filterref = (reaction) => reaction.emoji.name === '🔄';
    //       const collectorref = refresh.createReactionCollector(filterref, {
    //         time: 15000
    //       });
    //       collectorref.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    //collectorref.on('end', );
    message.channel.stopTyping();
  }

  //random shopper
  if (command === "shopper") {
    message.channel.startTyping();
    const client = new GoogleImages(process.env.CSEID, process.env.youtubeapi);
    client.search('people shopping')
      .then(images => {
        var randomOne = Math.floor(Math.random() * images.length);
        const embed = {
          "title": "randomShopper()",
          "color": 9442302,
          "footer": {
            "text": images[randomOne].type
          },
          "image": {
            "url": images[randomOne].url
          },
        };
        message.channel.send({
          embed
        });
        message.channel.stopTyping();
      }).catch(function (err) {
        message.channel.send("shit got fucked up which is funny because its a hardcoded string but oh well");
      });
  }

  //gives an invite for the bot
  if (command === "invite") {
    var name = encodeURI(message.guild.name);
    var sprefix = encodeURI(PREFIX);
    message.channel.send("heres my number. call me! https://discordapp.com/oauth2/authorize?client_id=354163126947807242&scope=bot&permissions=288545856");
  }

  //shows you my guts
  if (command === "github") {
    message.channel.send("I exist on github so you can copy my guts and do what ever you want. (if you do, just a little credit will do)");
    message.channel.send("https://github.com/JimJamPieMan/james-bot");
  }

  //shows you all my friends, just waiting on an oauth2
  if (command === "botfriends") {
    message.channel.send("i have friends, i just dont have their deets yet @faye");
  }

  //hmmmmmm
  if (command === "rule34") {
    if (message.channel.nsfw || message.channel.name.includes("nsfw")) {
      if (!args[0]) {
        message.channel.send("add some words to search idiot. (usage: rule34 <tag1> <tag2> <tag3>) tags 2 & 3 are optional but 1 must be there");
        return;
      } else {
        message.channel.startTyping();
        const kaori = new Kaori(moreSites);
        kaori.search('rule34', {
            tags: [args[0], args[1], args[2]],
            limit: 1000,
            random: false
          })
          .then(function (images) {
            var randomOne = Math.floor(Math.random() * images.length);
            const embed = {
              "title": "randomSearchResult(" + args[0] + ", " + args[1] + ", " + args[2] + ")",
              "color": 9442302,
              "footer": {
                "text": "score '" + images[randomOne].score + "'"
              },
              "image": {
                "url": images[randomOne].file_url
              },
            };
            message.channel.send({
              embed
            });
            message.channel.stopTyping();
          })
          .catch(function (err) {
            console.error(err);
            message.channel.send("hey that doesn't work, sorry");
            message.channel.stopTyping();
          });
      }
    } else {
      message.channel.send("***nope not here family bamily***");
    }
  }

  //Command for changing prefix
  if (command === "prefix") {
    let myRole = message.guild.roles.find("name", "Rue brick");
    if (message.member.roles.has(myRole.id)) {
      const key = "prefix";
      if (!guildConf.hasOwnProperty(key)) return message.channel.send(message.author + " well ill be fucked as to how you got this error");
      var pre = args[0];
      if (!args[0]) {
        message.channel.send(message.author + " could you try that again. *F O R  F U C K  S A K E*");
        return;
      }
      if (args.length >= 2) {
        message.channel.send("you can only set one prefix, cuck");
        return;
      }
      if (pre === "<@" + Bot.user.id + ">") {
        message.channel.send("hey. stop that. you cant sent the prefix that man");
        return;
      }
      let member = message.mentions.members.first();
      if (member) {
        message.channel.send("it would be pretty shit if you did that now wouldnt it");
        return;
      } else {
        guildConf[key] = pre;
        settings.set(message.guild.id, guildConf);
        message.channel.send(" THE FUCKING PREFIX IS NOW " + pre);
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
            message.channel.send(message.author + " maybe try another search term for your sick videos");
            message.channel.stopTyping();
          });
      }
    } else {
      message.channel.send("soz fam cant use that here. go do your weird shit in the nsfw channel. there might be kids watching");
    }
  }

  //democracy in action
  if (command === "poll") {
    if (!args) return message.channel.send(message.author + " You must have something to vote for!")
    if (!message.content.includes("?")) return message.channel.send(message.author + " Include a ? in your vote!")
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

  //Bentley
  if (command === "bentley") {
    let dataObj = JSON.parse(fs.readFileSync("./data.json", "utf8"));
    var dataBentley = Math.floor(Math.random() * dataObj.bentley.length);
    const embed = {
      "title": "nowShowingBentley()",
      "color": 9442302,

      "image": {
        "url": dataObj.bentley[dataBentley]
      },
    };
    message.channel.send({
      embed
    });
  }

  //Maggie
  if (command === "maggie") {
    let dataObj = JSON.parse(fs.readFileSync("./data.json", "utf8"));
    var dataMaggie = Math.floor(Math.random() * dataObj.maggie.length);
    const embed = {
      "title": "nowShowingMaggie()",
      "color": 9442302,

      "image": {
        "url": dataObj.maggie[dataMaggie]
      },
    };
    message.channel.send({
      embed
    });
  }

  //Gives a random sex thing (idk)
  if (command === "funnysexthing") {
    let dataObj = JSON.parse(fs.readFileSync("./data.json", "utf8"));
    var dataSaying = Math.floor(Math.random() * dataObj.saying.length);
    message.channel.send(dataObj.saying[dataSaying]);
  }

  //Gives a random sleep thing (idk)
  if (command === "funnysleepthing") {
    let dataObj = JSON.parse(fs.readFileSync("./data.json", "utf8"));
    var dataSaying = Math.floor(Math.random() * dataObj.sleep.length);
    message.channel.send(dataObj.sleep[dataSaying]);
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
    if (!guildConf.hasOwnProperty(key)) return message.channel.send(message.author + " well ill be fucked as to how you got this error");
    var vol = args[0];
    if (!args[0] || isNaN(args[0])) {
      message.channel.send(message.author + " could you try that again. *F O R  F U C K  S A K E*");
    } else {
      guildConf[key] = vol;
      settings.set(message.guild.id, guildConf);
      message.channel.send("THE FUCKING VOLUME IS NOW " + vol);
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
    message.channel.startTyping();
    getJSON('https://random.dog/woof.json?filter=mp4,webm', function (error, response) {
      if (response) {
        var pupperUrl = response.url;
        const embed = {
          "title": "nowShowingDogger()",
          "color": 9442302,
          "image": {
            "url": pupperUrl
          }
        };
        message.channel.send({
          embed
        });

        message.channel.stopTyping();
      }
      if (error) {

        message.channel.send("***ERRORRORRRORRORRRRR***");
        message.channel.stopTyping();
      }
    });
  }

  //Sends a random kitty
  if (command === "kitty") {
    message.channel.startTyping();
    getJSON('http://aws.random.cat/meow', function (error, response) {
      if (response) {
        var catUrl = response.file;
        const embed = {
          "title": "nowShowingKitty()",
          "color": 9442302,
          "image": {
            "url": catUrl
          }
        };
        message.channel.send({
          embed
        });

        message.channel.stopTyping();
      }
      if (error) {

        message.channel.send("***ERRORRORRRORRORRRRR*** (yes i am well aware this is broken)");
        message.channel.stopTyping();
      }
    });
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
      message.channel.send(message.author + " you might want to add some fucking text you fuck");
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
          message.channel.send(message.author + " well fuck it didnt work maybe gove it another fucking hot");
          message.channel.stopTyping();
        } else {
          message.channel.send(message.author + " Your fucking feedback was sent so thats fucking great");
          message.channel.stopTyping();
        }
      });
    }
  }

  //Sends a picture of bob the builderhttps://imgur.com/a/iCv7s
  if (command === "bob") {
    message.channel.send(message.author + " pls sned bob",{files: ['https://i.imgur.com/a/iCv7s.jpg']});
  }

  //Makes an elf on the shelf meme
  if (command === "elf") {
    SyllaRhyme(function (sr) {
      var rword = randomWords();
      var words = sr.rhymes(rword);
      var randomAnswer1 = words[Math.floor(Math.random() * words.length)];
      var randomAnswer2 = words[Math.floor(Math.random() * words.length)];
      message.channel.send(message.author + " You've heard of elf on a shelf. Now get ready for " + randomAnswer1 + " on a " + randomAnswer2);
    })
  }

  //Sends the declaration of independance
  if (command === "freedom") {
    message.channel.send(message.author + " <FREEDOM>'MURICA</FREEDOM>", {
      file: "freedom.txt"
    });
  }

  //Moves you a predetermined channel
  if (command === "fuck") {
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
    message.channel.send(message.author + " Seeya you fuck");
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
    if (!message.member.voiceChannel) {
      message.channel.send("nah not happening");
      return;
    }
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.disconnect();
    } else
      message.channel.send("I ain't even in a channel and u tryna kick me. maaan fuck you");

  }

  //Men
  if (command === "men") {
    message.channel.send({files: ['https://i.imgur.com/189DJI3.jpg']});
    message.channel.send({files: ['https://i.imgur.com/189DJI3.jpg']});
    message.channel.send({files: ['https://i.imgur.com/189DJI3.jpg']});
    message.channel.send({files: ['https://i.imgur.com/189DJI3.jpg']});
    message.channel.send({files: ['https://i.imgur.com/189DJI3.jpg']});
    message.channel.send({files: ['https://i.imgur.com/189DJI3.jpg']});
    
  }

  //Sends 5 pictures of a random Indian man a friend found
  if (command === "manesh") {
    message.channel.send({files: ['https://i.imgur.com/YZp0vDp.jpg']});
     message.channel.send({files: ['https://i.imgur.com/YZp0vDp.jpg']});
     message.channel.send({files: ['https://i.imgur.com/YZp0vDp.jpg']});
     message.channel.send({files: ['https://i.imgur.com/YZp0vDp.jpg']});
     message.channel.send({files: ['https://i.imgur.com/YZp0vDp.jpg']});
     message.channel.send({files: ['https://i.imgur.com/YZp0vDp.jpg']});
    
  }

  //Sends a meme
  if (command === "meme") {
    var searchTerm = args.join(" ");
    message.channel.startTyping();
    getMemeUrls(searchTerm).then(result => {
      var randomOne = Math.floor(Math.random() * result.length);
      const embed = {
        "title": "nowShowingMeme()",
        "color": 9442302,
        "image": {
          "url": result[randomOne]
        }
      };
      message.channel.send({
        embed
      });
      message.channel.stopTyping();
    }).catch(err => {
      message.channel.send(message.author + " whoops fuck went up and shit went down!");
      message.channel.stopTyping();
    });
  }

  //music function
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
      let dataObj = JSON.parse(fs.readFileSync("./data.json", "utf8"));
      var dataFooter = Math.floor(Math.random() * dataObj.saying.length);
      const embed = {
        "title": "nowPlaying() " + "'" + videoInfo.title + "'",
        "description": normalDes,
        "color": 9442302,
        "footer": {
          "text": dataObj.saying[dataFooter]
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
        if (!command === "stop") {
          message.channel.send("i am playing the next song in the queue motherfuckerrrrrr");
        }
      } else {
        connection.disconnect();
        message.channel.send("k. done");
      }
    });
  }

  //Plays music, pretty simple
  if (command === "play") {
    if (!message.member.voiceChannel) {
      message.channel.send("if you want to hear me get in a fucking voice channel you cuck");
      return;
    }
    if (!args[0]) {
      message.channel.send(message.author + " ***FEED ME either a youtube url or search term***");
      return;
    }
    if (message.content.includes("http://") || message.content.includes("https://")) {
      if (message.content.includes("youtube") || message.content.includes("youtu.be")) {
        if (youtubeUrl.valid(args[0]) == false) {
          message.channel.send("not a proper youtube link you bitch");
          return;
        }
        if (!servers[message.guild.id]) {
          servers[message.guild.id] = {
            queue: []
          }
        }
        var server = servers[message.guild.id];
        server.queue.push(args[0]);
        message.channel.send("i added that bitch to the queueueueuueueueueuueueueueu");
        if (!message.guild.voiceConnection) {
          message.member.voiceChannel.join().then(function (connection) {
            play(connection, message);
          }).catch(err => {
            console.log(err);
            message.channel.send(message.author + " i cant play for some reason, hmm. (check if my permissions are okay)");
          });
        }
      } else {
        message.channel.send(message.author + ' only youtube links are allowed you fucking fucccck');
      }
    } else {
      var opts = {
        maxResults: 50,
        key: process.env.youtubeapi,
        type: 'video'
      };
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
  }

  //skips music
  if (command === "skip") {
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.end();
      message.channel.send("i skipped that bitch just like skipping in primary school");
    }
  }

  //stops music
  if (command === "stop") {
    var server = servers[message.guild.id];
    if (message.guild.voiceConnection) {
      server.queue = [];
      message.guild.voiceConnection.disconnect();
    }
  }

  //pauses music
  if (command === "pause") {
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.pause();
      message.channel.send("paused mother fukaaaaaaa");
    }
  }

  //resumes music
  if (command === "resume") {
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.resume();
      message.channel.send("resumed mother fukaaaaaaa");
    }
  }

  //Sends a link to a wesite with javascript url vars to customise it abit more
  if (command === "help") {
    var name = encodeURI(message.guild.name);
    var sprefix = encodeURI(PREFIX);
    message.channel.send("heres all my commands for ya bitch, https://myywebsite.glitch.me/html/jamie.html?servername=" + name + "&prefix=" + sprefix);
  }
});

//Logs the bot in with a secret token
Bot.login(process.env.TOKEN); 





//defunct commands

//     if (command==="join"){
//       if (!message.member.voiceChannel) {
//           message.channel.send("if you want to hear me get in a fucking voice channel you cuck");
//           return;
//         }
//       if (!message.guild.voiceConnection) {
//               message.member.voiceChannel.join() .then(connection => {
//        const voiceReceiver = connection.createReceiver();
//       connection.on('speaking', (user, speaking) => {
//                 if (speaking) {
//                     console.log("listen on");
//                     let fileStream = fs.createWriteStream('./audiotest.opus');
//                     let audioStream = voiceReceiver.createOpusStream(user);

//                     audioStream.pipe(fileStream);

//                     audioStream.on('end', () => {
//                         console.log("listen off");
//                         fileStream.end();
//                     });
//                 }
//             });
//     });
//       }
//     }


//     if (command==="leave"){
//       if (message.guild.voiceConnection) {
//           message.guild.voiceConnection.disconnect();
//         }
//     }
  
//   if (command==="download"){
//       var file = fs.createWriteStream("soundsfile.mp3");
// var request = http.get("http://cdn.glitch.com/ed065e92-daf8-4718-90ec-7b7d3c3337ce%2F7.mp3?1518669335850", function(response) {
//   response.pipe(file);
// });
   

//   }


  //Used to play local mp3 files from the server before it was moved to a different hosting service
//   if (command === "sounds") {
   
    
//     var voiceChannel = message.member.voiceChannel;
//       if (!voiceChannel){
//           return message.reply("if you want to hear fucking sounds get in a fucking channel");
//         }
//               else if (args[0] === "" || isNaN(args[0])){
//                 message.reply("for fuck sake what the fuck do you want me to play. (1: good good cut got it great, 2: they got t, 3: fun fueled family fuel fun for the whole adventure family, 4: as nebble say brontasorus, 5: CHiPS!!!, 5.1:CHiPS!!!!, 6:ITS A FUN TIME, 7:i love babies, 8:that kid kicked sand in cool cats face, 9:three flavours of wine");
//         }
//         else{
//           var soundtoplay = args[0].toString();
      




// var file = fs.createWriteStream("file.jpg");
// var request = http.get("http://cdn.glitch.com/ed065e92-daf8-4718-90ec-7b7d3c3337ce%2F"+soundtoplay+".mp3?1518669335850", function(response) {
//   response.pipe(file);
// });
//            message.channel.sendMessage('i joined your fucking channel  (do not do the sounds command again because i havent done the queue code yet and its proving to be a lil bitch. thanks, love james)');
//          voiceChannel.join().then(connection => {
//              console.log(file);
           
       
//              const dispatcher = connection.playFile(file);
      
             
//              dispatcher.on("end", end => {
//                  console.log("left channel");
//                  message.channel.sendMessage("either the song ended and i left or some fucker didnt read the above message and did the command again. either way fuck you");
//                  voiceChannel.leave();
//              });
//          }).catch(err => console.log(err));
//        }
//   }
