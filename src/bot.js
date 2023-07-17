const dotenv = require('dotenv').config();
const faceit = require('./embedFaceit');
const fr = require('./faceitRequests');

const axios = require('axios').default;

const {
	Client,
	Intents,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
	Permissions,
    IntentsBitField,
} = require('discord.js');

const ft = process.env.FACEIT_TOKEN



const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is ready`)
})




client.on('interactionCreate', async (interaction) => {

    if(!interaction.isChatInputCommand()) 
        return;
    
    if(interaction.commandName === 'stats'){
        // interaction.reply('totolina is the best player ever!')
        // await interaction.deferReply();
        
        var name = interaction.options.getString('faceitname');
        var resp = await faceit.fStats(name)
        
        console.log(resp);

        interaction.reply({embeds: [resp]});
    }

})

client.login(process.env.TOKEN);