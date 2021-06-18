const files = [
	'https://i.imgur.com/p02XeKh.jpg',
	'https://i.imgur.com/j0zJGeE.jpg',
	'https://i.imgur.com/v807WS2.jpg',
	'https://i.imgur.com/75nUEjW.jpg',
	'https://i.imgur.com/I608aWn.jpg',
	'https://i.imgur.com/kGQNJwo.png',
	'https://i.imgur.com/KCQKvzq.jpg',
	'https://i.imgur.com/RFsHhBb.jpg',
	'https://i.imgur.com/MdGoPMe.jpg',
	'https://i.imgur.com/722lQdi.jpg',
	'https://i.imgur.com/0kQZZAc.jpg',
	'https://i.imgur.com/0AGHKAo.jpg',
	'https://i.imgur.com/kdCKPBE.jpg',
	'https://i.imgur.com/zJqyEou.jpg',
	'https://i.imgur.com/sgGlJf7.jpg',
	'https://i.imgur.com/hbKSSaK.jpg',
];

module.exports = {
	name: 'kenji',
	aliases: ['shiba', 'bestpossibledogintheworld'],
	description: 'Bork bork',
	guildOnly: true,
	execute(message) {
		// message.channel.send(files[Math.floor(Math.random() * files.length)]);
	},
};
