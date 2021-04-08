const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');

const client = new CommandoClient({
	commandPrefix: config.prefix,
	owner: config.owner_id,
});


client.once('ready', () => {
	console.log('Ready!');
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		//
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);

	client.user.setActivity('PhoenixVTC.com', {
		type: 'PLAYING',
		url: 'https://PhoenixVTC.com',
	});
});

client.on('error', console.error);

client.login(config.token);
