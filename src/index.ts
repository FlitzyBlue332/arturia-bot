import { SapphireClient } from "@sapphire/framework";
import { GatewayActivity, GatewayIntentBits, Partials } from "discord.js";
import { config } from "./config";
import "@sapphire/plugin-hmr/register"

const client = new SapphireClient({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.User, Partials.Channel],
    regexPrefix: config.botPrefix,
    loadMessageCommandListeners: true,
    hmr: { enabled: true}

});

client.login(config.discordBotToken)
