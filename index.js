const Discord = require("discord.js");
const bot = new Discord.Client();
bot.on("ready", function () {
    console.log("Carapuce est dans les places !");
});

bot.on("message", message => {
    if (message.content == "!ping") {
        message.channel.send("Carapong !");
    }
    if (message.content == "!carabonjour") {
        message.reply("Carabonjour a toi !")
        message.react("😃") 
    }
})

bot.login("Nzc5Njk3MDU1Nzc3MDMwMTQ0.X7kTeA.cU7-UXU20qlKsjYzhAcaqRAWx1w");