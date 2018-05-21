const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Comandos não encontrado.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} Carregado!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} Esta online em ${bot.guilds.size} servidores!`);
  bot.user.setActivity("Em Desenvolvimento", {type: "WATCHING"});

});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} Entrou no servidor.`);

  let Welcomechannel = member.guild.channels(`name`, "bem-vindo");
  Welcomechannel.send(`LOOK OUT EVERYONE! ${member} Juntou-se a festa!`)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(tokenfile.token);