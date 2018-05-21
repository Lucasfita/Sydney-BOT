const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    //!tempmute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Não consegui encontrar este usuario.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Usuario não pode ser mutado!");
    let muterole = message.guild.roles.find(`name`, "mutado");
    //INICIO
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "mutado",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) =>{
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    //FIM
    let mutetime = args[1];
    if(!mutetime) return message.reply("Você não colocou o tempo!");


    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> Foi mutado por ${ms(ms(mutetime))}`);
    
    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> Foi dismutado! `);
    }, ms(mutetime));

//FIM
}

module.exports.help = {
    name: "tempmute"
}