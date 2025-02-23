const fr = require('./faceitRequests');


const {
    countryCodeEmoji,
 } = require("country-code-emoji");

const numbformat = new Intl.NumberFormat();


const {
    MessageEmbed, EmbedBuilder, inlineCode, parseResponse,
} = require('discord.js')


async function fStats(name){

    try{
        try{
            var id = 0;
    
            if(name === 'andrejicaker')
                name  = "J0ker32"
            
            console.log(name)
            var player = await fr.nickStats(name)
            id = player.player_id
        }
        catch(error){
            console.log(error)
        }
        
        var cs2Stats = await fr.cs2Stats(id)
        var country =  player.country
        var skill_level = player.games.cs2.skill_level.toString()
        // console.log(skill_level)
        
        var skill_level_pic = "https://github.com/TOTOOOOOO/faceitBot/blob/master/pics/" + skill_level + ".png?raw=true"
    
        
        nick = player.nickname
        if(player.nickname === 'J0ker32')
            nick = 'Andrejica ker'
        

        const embed = new EmbedBuilder()
                    .setColor('#FF5500')
                    .setTitle('Stats for ' + nick)
                    .addFields({
                        name: "Country",
                        value: countryCodeEmoji(country),
                        inline: true
                    },
                    {
                        name: "K/D",
                        value: cs2Stats.lifetime["Average K/D Ratio"].toString(),
                        inline: true
                    },
    
                    {
                        name: "faceit elo",
                        value: player.games.cs2.faceit_elo.toString(),
                        inline: true
                    },
                    {
                        name: "Last 5 games",
                        value: cs2Stats.lifetime["Recent Results"].toString().replaceAll(",", "").replaceAll("0", "❌").replaceAll("1", "🏆").replaceAll("null", ""),
                        inline:true
                    }
                    )
                    .setAuthor({ name: 'Faceit level', iconURL: skill_level_pic})
        
        if(player.avatar === '')
            embed.setThumbnail('https://github.com/TOTOOOOOO/faceitBot/blob/master/pics/slika.png?raw=true')
        else
            embed.setThumbnail(player.avatar)

        return embed
    }
    catch(e){
        const errembed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Error fetching CS2 stats")
            .setDescription("Either the player name is invalid or they haven't played CS2 on Faceit yet!")
            .setTimestamp()

        return errembed
    }
   
}

const players = ["knelele" ,"J0ker32", "nex1ck", "1HT-", "N0net1g", "TOTOOOOOO"];

function sortMap(map){
  return new Map([...map].sort((a, b) => b[1] - a[1]));
}
async function ranking(){

    const map = new Map()


    for(player of players){
        console.log(player)
        var tempPlayer = await fr.nickStats(player)
        var tempPlayerElo = tempPlayer.games.cs2.faceit_elo
        console.log(tempPlayerElo)

        map.set(player, tempPlayerElo)
    }

    const sortedMap = sortMap(map) 
    console.log(sortedMap);
    

    const embed = new EmbedBuilder()
                    .setColor('#FF5500')
                    .setTitle('Top players of Panchester')

    
    var brojac = 1;

    for(const [player, elo] of sortedMap){
        
        if(brojac > 5)
            break
        
        if (brojac == 1){
            embed.addFields({
                name: ":first_place:  " +  player + " " + elo.toString(),
                value: " "
               })
   
        }

        else if (brojac == 2){
            embed.addFields({
                name: ":second_place:  " +  player + " " + elo.toString(),
                value: " "
               })
   
        }

        else if (brojac == 3){
            embed.addFields({
                name: ":third_place:  " +  player + " " + elo.toString(),
                value: " "
               })
   
        }

        else if(brojac == 4){
            embed.addFields({
                name: ":four:  " +  player + " " + elo.toString(),
                value: " "
               }) 
        }

        else if(brojac == 5){
            embed.addFields({
                name: ":five:  " + player + " " + elo.toString(),
                value: " "
            })
        }
        
        brojac += 1
    }


    return embed
}

async function matchHistory(name, count = 5) {
    try {
        if (name === 'andrejicaker') 
            name = "J0ker32";
        
        const player = await fr.nickStats(name);
        const id = player.player_id;


        const matches = await fr.getMatchHistory(id, count);
        // console.log(matches);
        
        const embed = new EmbedBuilder()
            .setColor('#FF5500')
            .setTitle(`Match History for ${player.nickname}`)
            .setThumbnail(player.avatar || 'https://github.com/TOTOOOOOO/faceitBot/blob/master/pics/slika.png?raw=true');
        
        for (const match of matches.items) {
            
            const matchId  = match.match_id;
            matchDetails = await fr.getMatchDetails(matchId);
            const allPlayers = [
                ...matchDetails.rounds[0].teams[0].players,
                ...matchDetails.rounds[0].teams[1].players
            ];
            
            // Find specific player by ID
            const playerStats = allPlayers.find(p => p.player_id === id)?.player_stats;
            const kills =  playerStats.Kills;
            const deaths =  playerStats.Deaths;
            const assists =  playerStats.Assists;
            
            console.log(playerStats);

            const mapPlayed = matchDetails.rounds[0].round_stats.Map;
            const score = matchDetails.rounds[0].round_stats.Score;

            // Determine player's team
            let playerTeam = match.teams.faction1.players.some(p => p.player_id === id) ? 'faction1' : 'faction2';
            const enemyTeam = playerTeam === 'faction1' ? 'faction2' : 'faction1';
            
            // Get player's data from their team
            const playerData = match.teams[playerTeam].players.find(p => p.player_id === id);

            if (!playerData) continue;
            
            // Get match score
            const won = match.results.winner === playerTeam;
            
            
            // Format match date
            const matchDate = new Date(match.started_at * 1000).toLocaleDateString();
            
            embed.addFields({
                name: `${won ? '🏆 Win' : '❌ Loss'} | ${matchDate}`,
                value: `**Map**: ${mapPlayed}\n**Score**: ${score}\n**KDA**: ${kills}/${deaths}/${assists}\n`,
                inline: false
            });
        }


    
        return embed;

    } catch (error) {
        console.error('Error:', error);
        return new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Error fetching match history")
            .setDescription("Invalid player name or no CS2 matches played!")
            .setTimestamp();
    }
}
module.exports = {
    fStats,
    ranking,
    matchHistory,
}