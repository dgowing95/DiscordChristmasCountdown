const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');
const {token} = require("./settings.json");
var date = new Date();

schedule.scheduleJob('0 0 * * *', () => {
  console.log("Starting job at " + date.getHours().toString().padStart("2","0") + ":" + date.getMinutes().toString().padStart("2","0"));
  getGuilds();
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! at `+ date.getHours().toString().padStart("2","0") + ":" + date.getMinutes().toString().padStart("2","0"));
  getGuilds();
});


client.login(token);

function getGuilds() {
  //Returns the collection of all guilds(servers) that are using this bot.
  //Loop through them one at a time
  let guilds = client.guilds;
  guilds.forEach( (guild) => {
    if (guild.available){
      searchChannels(guild);
    }
  })
}

//Search the channels of each guild for a christmas one
function searchChannels(guild){
  let channels = guild.channels;
  channels.forEach( (channel) => {
    if (channel.name == "christmas" || channel.name.includes("christmas")){
      channel.setName(daysUntilChristmas()+" days until christmas") ;
    }
  });
}

//returns num of days until christmas
function daysUntilChristmas(){
  let christmas = new Date(date.getFullYear(), 11,25);

  // If today is christmas, ITS CHRISTMAS
  if (date.getMonth()==11 && date.getDate()==25)
  {
  return 0;
  }
  //If its between 25th-31st dec, we need next years christmas.
  if (date.getMonth()==11 && date.getDate()>25)
  {
  christmas.setFullYear(cmas.getFullYear()+1);
  }

  let one_day=1000*60*60*24;
  let days = Math.ceil((christmas.getTime()-date.getTime())/(one_day));
  return days;
}
