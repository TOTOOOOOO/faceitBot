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
        

        var name = interaction.options.getString('faceitname');
        await interaction.deferReply();

        var resp = await faceit.fStats(name)

        // console.log(resp);

        interaction.editReply({embeds: [resp]});
    }

    if(interaction.commandName == 'ranking'){
        await interaction.deferReply();
        var resp = await faceit.ranking()
        interaction.editReply({embeds:[resp]})
    }

    if(interaction.commandName === 'matches') {
        const name = interaction.options.getString('faceitname');
        const count = interaction.options.getInteger('count') || 5;
        
        if (count < 1 || count > 20) {
            return interaction.reply({
                content: 'Please specify a number between 1 and 20',
                ephemeral: true
            });
        }

        await interaction.deferReply();
        
        try {
            const resp = await faceit.matchHistory(name, count);
            await interaction.editReply({ embeds: [resp] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error fetching the match history!');
        }
    }
})

client.login(process.env.TOKEN);