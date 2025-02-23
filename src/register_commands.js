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
    ,
    {
        name: 'ranking',
        description: 'Gives top 5 ranked player from Panchester'
    }
    ,
    {
        name:'matches',
        description: 'Show recent match history',
        options: [
            {
                type: 3,
                name: "faceitname",
                description: "Player's Faceit username",
                required: true,
            },
            {
                type: 4,
                name: "count",
                description: "Number of matches (1-20)",
                required: false,
            }
        ]
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


