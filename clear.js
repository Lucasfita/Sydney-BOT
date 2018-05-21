const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Não.");
  if(!args[0]) return message.channel.send("não");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Apaguei ${args[0]} mensagens.`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}
