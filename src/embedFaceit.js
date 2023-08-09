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
        
        var csgoStats = await fr.csgoStats(id)
        var country =  player.country
        var skill_level = player.games.csgo["skill_level"].toString()
        console.log(skill_level)
        
        var skill_level_pic = "https://raw.githubusercontent.com/pvhil/FaceItDiscord/master/pictures/level" + skill_level + ".png"
    
        
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
                        value : csgoStats.lifetime["Average K/D Ratio"].toString(),
                        inline: true
                    },
    
                    {
                        name: "faceit elo",
                        value: player.games.csgo["faceit_elo"].toString(),
                        inline: true
                    },
                    {
                        name: "Last 5 games",
                        value: csgoStats.lifetime["Recent Results"].toString().replaceAll(",", "").replaceAll("0", "❌").replaceAll("1", "🏆").replaceAll("null", ""),
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
            .setTitle("Wrong faceit name :rage:")
            .setDescription("This Faceit name is invalid! Try again")
            .setTimestamp()

        return errembed
    }
   
}

const players = ["k0nja","knelele" ,"J0ker32", "nex1ck", "1HT-", "N0net1g", "TOTOOOOOO"];

function sortMap(map){
  return new Map([...map].sort((a, b) => b[1] - a[1]));
}
async function ranking(){

    const map = new Map()


    for(player of players){
        console.log(player)
        var tempPlayer = await fr.nickStats(player)
        var tempPlayerElo = tempPlayer.games.csgo["faceit_elo"]
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

module.exports = {
    fStats,
    ranking,
}