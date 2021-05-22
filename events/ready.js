module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}! (${client.user.id})`);

		client.user.setActivity('PhoenixVTC.com', {
			type: 'PLAYING',
			url: 'https://PhoenixVTC.com',
		});
	},
};
