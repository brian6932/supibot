module.exports = {
	Name: "countlinerecord",
	Aliases: ["clr"],
	Author: "supinic",
	Last_Edit: "2020-09-08T17:25:36.000Z",
	Cooldown: 30000,
	Description: "Posts the two records of each channel: The amount, and the total length of messages posted within each one minute.",
	Flags: ["mention","pipe"],
	Whitelist_Response: null,
	Static_Data: null,
	Code: (async function countLineRecord (context) {
		const [amountData, lengthData] = await Promise.all([
			sb.Query.getRecordset(rs => rs
				.select("Amount", "Timestamp")
				.from("chat_data", "Message_Meta_Channel")
				.where("Channel = %n", context.channel.ID)
				.orderBy("Amount DESC")
				.limit(1)
				.single()
			),
	
			sb.Query.getRecordset(rs => rs
				.select("Length", "Timestamp")		
				.from("chat_data", "Message_Meta_Channel")
				.where("Channel = %n", context.channel.ID)
				.orderBy("Length DESC")
				.limit(1)
				.single()
			)
		]);
	
		return {
			reply: [
				"This channel's records are",
				amountData.Amount + " messages/min",
				"(" + amountData.Timestamp.format("Y-m-d H:i") + ");",
				"and",
				sb.Utils.round(lengthData.Length / 1000, 2) + " kB/min",
				"(" + lengthData.Timestamp.format("Y-m-d H:i") + ")"
			].join(" ")
		};		
	}),
	Dynamic_Description: null
};