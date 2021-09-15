// Require the necessary discord.js classes
const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
require('dotenv').config();

if (process.env.ENV !== 'local') {
    const Sentry = require("@sentry/node");
    // Importing @sentry/tracing patches the global hub for tracing to work.
    const Tracing = require("@sentry/tracing");

    Sentry.init({
        dsn: process.env.SENTRY_DSN,

        tracesSampleRate: 1.0,
    });
}

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    }
});

const {DiscordTogether} = require('discord-together');
client.discordTogether = new DiscordTogether(client);

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login to Discord with your client's token
client.login(process.env.TOKEN);
