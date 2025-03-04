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
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply(); // Defer reply at the start for all commands

    try {
        switch (interaction.commandName) {
            case 'stats':
                await handleStats(interaction);
                break;
            case 'ranking':
                await handleRanking(interaction);
                break;
            case 'matches':
                await handleMatches(interaction);
                break;
            default:
                await interaction.editReply('Unknown command!');
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        await interaction.editReply('There was an error processing your request.');
    }
});

async function handleStats(interaction) {
    const name = interaction.options.getString('faceitname');
    const resp = await faceit.fStats(name);
    await interaction.editReply({ embeds: [resp] });
}

async function handleRanking(interaction) {
    const resp = await faceit.ranking();
    await interaction.editReply({ embeds: [resp] });
}

async function handleMatches(interaction) {
    const name = interaction.options.getString('faceitname');
    const count = interaction.options.getInteger('count') || 5;

    if (count < 1 || count > 20) {
        return interaction.reply({
            content: 'Please specify a number between 1 and 20',
            ephemeral: true,
        });
    }

    const resp = await faceit.matchHistory(name, count);
    await interaction.editReply({ embeds: [resp] });
}

client.login(process.env.TOKEN);