const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { base_auth_url, base_auth_token } = require('../../config.json');

module.exports = {
	name: 'balance',
	aliases: ['money', 'income'],
	description: 'Show the author\'s PhoenixBase balance, if the author is a member.',
	// requiredRole: 'Phoenix Member',
	requiredRole: 'Bot Tester',
	guildOnly: true,
	cooldown: 5,
	async execute(message) {
		const response = await fetch(`${base_auth_url}/api/discord-bot/users/${message.author.id}`, { headers: { 'token': base_auth_token } });
		const userData = await response.json();

		if (userData['status_code'] === 404) {
			return message.channel.send(`We couldn't find you on the PhoenixBase, ${message.author}! Have you connected your Discord account?`);
		}

		if (userData['message']) {
			return message.channel.send(`Well, this is awkward... Something went wrong while trying to run this command. \n**Error message:** \`${userData['message']}\``);
		}

		const embed = new MessageEmbed()
			.setColor('#DC2F02')
			.setTitle(`${message.author.username}'s Balance`)
			.setThumbnail(userData['profile_picture'])
			.setURL(userData['profile_link'])
			.addField('Wallet', `€ ${userData['wallet_balance']}`)
			.addField('Event XP', `€ ${userData['event_xp']}`);

		return message.channel.send(embed);
	},
};
