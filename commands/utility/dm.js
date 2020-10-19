"use strict";
const jet=require("../../classes/client");
const { getId }=require("../../tools/basicFuncs");
const { Errors }=require("../../tools/constants");
const Command= require("../../classes/command");


const dm=async(param,message)=>{
  const { channel }=message;
  const [ firstParam,lastParam="" ]= param.split(/\s(.+)/);
  const user= jet.users.get(getId(firstParam));
  if(!user) return message.reply(Errors.invalid_user);
  if(lastParam.length<3) 
    return message.reply("your words are too few");
  try{
      await user.send(`\"${lastParam}\"`)
      await channel.send("A dm has been sent");  }
  catch(e){ message.reply("could not send dm"); }
}


const command=new Command("utility","@user");
command.setAccess("owner");
command.setDescription("sends a dm to a specific user on discord(the user must be one of #Client.users)");
command.setFunc(dm);
module.exports=command;
