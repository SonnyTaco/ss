const Discord = require('discord.js');

const reaction = require('reaction');

const {prefix , token} = require('./config.json');

const ms = require('ms');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']})
const fs = require('fs');
const toHex = require('colornames');
const partial = require('partial');

const fetch = require('node-fetch');
const querystring = require('querystring');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('ready', async () => {
  console.log(`SonnyTaco Is Online!`)

  function changing_status() {
      let status = [`In 2 server!`, `Coded by SonnyTaco#5393`, `51 total member`, `version 10.0`] // You can change these or add some!
      let randomStatus = status[Math.floor(Math.random() * status.length)]
      client.user.setActivity(randomStatus, {
          type: "PLAYING"
      });
  }
  setInterval(changing_status, 5000)
  const guild = client.guilds.cache.get('729981279944048663')

  const userCountChannel = guild.channels.cache.get('746599656733278258')
  const userCount = guild.members.cache.filter(member => !member.user.bot).size
  userCountChannel.setName(`Member: ${userCount}`)

  const botCountChannel = guild.channels.cache.get('746599925319598102')
  const botCount = guild.members.cache.filter(member => member.user.bot).size
  botCountChannel.setName(`Bot: ${botCount}`)

  const memberCountChannel = guild.channels.cache.get('746601035707187200')
  const memberCount = guild.members.cache.size
  memberCountChannel.setName(`All member: ${memberCount}`)
});
//mesage
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    var usedCommandRecently = new Set();

    if(command === 'angry'){
        message.channel.send('https://tenor.com/view/mimi-cute-anime-tap-gif-15633073')
    }
    if(command === 'danger'){
        message.channel.send('https://tenor.com/view/anime-chainsaw-loli-girl-mad-gif-10166732');
    }
    if(command === 'eat'){
        message.channel.send('https://tenor.com/view/eating-anime-gif-14083074');
    }
    if(command === 'dcm'){
        message.channel.send('https://tenor.com/view/anime-gif-9509158');
    }
    if(command === 'face'){
      message.channel.send('https://cdn.discordapp.com/attachments/741581211096580178/744804840630124626/mat_Fire.png')
    }
    if(command === 'vn') {
      message.channel.send('https://cdn.discordapp.com/emojis/745291546462519387.png?v=1')
    }
    if(command === 'vn1'){
      message.channel.send('https://cdn.discordapp.com/attachments/737187615060787252/746325260391153684/hqdefault.jpg')
    }
    if(command === 'rule')(
      message.channel.send('Do NOT ping staff members just because you need help, unless their directly helping you already they will help you when they have time')
    )
    if(command === 'lotto'){
      if (usedCommandRecently.has(message.author.id)) {
          message.reply('You have already played the lottery! Come back in 5 hours to play again! :x:')
      } else {
          var numbers = 0;
          numbers = Math.floor(Math.random() * 100000000000)
          message.reply(`Your numbers are ${numbers}! Wait until someone annouces the winning numbers!`)
    
          usedCommandRecently.add(message.author.id);
          setTimeout(() => {
              usedCommandRecently.delete(message.author.id);
          }, 1.8e+7);
      }
    
    }
    if(command === 'purge'){
      if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("You can not use this command!")
    
      if (isNaN(args[0])) return message.channel.send('**Please supply a valid amount of messages to purge**');
      if (args[0] > 100) return message.channel.send('**Please supply a number less than 100**');
   
      message.channel.bulkDelete(args[0])
           .then( message => message.channel.send('**Deleted Messages**'));
   
      
    }
});
// Create an event listener for messages
client.on('message', message => {
    
    if (message.content.startsWith(`${prefix}avatar`)) {
      const args = message.content.substring(prefix.length).split(" ")
            let text = args.slice(1).join(" ")
            let avatar = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}`)
                .setColor('00D0F9')
                .setDescription('enjoy')
                .setImage(message.author.displayAvatarURL())
            message.channel.send(avatar)
    }
});
//memes
client.on('message', async message => {
  if (message.content.startsWith(`${prefix}meme`)) {
      const api = require('imageapi.js')
      let subreddits = ["dank","memes"];
      let subreddit =
          subreddits[Math.floor(Math.random() * subreddits.length)];
      let img = await api(subreddit, true);
      const meme = new Discord.MessageEmbed()
          .setTitle(`A meme from sonnytaco`)
          .setURL(`https://reddit.com/r/${subreddit}`)
          .setColor('00D0F9')
          .setImage(img);
      message.channel.send(meme);
  }
  if (message.content.startsWith(`${prefix}ping`) || message.content.startsWith(`${prefix}ms`)) {
      message.channel.send(`🏓 Pinging....`).then((msg) => {
          const _ = new Discord.MessageEmbed()
              .setTitle("Pong!")
              .setDescription(
                  `🏓 Pong!\nLatency is ${Math.floor(
                msg.createdTimestamp - message.createdTimestamp
              )}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`
              )
              .setColor("00D0F9");
          msg.edit(_);
          msg.edit("\u200B");
      })
  }
})
//when your bot join server
client.on('guildCreate', guild => {
  let channelID
      let channels = guild.channels.cache
      channelLoop:
      for (let c of channels) {
        let channelType = c[1].type
        if (channelType === "text") {
            channelID = c[0]
            break channelLoop
          }
      }  
      let channel = client.channels.cache.get(guild.systemChannelID || channelID)

      var wellcome = new Discord.MessageEmbed()
      .setTitle('SonnyTaco\'s bot has joined the server')
      .setColor('00D0F9')
      .setDescription('This bot is coded by SonnyTaco#5393')
      channel.send(wellcome)
});
//role add
client.on('guildMemberAdd', member => {
  member.roles.add('741656773961842698')
})
//hatebins
client.on("message", message =>  {
  let args = message.content.substring(prefix.length).split(" ");
  
  switch(args[0]){
    case 'bins':

      let text = args.slice(1).join(" ")
      let embed = new Discord.MessageEmbed()
          .setColor('00D0F9')
          .setDescription('when share long code snippets please use bins such as: https://www.hatebin.com/')
      message.channel.send(embed)
      break;


  }
})

//covid 19
const covid = require("novelcovid");

client.on('message', async message => {
  if (message.content.startsWith(`${prefix}covid19`)) {

    const covidStats = await covid.all()
    const api = require('novelcovid')
    api.countries({country:'vietnam'}).then(console.log)
    return message.channel.send(new Discord.MessageEmbed()
     .setTitle('Covid19 Stats')
     .setColor('00D0F9')
     .addFields(
      { name: `Cases`, value: covidStats.cases.toLocaleString(), inline: true},
      { name: `Cases Today`, value: covidStats.todayCases.toLocaleString(), inline: true},
      { name: `Deaths`, value: covidStats.deaths.toLocaleString(), inline: true},
      { name: `Deaths Today`, value: covidStats.todayDeaths.toLocaleString(), inline: true},
      { name: `Recovered`, value: covidStats.recovered.toLocaleString(), inline: true},
      { name: `Recovered Today`, value: covidStats.todayRecovered.toLocaleString(), inline: true},
      { name: `Infected Right Now`, value: covidStats.active.toLocaleString(), inline: true},
      { name: `Critical Condition`, value: covidStats.critical.toLocaleString(), inline: true},
      { name: `Tested`, value: covidStats.tests.toLocaleString(), inline: true},
     )
    )
  }
})
//ticket
let ticket = new Map();

client.on('message', async message => {
  const ticketChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `${message.author.username}-ticket`.toLowerCase())
  if(message.content.startsWith(`${prefix}createticket`)) {
    if(ticketChannel || ticket.get(message.author.id) === true) return message.channel.send("You already have an open ticket")
    const ticketCreated = await message.guild.channels.create(`${message.author.username}-ticket`, {
      type: 'text',
      permissionOverwrites: [
        {
          allow: 'VIEW_CHANNEL',
          id: message.author.id
        },
        {
          deny: 'VIEW_CHANNEL',
          id: message.guild.id
        }
      ]
    })
    ticket.set(message.author.id, true)
    ticketCreated.send("Please explain the reason why you created a ticket")
    message.channel.send("Your ticket has been created")
  } else if (message.content.startsWith(`${prefix}closeticket`)) {
    if(!message.channel.name.includes('ticket')) return message.channel.send("This message need to be sent in your open ticket or you dont have open ticket")
    message.channel.delete()
    ticket.set(message.author.id, false)
  }
})
//urban
client.on('message', async message => {
	const args = message.content.substring(prefix.length).split(" ")

	if (message.content.startsWith(`${prefix}urban`)) {		
		const searchString = querystring.stringify({ term: args.slice(1).join(" ") })

        if (!args.slice(1).join(" ")) return message.channel.send(new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`You need to specify something you want to search the urban dictionary`)
        )

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${searchString}`).then(response => response.json())

        try {
            const [answer] = list

            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .addFields(
                    { name: 'Definition', value: trim(answer.definition, 1024) },
                    { name: 'Example', value: trim(answer.example, 1024) },
                    { name: 'Rating', value: `${answer.thumbs_up} 👍. ${answer.thumbs_down} 👎.` },
                )
            message.channel.send(embed)
        } catch (error) {
            console.log(error)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`No results were found for **${args.slice(1).join(" ")}**`)
            )
        }
	}		
})
//modertation
client.on('message', async message => {
  const args = message.content.substring(prefix.length).split(" ")
  const mentionedMember = message.mentions.members.first()
  const mentionedRole = message.mentions.roles.first()
  const moment = require('moment')
  if (message.content.startsWith(`${prefix}mute`)) {
    const reason = args.slice(3).join(" ")
    const regex = /\d+[smhdw]/.exec(args[2])
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don\'t have permission to use mute command")
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send("I don\'t have permission to mute make sure I have the manage roles")
    if (!args[1]) return message.channel.send("You need to scecify someone to mute")
    if (!mentionedMember) return message.channel.send("I can\'t find that member")
    if (!args[2]) return message.channel.send("You need to specify how long you want to mute this user")
    if (!regex) return message.channel.send("That is not a valid amount of time to mute that member")
    if (ms(regex[0]) > 214748367) return message.channel.send("Make sure you don\'t mute that member for more than 25 days")
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
      return message.channel.send("You can\'t mute a member that has a higher or equal role to you")
    }
    if (mentionedMember.id === message.author.id) return message.channel.send("Why do you want to mute yourself")
    var embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
    .setThumbnail(mentionedMember.user.displayAvatarURL())
    .setColor('00D0F9')
    .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Action:** Mute 
**Reason:** ${reason || "Underfined"}
**Length:** ${regex[0]}
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
    `)  
    message.channel.send(embed)
    if (mentionedMember.roles.cache.has('730267835846230037')) return message.channel.send("This member is already muted")
    mentionedMember.roles.add('730267835846230037')
    setTimeout(() => {
      if(!mentionedMember.roles.cache.has('730267835846230037')) return undefined
      mentionedMember.roles.remove('730267835846230037')
      message.channel.send(`${mentionedMember} has now been unmute after ${regex[0]}`)
    }, ms(regex[0]))
    return undefined
  } else if (message.content.startsWith(`${prefix}unmute`)) {
    const reason = args.slice(2).join(" ")
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don\'t have permission to unmute members")
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send("I don\'t have permission to umute  make sure I have the manage roles")
    if (!args[1]) return message.channel.send("You need to specify a member to unmute")
    if (!mentionedMember) return message.channel.send("I can\'t find that member")
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
      return message.channel.send("You can\'t mute that member due to your role being higher or equal to there role")
    }
    if (mentionedMember.id === message.author.id) return message.channel.send("Nice try You can\'t unmute yourself")
    if (!mentionedMember.roles.cache.has('730267835846230037')) return message.channel.send("this member is not muted")
    var embed = new Discord.MessageEmbed()
    .setAuthor (`${message.author.username} - (${mentionedMember.user.id})`)
    .setThumbnail (mentionedMember.user.displayAvatarURL())
    .setColor('00D0F9')
    .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Action:** Unmute
**Reason:** ${reason || "Underfined"}
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
    `)
    message.channel.send(embed)
    mentionedMember.roles.remove('730267835846230037')
    return undefined
  } else if(message.content.startsWith(`${prefix}createrole`)){
    const name = args.slice(2).join(" ")
    const regex = !/[^a-zA-Z0-9]+/g.test(name)
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have permission to create roles")
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send("I don\'t have permission to create roles")
    if(!args[1]) return message.channel.send("You need a color to create this role")
    if(toHex(args[1]) === undefined) return message.channel.send("That isn\'t a color")
    if(!name) return message.channel.send("You need a name to create this role")
    if(regex === false) return message.channel.send("That isn\'t a valid role name it can only contain letters and numbers")
    if(name.length > 100) return message.channels.send("Your role name is too long")
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[1])
      }
    })
    var embed = new Discord.MessageEmbed()
    .setAuthor (`${message.author.username} - (${message.author.id})` , message.author.displayAvatarURL())
    .setColor('00D0F9')
    .setDescription(`
**Role:** ${name}
**Action:** Createrole
**Role Color:** ${args[1]} - ${toHex(args[1])}
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
    `)
    message.channel.send(embed)
    return undefined
  } else if(message.content.startsWith(`${prefix}deleterole`)){
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have permission to delete this role")
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send("I don\'t have premission to delete this role")
    if(!args[1]) return message.channel.send("You need mention a role to delete")
    if(!mentionedRole) return message.channel.send("I can\'t find that role")
    if(mentionedRole.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id){
      return message.channel.send("You can\'t delete that due to your role equal or being higher than your role")
    }
    var embed = new Discord.MessageEmbed()
    .setAuthor (`${message.author.username} - (${message.author.id})` , message.author.displayAvatarURL())
    .setColor('00D0F9')
    .setDescription(`
**Role:** ${mentionedRole.name} - (${message.author.id})
**Action:** Deleterole
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
        `)
        message.channel.send(embed)
        mentionedRole.delete().catch(error => message.channel.send("I can\'t delete that role make sure my role is higher than the mentioned role"))
        return undefined
  } else if(message.content.startsWith(`${prefix}addrole`)) {
    const reason = args.slice(3).join(" ")
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have premission to add roles")
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send("I don\'t have premission to add roles")
    if(!args[1]) return message.channel.send("You need a member to add that role")
    if(!mentionedMember) return message.channel.send("I can\'t find that member")
    if(!args[2]) return message.channel.send("You need a role to add to that member")
    if(!mentionedRole) return message.channel.send("I can\'t find that role")
    if(mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id){
      return message.channel.send("You can\'t add roles to this member due to their role being higher than yours")
    }
    if(mentionedMember.roles.cache.has(mentionedRole.id)) return message.channel.send("This member already has this role")
    var embed = new Discord.MessageEmbed()
    .setAuthor (`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
    .setColor('00D0F9')
    .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Action:** Addrole
**Reason:** ${reason || "Undefined"}
**Role:** ${mentionedRole}
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
    `)
    message.channel.send(embed)
    mentionedMember.roles.add(mentionedRole.id)
    return undefined
  } else if(message.content.startsWith(`${prefix}removerole`)) {
    const reason = args.slice(2).join(" ")
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have premission to remove role")
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send("I don\' have premisson to remove role")
    if(!args[1]) return message.channel.send("You need a member to remove role")
    if(!mentionedMember) return message.channel.send("I can\'t find that member")
    if(!args[2]) return message.channel.send("You need a role to remove from that member")
    if(!mentionedRole) return message.channel.send("I can\'t find that role")
    if(mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id){
      return message.channel.send("You can\'t remove roles from this member due to their being higher than yours")
    }
    if(!mentionedMember.roles.cache.has(mentionedRole.id)) return message.channel.send("This member has already been remove this role")
    var embed = new Discord.MessageEmbed()
    .setAuthor (`${mentionedMember.user.username} - (${mentionedMember.user.id})`, message.author.displayAvatarURL())
    .setColor('00D0F9')
    .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Action:** Removerole
**Reason:** ${reason || "Undefined"}
**Role:** ${mentionedRole}
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
    `)
    message.channel.send(embed)
    mentionedMember.roles.remove(mentionedRole.id)
    return undefined
  } else if(message.content.startsWith(`${prefix}warn`)){
    const reason = args.slice(3).join(" ")
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have permission to do this command")
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send("I don\'t have permission to do this command")
    if(!args[1]) return message.channel.send("You need a member to warn")
    if(!mentionedMember) return message.channel.send("I can\'t find that member")
    if(mentionedMember.roles.highest.position >= message.member.roles.highest && message.author.id !== message.guild.owner.id) {
      return message.channel.send("You can\'t warn member due to their being higher than yours")
    }
    var embed = new Discord.MessageEmbed()
    .setAuthor (`${mentionedMember.user.username} - (${mentionedMember.user.id})`, message.author.displayAvatarURL())
    .setColor('00D0F9')
    .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Action:** Warn
**Reason:** ${reason || "Undefined"}
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
    `)
    message.channel.send(embed)
    return undefined
  } else if(message.content.startsWith(`${prefix}kick`)) {
    const reason = args.slice(3).join(" ")
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don\'t have permission to kick members")
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send("I don\'t have permission to kick members")
    if(!args[1]) return message.channel.send("You need a member to kick")
    if(!mentionedMember) return message.channel.send("I can\'t find that member")
    if(mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.owner.id) {
      return message.channel.send("You can\'t kick member due to their being higher than yours")
    }
    if(mentionedMember.id === message.author.id) return message.channel.send("Why do you want to kick yourself")
    if(mentionedMember.kickable) {
      var embed = new Discord.MessageEmbed()
      .setAuthor (`${mentionedMember.user.username} - (${mentionedMember.user.id})`, message.author.displayAvatarURL())
      .setThumbnail (mentionedMember.user.displayAvatarURL())
      .setColor('00D0F9')
      .setDescription(`
**Member:** ${mentionedMember.user.usename} - (${mentionedMember.user.id})
**Action:** Kick
**Reason:** ${reason || "Undefined"}
**Channel:** ${message.channel}
**Time:** ${moment().format('llll')}
      `)
      message.channel.send(embed)
      mentionedMember.kick()
    } else {
       return message.channel.send("I can't kick this user make sure i have permissions")
    } 
    return undefined
    }else if(message.content.startsWith(`${prefix}ban`)) {
      const reason = args.slice(2).join(" ")
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You don\'t have permission to ban members")
      if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send("I don\'t have permission to ban members")
      if(!args[1]) return message.channel.send("You need a member to ban")
      if(!mentionedMember) return message.channel.send("I can\'t find that member")
      if(mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.owner.id) {
        return message.channel.send("You can\'t ban member due to their being higher than yours")
      }
      if(mentionedMember.id === message.author.id) return message.channel.send("Why do you want to kick yourself")
      if(mentionedMember.bannable) {
        var embed = new Discord.MessageEmbed()
        .setAuthor (`${mentionedMember.user.username} - (${mentionedMember.user.id})`, message.author.displayAvatarURL())
        .setThumbnail (mentionedMember.user.displayAvatarURL())
        .setColor('00D0F9')
        .setDescription(`
        **Member:** ${mentionedMember.user.usename} - (${mentionedMember.user.id})
        **Action:** Ban
        **Reason:** ${reason || "Undefined"}
        **Channel:** ${message.channel}
        **Time:** ${moment().format('llll')}
        `)
        message.channel.send(embed)
        mentionedMember.ban()
      } else {
        return message.channel.send("I can't ban this user make sure i have permissions")
      }
      return undefined
    }
})
//wellcome  message
client.on('guildMemberAdd', member => {
  const channel = client.channels.cache.get('730213338386268210')
  var embed = new Discord.MessageEmbed()
  .setTitle(`A newbie has came to our server`)
  .setThumbnail (member.user.displayAvatarURL())
  .setColor('00D0F9')
  .setDescription(`Wellcome ${member} to our server Innovation Skyline`)
  channel.send(embed)
})
//help command
client.on('message', message => {
 
  let args = message.content.slice(prefix.length).split(' ');


  switch(args[0]){
      case 'help':
          const help = new Discord.MessageEmbed()
          .setTitle('Help')
          .setColor('00D0F9')
          .setDescription('**Here is some commands you can use**')
          .addField('Moderation', '`ban` `kick` `mute` `unmute` `purge` `createrole` `deleterole` `addrole` `removerole`')
          .addField('Fun', '`avatar` `meme` `lotto`')
          .addField('Info', '`covid19`')
          .addField('code', '`bins`')
          .setFooter('Bot made by SonnyTaco#5393')
          .setTimestamp()
          message.channel.send(help);
            break;
 
    }
 
})
//reaction roles
client.on("message", async (message) => {
  if (message.content.startsWith(`${prefix}colors`)) {
    const msg = await message.channel.send("Get color roles");
    msg
      .react("🔴")
      .then(msg.react("🔵"))
      .then(msg.react("⚫"))
      .then(msg.react("🟡"))
      .then(msg.react("🟣"))
      .then(msg.react("🟢"));
    message.delete();
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;

  if (reaction.message.channel.id === "734758688224706590") {
    if (reaction.emoji.name === "🔴")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("746895931017920613");
    if (reaction.emoji.name === "🔵")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("746895786293329971");
    if (reaction.emoji.name === "⚫")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("746895622736445592");
    if (reaction.emoji.name === "🟡")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("746895699999981598");
    if (reaction.emoji.name === "🟣")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("746895991793254531");
    if (reaction.emoji.name === "🟢")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("746895745210253357");
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;

  if (reaction.message.channel.id === "734758688224706590") {
    if (reaction.emoji.name === "🔴")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("746895931017920613");
    if (reaction.emoji.name === "🔵")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("746895786293329971");
    if (reaction.emoji.name === "⚫")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("746895622736445592");
    if (reaction.emoji.name === "🟡")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("746895699999981598");
    if (reaction.emoji.name === "🟣")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("746895991793254531");
    if (reaction.emoji.name === "🟢")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("746895745210253357");
  }
});


client.login(token);
