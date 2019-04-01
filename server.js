const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');
var d = new Date();

var rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 10;

var j = schedule.scheduleJob(rule, () => {
  console.log("Starting job at " + d.getHours().toString().padStart("2","0") + ":" + d.getMinutes().toString().padStart("2","0"));
  getGuilds();
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! at `+ d.getHours().toString().padStart("2","0") + ":" + d.getMinutes().toString().padStart("2","0"));
  getGuilds();
});


client.login('NTYxOTAwMTY0MjQwMTEzNjc1.XKC8xg.N1Bbw9GS6ZfMmYSAouJ2TwgfpxM');

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
  let date = new Date();
  let channels = guild.channels;
  channels.forEach( (channel) => {
    if (channel.name == "christmas" || channel.name.includes("christmas")){
      channel.setName(daysUntilChristmas()+" days until christmas") ;
    }
  });
}

//returns num of days until christmas
function daysUntilChristmas(){
  let date = new Date();
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
