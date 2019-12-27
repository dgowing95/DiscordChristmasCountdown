const Discord = require('discord.js');
const client = new Discord.Client();
var cron = require('node-cron');
const {token} = require("./settings.json");


cron.schedule('0 1 * * *', () => {
  let date = new Date();
  console.log("Starting job at " + date.getHours().toString().padStart("2","0") + ":" + date.getMinutes().toString().padStart("2","0"));
  getGuilds();
}, {
  scheduled: true,
  timezone: "Europe/London"
});

client.on('error', (err) => {
  console.log(err);
});

client.on('ready', () => {
  let date = new Date();
  console.log(`Logged in as ${client.user.tag}! at `+ date.getHours().toString().padStart("2","0") + ":" + date.getMinutes().toString().padStart("2","0"));
  getGuilds();
});


client.login(token);

function getGuilds() {
  client.guilds.forEach( (guild) => {
    if (guild.available){
      searchChannels(guild);
    }
  })
}

//Search the channels of each guild for a christmas one
function searchChannels(guild){
  let channels = guild.channels;
  channels.forEach( (channel) => {
    if (channel.name.toLowerCase().includes("christmas")){
      channel.setName(daysUntilChristmas()) ;
    }
  });
}

//returns num of days until christmas
function daysUntilChristmas(){
  let date = new Date();
  let christmas = new Date(date.getFullYear(), 11,25);

  //Today is Christmas
  if (date.getMonth()==11 && date.getDate()==25)
  {
    return "Today is Christmas!"
  }
  //If its between 25th-31st dec, we need next years Christmas.
  if (date.getMonth()==11 && date.getDate()>25)
  {
  christmas.setFullYear(christmas.getFullYear()+1);
  }
  //Calculate days until Christmas
  let one_day=1000*60*60*24;
  let daysUntilChristmas = Math.ceil((christmas.getTime()-date.getTime())/(one_day));
  if (daysUntilChristmas > 1) {
    return daysUntilChristmas + " days until Christmas";
  }else {
    return daysUntilChristmas + " day until Christmas";
  }
}
