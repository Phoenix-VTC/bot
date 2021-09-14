const { MessageButton } = require('discord-buttons');

const activities = [
	'youtube',
	'poker',
	'betrayal',
	'fishing',
	'chess',
];

module.exports = {
	name: 'together',
	description: 'Create a Together invite for the voice channel you are currently in.',
	guildOnly: true,
	args: true,
	usage: '<application (e.g. YouTube)>',
	execute(message, args) {
		// Check if the user is in a voice channel
		if (!message.member.voice.channel) {
			return message.reply('please join a voice channel first.');
		}

		const activity = args[0].toLowerCase();

		// Check if the chosen activity is invalid
		if (!activities.includes(activity)) {
			// Capitalize all items in the activities array
			const activitiesCapitalized = activities.map(activitiesItem => activitiesItem.charAt(0).toUpperCase() + activitiesItem.slice(1));
			return message.reply(`invalid option! Please choose one of the following activities:\n \`${activitiesCapitalized.join(', ')}\``);
		}

		message.client.discordTogether.createTogetherCode(message.member.voice.channel.id, activity).then(async invite => {
			const button = new MessageButton()
				.setStyle('url')
				.setURL(invite.code)
				.setLabel('Join Activity');

			message.reply(`I created a **${activity.charAt(0).toUpperCase() + activity.slice(1)} Together** session! Press the button below to join.`, button);
		});
	},
};
