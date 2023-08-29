module.exports = {
	name: ".NET",
	aliases: ["dotnet", ".net"],
	notes: "Every five minutes, Supibot checks new devblogs on Microsoft's .NET website. If a new article is detected, you will be notified in the channel you subscribed in.",
	channelSpecificMention: true,
	response: {
		added: "You will now be pinged whenever a new .NET devblog is published.",
		removed: "You will no longer receive pings when a new .NET devblog is published."
	}
};
