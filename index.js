const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json")

function integration(message, color, descri, name, value) {
    message.channel.send({
        embed : {
        color : color,
        description : descri,
        fields : [
            {
                name : name,
                value :  value,
            },
        ]
        }
    })
}

let quizz = 0;
let quizzmessagereact = false;
let score = 0;


bot.on("ready", function () {
    console.log("Carapuce est dans les places !");
});

bot.on("message", message => {
    if (message.content == "!carahelp") {
        message.channel.send({
            embed : {
                color : 3447003,
                description : "__**Les différentes commandes**__",
                fields : [
                    {
                        name : "!carahelp",
                        value : "Pour affiché cette aide",
                    },
                    {
                        name : "!ping",
                        value : "Pong !",
                    },
                    {
                        name : "!pin",
                        value : "Epingle le contenu du message"
                    },
                    {
                        name : "!emojiliste",
                        value : "Affiche la liste des emoji"
                    }
                ]
            }
        })
    }

    if (message.content == "!ping") {
        message.channel.send("Carapong !");
    }
    if (message.content == "!carabonjour") {
        message.reply("Carabonjour a toi !");
        message.react("😃");
    }
    if (message.content.startsWith() == "!pin") {
        message.pin();
    }
    if (message.content == "!emojiliste") { 
        const emojiliste = message.guild.emojis.cache.map((e) => `${e} => : ${e.name} :`);
        message.channel.send(emojiliste);
    }
    if (message.content.toLowerCase() == "carapuce") {
        message.react("779715774293344276");
    }
    emoji =  message.guild.emojis.cache.array((e) => e);
    if (message.content == "!caraquizz") {
        quizz = 1;
        message.channel.send("Nous allons jouer à un cara-quiz !");
        message.channel.send(`Pour répondre il te suffira de donner la lettre correspondant a ta réponse ${emoji[2]}`);
        quizzmessagereact = true;
        integration(message, 3447003, "__**Question 1**__", "**Un gentil cobra m'a créé.**", "A : Vrai, B : False");
    }
    if (message.content == `Pour répondre il te suffira de donner la lettre correspondant a ta réponse ${emoji[2]}` && quizzmessagereact == true) {
        message.react("779715774293344276");
        quizzmessagereact = false;
    }
    if (message.content.toLowerCase() == "b" && quizz == 1) {
        message.channel.send(`Bonne réponse ! ${emoji[0]}`);
        quizzmessagereact = true;
        score = score + 1;

    }
    if ((message.content == `Bonne réponse ! ${emoji[0]}` || message.content == "Mauvaise réponse !") && quizzmessagereact == true) {
        message.react("779715774293344276");
        quizzmessagereact = false;
        quizz = quizz + 1;
    }
    if (message.content.toLowerCase() == "a" && quizz == 1) {
        message.channel.send("Mauvaise réponse !");
        quizzmessagereact = true;
    }
    if ((message.content == `Bonne réponse ! ${emoji[0]}` || message.content == "Mauvaise réponse !") && quizz == 2) {
        integration(message, 3447003, "__**Question 2**__", "**Quel est le meilleur starter parmis ces choix ?**", "A : Bulbizarre, B : Carapuce, C : Salamèche");
    }
    if (message.content.toLowerCase() == "b" && quizz == 2) {
        message.channel.send(`Bonne réponse ! ${emoji[0]}`);
        quizzmessagereact = true;
        score = score + 1;
    }
    if ((message.content.toLowerCase() == "a" || message.content.toLowerCase() == "c") && quizz == 2) {
        message.channel.send("Mauvaise réponse !");
        quizzmessagereact = true;

    }
    if (quizz == 3) {
        message.channel.send("Fin du cara-quizz !");
        message.channel.send(`Tu as fait un score de ${score} / ${quizz - 1}`);
        quizz = 0;
        score = 0;
    }
})

bot.login(config.token);