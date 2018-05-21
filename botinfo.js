const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Informações do BOT")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nome do Bot", bot.user.username)
    .addField("Criado em", bot.user.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}
