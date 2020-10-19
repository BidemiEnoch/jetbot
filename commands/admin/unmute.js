"use strict";

const jet=require("../../classes/client");
const { getId }=require("../../tools/basicFuncs");
const { Errors,RegPatterns }=require("../../tools/constants");
const Command= require("../../classes/command");




const unmute=async(param,message)=>{
	const { channel,guild }=message;
	const { isMuteRole }=RegPatterns;
	
	const member=guild.members.get( getId(param) );
	if(!member) return message.reply(Errors.invalid_member);
	const searchFn=r=>isMuteRole.test(r.name);
	const mutedRole=member.roles.find(searchFn);
	if(!mutedRole)
       return channel.send("this member has no muted role");
	if(!jet.mutedUsers.has(member.id))
	   return channel.send("i did not instantiate the mute on this member,i cannot unmute them");
	try{
		await member.removeRole(mutedRole);
		jet.mutedUsers.delete(member.id);
		channel.send(`${member.displayName} has been unmuted`);
		}
	catch(e){
		channel.send("could not unmute member"); }
	}
	
	
	

const command=new Command("admin","@member");
command.setAccess("admin");
command.setPerms(["MANAGE_ROLES"]);
command.setDescription("removes a \"muted\" role from a user ,which allows them to send messages in the guild");
command.setFunc(unmute);
module.exports=command;
