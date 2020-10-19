"use strict";

const jet=require("../../classes/client");
const { getId }=require("../../tools/basicFuncs");
const{ EmbedColors,Errors }=require("../../tools/constants");
const Command= require("../../classes/command");


const roleinfo=(param,message)=>{
	const { channel,guild }=message;
	const pattern=new RegExp(`^${param}$`,"i");
	const role=guild.roles.get(getId(param))||
	                   guild.roles.find(e=>pattern.test(e.name));
	if(!role)
	   return message.reply(Errors.invalid_role);
	const { name,id,hexColor,calculatedPosition,hoist,members,
	            createdAt }=role;
	const details=`position:${calculatedPosition}\nmembers:${members.size}`;
	const embed=jet.Embed
	                            .setTitle(`${name}(${id})`)
	                            .addField("details",details)
	                            .addField("is displayed separately in presences?",hoist)                            
	                            .addField("created on", createdAt)
	                            .setColor(hexColor);
	
	channel.send(embed);
}


const command=new Command("info","@role");
command.setPerms(["EMBED_LINKS"]);
command.setDescription("displays info about a specified role, the role mention is not required as the roles name, can also be provided");
command.setFunc(roleinfo);
module.exports=command;