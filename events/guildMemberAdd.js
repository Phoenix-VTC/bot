const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		// // Send the message to a designated channel on a server:
		// const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
		// // Do nothing if the channel wasn't found on this server
		// if (!channel) return;
		// // Do nothing if the new user is a bot
		// if (member.user.bot) return;
		//
		// const embed = new MessageEmbed()
		// 	.setAuthor('Phoenix Community', 'https://phoenixvtc.com/assets/images/branding/logo.png', 'https://phoenixvtc.com')
		// 	.setTitle(`Hey, ${member.user.username}!`)
		// 	.setColor(14429954)
		// 	.setDescription('Welcome to the **Phoenix Community**! It\'s awesome to have you here. <:PhoenixLove:797449175171727360> \n \n' +
        //         '<:Play:808490005357658164> To find out more about Phoenix, feel free to read <#786340866117074964>. \n' +
        //         '<:Play:808490005357658164> If you are interested in joining our VTC, please check [our website](https://phoenixvtc.com/en/apply). \n' +
        //         '<:Play:808490005357658164> Enjoy your time here! If you have any questions, let us know in <#787305785381617684>!')
		// 	.setFooter('New Discord Member', 'https://i.imgur.com/BQFq6OZ.png');
		// channel.send(`${member}`);
		// channel.send(embed);
	},
};
