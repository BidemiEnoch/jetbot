"use strict";

const { Errors }=require("../../tools/constants");
const Command= require("../../classes/command");

const troll=(param,message)=>{
   const { channel,guild }=message,
                user=guild.members.get(getId(param));
   if(!user)  return message.reply(Errors.invalid_member);

   channel.send(`whats that punk smeell?is tha..is that ${user}\'s mouth?`);
}


const command=new Command("fun","@user");
command.setDescription("trolls a user,good way to roast your friends");
command.isGuildOnly=false;
command.setFunc(troll);
module.exports=command;