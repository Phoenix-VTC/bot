const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');
const { base_auth_url, base_auth_token } = require('../../config.json');

module.exports = {
	name: 'whois',
	description: 'Show the user\'s PhoenixBase information, if the user is a member.',
	// requiredRole: 'Phoenix Member',
	requiredRole: 'Bot Tester',
	guildOnly: true,
	args: true,
	usage: '<user>',
	cooldown: 5,
	async execute(message) {
		if (message.mentions.users.first() === undefined) {
			return message.channel.send(`Please tag a user in order to see their information, ${message.author}!`);
		}

		const id = message.mentions.users.first().id;

		const response = await fetch(`${base_auth_url}/api/discord-bot/users/${id}`, { headers: { 'token': base_auth_token } });
		const userData = await response.json();

		if (userData['status_code'] === 404) {
			return message.channel.send(`We couldn't find this user on the PhoenixBase, ${message.author}!`);
		}

		if (userData['message']) {
			return message.channel.send(`Well, this is awkward... Something went wrong while trying to run this command. \n**Error message:** \`${userData['message']}\``);
		}

		const embed = new MessageEmbed()
			.setColor('#DC2F02')
			.setTitle(`${message.mentions.users.first().username}'s Information`)
			.setThumbnail(userData['profile_picture'])
			.setURL(userData['profile_link'])
			.addField('PhoenixBase Username', userData['username'])
			.addField('Discord Username', userData['discord_nickname'], true)
			.addField('TruckersMP ID', `[${userData['truckersmp_id']}](http://steamcommunity.com/user/${userData['truckersmp_id']})`, true)
			.addField('Steam ID', `[${userData['steam_id']}](http://steamcommunity.com/profiles/${userData['steam_id']})`, true)
			.addField('Wallet Balance', `€ ${userData['wallet_balance']}`, true)
			.addField('Total Event XP', `${userData['event_xp']}`, true)
			.addField('Member Since', moment.utc(userData['created_at']).format('LLL'));

		return message.channel.send(embed);
	},
};
