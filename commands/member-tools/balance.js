const { MessageButton, MessageActionRow } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { base_auth_url, base_auth_token } = require('../../config.json');

module.exports = {
	name: 'balance',
	aliases: ['money', 'income'],
	description: 'Show the author\'s PhoenixBase balance, if the author is a member.',
	guildOnly: true,
	cooldown: 5,
	async execute(message) {
		const response = await fetch(`${base_auth_url}/api/discord-bot/users/${message.author.id}`, { headers: { 'token': base_auth_token } });

		if (response.status === 404) {
			const linkDiscordButton = new MessageButton()
				.setStyle('url')
				.setURL('https://base.phoenixvtc.com/settings/socials')
				.setLabel('Link Your Discord');

			const applyButton = new MessageButton()
				.setStyle('url')
				.setURL('https://apply.phoenixvtc.com')
				.setLabel('Join Phoenix');

			const buttonRow = new MessageActionRow()
				.addComponents(linkDiscordButton)
				.addComponents(applyButton);

			return message.channel.send(`I couldn't find you on the PhoenixBase, ${message.author}! Have you connected your Discord account?`, buttonRow);
		}

		const userData = await response.json();

		if (userData['message']) {
			return message.channel.send(`Well, this is awkward... Something went wrong while trying to run this command. \n**Error message:** \`${userData['message']}\``);
		}

		const embed = new MessageEmbed()
			.setColor('#DC2F02')
			.setTitle(`${message.author.username}'s Balance`)
			.setThumbnail(userData['profile_picture'])
			.setURL(userData['profile_link'])
			.addField('Wallet', `€ ${userData['wallet_balance']}`)
			.addField('Event XP', `${userData['event_xp']} XP`)
			.setFooter('PhoenixBase', 'https://base.phoenixvtc.com/img/logo.png')
			.setTimestamp();

		const viewProfileButton = new MessageButton()
			.setStyle('url')
			.setURL(userData['profile_link'])
			.setLabel(`View ${userData['username']}'s Profile`);

		return message.channel.send(embed, viewProfileButton);
	},
};
