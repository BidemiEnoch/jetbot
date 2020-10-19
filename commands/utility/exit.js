"use strict";
const Command= require("../../classes/command");


const exit=async(message)=>{
  await message.channel.send("Going...offline");
  process.exit(0);
}


const command=new Command("utility");
command.setAccess("owner");
command.isGuildOnly=false;
command.setDescription("calls `process.exit(0)` on this bot");
command.setFunc(exit);
module.exports=command;
