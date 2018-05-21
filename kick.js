const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("```Não localizei esse usuário!```");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("```Não faça merda!```");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("```Essa pessoa não pode ser kickada!```");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Usuário Expulso", `${kUser} with ID ${kUser.id}`)
    .addField("Expulso Por", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Expulso Em", message.channel)
    .addField("Data/Hora da Expulsão", message.createdAt)
    .addField("Motivo da Expulsão", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("```não localizei o canal incidents.```");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
