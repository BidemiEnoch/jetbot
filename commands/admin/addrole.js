"use strict";
const { Errors }=require("../../tools/constants");
const { getId }=require("../../tools/basicFuncs");
const Command= require("../../classes/command");



const addRole=async(param,message)=>{
  const { channel,guild }=message;
  const [ userMention,roleMention ]=param.split(/\s(.+)/);
  
   if(!roleMention)
      return message.reply("this command requires a user and a role argument");
   const member=guild.members.get( getId(userMention) );
   if(!member)  return message.reply(Errors.invalid_member);
   
   const searchRegex=new RegExp(`^${roleMention}+$`,"i");
   const role=guild.roles.find(r=>searchRegex.test(r.name))||
                      guild.roles.get( getId(roleMention));
  if(!role)  return message.reply(Errors.invalid_role);
  
  if(member.roles.has(role.id))
     return message.reply(`${member.displayName} already has that role`);
  try{
      await member.addRole(role);
      channel.send(`The **${role.name}** role has been added to user **${member.displayName}**`);
}
  catch(e){
     message.reply(Errors.missing_perms); }
}




const command=new Command("admin","@member @role");
command.setAccess("admin");
command.setPerms(["MANAGE_ROLES"]);
command.setDescription("adds a specified role to a user");
command.setFunc(addRole);
module.exports=command;
