const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Move this
const { MessageEmbed } = require('discord.js');

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);

	client.user.setActivity('PhoenixVTC.com', {
		type: 'PLAYING',
		url: 'https://PhoenixVTC.com',
	});
});

// Welcome new Discord members
client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Do nothing if the new user is a bot
	if (member.user.bot) return;

	const embed = new MessageEmbed()
		.setAuthor('Phoenix Community', 'https://phoenixvtc.com/assets/images/branding/logo.png', 'https://phoenixvtc.com')
		.setTitle(`Hey, ${member.user.username}!`)
		.setColor(14429954)
		.setDescription('Welcome to the **Phoenix Community**! It\'s awesome to have you here. <:PhoenixLove:797449175171727360> \n \n' +
			'<:Play:808490005357658164> To find out more about Phoenix, feel free to read <#786340866117074964>. \n' +
			'<:Play:808490005357658164> If you are interested in joining our VTC, please check [our website](https://phoenixvtc.com/en/apply). \n' +
			'<:Play:808490005357658164> Enjoy your time here! If you have any questions, let us know in <#787305785381617684>!')
		.setFooter('New Discord Member', 'https://i.imgur.com/BQFq6OZ.png');
	channel.send(`${member}`);
	channel.send(embed);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// Handle command cooldowns
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// Handle guildOnly commands
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	// Handle command permissions
	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	// Handle command arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// Try to execute the command
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('error', console.error);
