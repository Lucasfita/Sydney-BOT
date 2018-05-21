const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

let {body} = await superagent
.get(`aws.random.cat/meow`);

let dogembed = new Discord.RichEmbed()
.setColor("#ff9900")
.setTitle("Gatinho :cat:")
.setImage(body.file);

message.channel.send(dogembed);

}

module.exports.help = {
    name: "cat"
}