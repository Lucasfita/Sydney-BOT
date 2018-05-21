const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("```Não localizei o usuário!```");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("```Não pode fazer merda!```");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("```Essa pessoa não pode ser Banida!```");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Usuário Banido", `${bUser} with ID ${bUser.id}`)
    .addField("Banido Por", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banido Em", message.channel)
    .addField("Data/Hora", message.createdAt)
    .addField("Motivo do Banimento", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("```Não localizei o canal incidentes.```");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
