module.exports = {
    config: {
        name: "purge", 
        category: "moderation",
        description: "Clears recent messages",
          aliases: ["purge"],
        usage: '~purge <amount>',
    },
    execute(message, args) {
    if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("You can not use this command!")
    
   if (isNaN(args[0])) return message.channel.send('**Please supply a valid amount of messages to purge**');
   if (args[0] > 100) return message.channel.send('**Please supply a number less than 100**');

   message.channel.bulkDelete(args[0])
        .then( message => message.channel.send('**Deleted Messages**'));

        }
    }
    