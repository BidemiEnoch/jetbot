"use strict";

const jet=require("../../classes/client");
const SlideTab=require("../../classes/SlideTab");
const { EmbedColors }=require("../../tools/constants");
const TimeParser=require("../../tools/timeutils/@index");
const Command= require("../../classes/command");


const seemutes=(message)=>{
	const { channel,guild,author }=message;
	const getMember=(e)=>{
		const guild=jet.guilds.get(e.guild_id);
		e.member=guild.members.get(e.id);
		return e; }
	const users=jet.mutedUsers.array()
                                                   .filter(e=>e.guild_id===guild.id)
                                                   .map(getMember);
   const slideTab=new SlideTab(users,SeeMutesEmbed,author.id);
   slideTab.initAt(channel);
}         


const SeeMutesEmbed=(data)=>{
	const { secondsToStringTime }= TimeParser;
	let { id,member,muteDuration,timeLeft }=data;
	
	if(!jet.mutedUsers.has(id)) timeLeft=""
	else timeLeft=secondsToStringTime(timeLeft); 
	
	muteDuration=secondsToStringTime(muteDuration/1000);
	const embed=jet.Embed
	                            .setTitle("muted users on this server")
	                            .setThumbnail(member.displayAvatarURL)
	                            .addField("name",member.displayName)
	                            .addField("mute duration",muteDuration)
	                            .addField("time left",timeLeft)
	                            .setColor(EmbedColors.other);
    return embed;
   }
	 
	
const command=new Command("info");
command.setPerms(["EMBED_LINKS","MANAGE_MESSAGES","ADD_REACTIONS"]);
command.setDescription("displays every muted user on the server the command is used in");
command.setFunc(seemutes);
module.exports=command;
	