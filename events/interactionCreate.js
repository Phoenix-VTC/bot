module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		// Handle command requiredRole
		if (command.requiredRole) {
			if (!interaction.member.roles.cache.some(role => role.name === command.requiredRole)) {
				return await interaction.reply({
					content: '<:No:809018510557577228> You don\'t have permission to use this command!',
					ephemeral: true,
				});
			}
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
