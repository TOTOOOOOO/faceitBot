require('dotenv').config();

const {REST, Routes, Options} = require('discord.js');

const commands = [
    {
        name: 'stats',
        description: 'Find faceit stat',
        options : [{
            type: 3,
            name: "faceitname",
            description: "The faceit user you want to check",
            required: true,
        }]
    }
];

const rest =  new REST({version: '10'}).setToken(process.env.TOKEN);


(async() => {
    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )

        console.log("Commands are registered");
    } catch (error) {
        console.log(`there was an error ${error}`);
    }
})();


// const dotenv = require('dotenv').config()

// const {
//     Client,
//     Intents,
// } = require('discord.js')

// const client = new Client({
//     intents: [Intents.FLAGS.GUILDS]
// });


// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
//     client.application.commands.set(
//         [{
//             "name" : "stats",
//             "description" : "Look up Faceit stats", 
//             "options": [{
//                 "type": 3,
//                 "name": "faceitname",
//                 "description": "The faceit user you want to check",
//                 "required": true
//             }]
//         }]
//     )
//     .then(console.log)
//     .catch(console.error);
// });


// const token = process.env.CLIENT_ID
// client.log(token)


