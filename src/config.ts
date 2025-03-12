import dotenv from "dotenv";
import path from "path";

if (process.env["NODE_ENV"] === "development") {
    console.log("Application running in development mode!");
    dotenv.config({path: path.resolve(__dirname, "..", ".env")});
} else {
    console.log("Application running in production mode!");
    dotenv.config({path: path.resolve(__dirname, "..", ".env")});
    console.log(process.env)
}

export function getEnv(name: string) {
    let val = process.env[name];
    if (val === undefined || val === null) {
        throw new Error("Missing environment variable " + name)
    }
    return val;
}

export const config = {
    host: process.env["NODE_ENV"] === "development" ? "127.0.0.1" : "0.0.0.0",
    discordBotToken: process.env["DISCORD_BOT_TOKEN"],
    discordClientId: process.env["DISCORD_CLIENT_ID"],
    port: 8000,
    isDev: process.env["NODE_ENV"] === "development",
    botPrefix: new RegExp("^adev[,! ]", "i")
};