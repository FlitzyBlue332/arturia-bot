import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities"
import type { Message, TextChannel } from "discord.js";

export class PingCommand extends Command {
    public constructor(context: Command.LoaderContext, options:Command.Options) {
        super(context, {
            ...options,
            name: "ping",
            aliases: ["pong"],
            description: "ping pong"    
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('ping').setDescription('Ping bot')
        )
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const msg = await interaction.reply({ content: `Ping?`, ephemeral: true, fetchReply: true});

        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }

        return interaction.editReply('Failed to retrieve ping')
    }


    public override async messageRun(message: Message) {
        const msg = await (message.channel as TextChannel).send("Ping?")
        const content = `Pong!!! Bot latency: ${Math.round(
            this.container.client.ws.ping
        )}ms. API latency ${
            msg.createdTimestamp - message.createdTimestamp
        }ms.`;
        return msg.edit(content)
    }
    
}