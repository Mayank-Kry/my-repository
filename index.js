// const fs = require('fs');
// const Discord = require('discord.js');
// const fetch = require('node-fetch');

// const client = new Discord.Client();
// const token = process.env.DISCORD_BOT_SECRET;
// const prefix = '!'; // Change this to your desired prefix
// const chatbotUrl = 'http://api.brainshop.ai/get?bid=174258&key=SzmbHFah9MBer7yv&uid=1';

// client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);
//   client.commands.set(command.name, command);
// }

// client.on('ready', () => {
//   console.log("I'm in");
//   console.log(client.user.username);
// });

// client.on('message', async message => {
//   if (message.author.bot) return;

//   if (message.content.startsWith(prefix)) {
//     const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     if (!client.commands.has(commandName)) return;

//     const command = client.commands.get(commandName);

//     try {
//       command.execute(message, args);
//     } catch (error) {
//       console.error(error);
//       message.reply('there was an error trying to execute that command!');
//     }
//   } else if (message.content.startsWith('$')) {
//     const chatbotMessage = message.content.slice(1);
//     const chatbotResponse = await fetch(`${chatbotUrl}&msg=${chatbotMessage}`).then(response => response.json());
    
//     if (chatbotResponse.cnt === 0 || chatbotResponse.cnt === undefined) {
//       message.reply('Sorry, I could not process your request at the moment!');
//     } else {
//       message.reply(chatbotResponse.cnt);
//     }
//   }
// });

// client.login(token);

const fs = require('fs');
const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const prefix = '!'; // Change this to your desired prefix
const chatbotUrl = 'http://api.brainshop.ai/get?bid=174258&key=SzmbHFah9MBer7yv&uid=1';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  } else if (message.content.startsWith('$')) {
    const chatbotMessage = message.content.slice(1);
    const chatbotResponse = await fetch(`${chatbotUrl}&msg=${chatbotMessage}`).then(response => response.json());
    
    if (chatbotResponse.cnt === 0 || chatbotResponse.cnt === undefined) {
      message.reply('Sorry, I could not process your request at the moment!');
    } else {
      message.reply(chatbotResponse.cnt);
    }
  }
});

client.login(token);
