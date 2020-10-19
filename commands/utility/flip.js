"use strict";
const Command= require("../../classes/command");

const flip=(param,message)=>{
   if(param==="")  param=["head","tail"];
   else param=param.split("|");
   const index=~~(Math.random()*param.length);
   message.reply(`after a random flip,my chosen word is...\n${"```"}${ param[index] }${"```"}`);
}

const command=new Command("utility","item1|item2...itemN",true);
command.setAccess("public");
command.isGuildOnly=false;
command.setDescription("selects a random choice out of a given set of choices,head&&tail are the default choices if no choices are specified");
command.setFunc(flip);
module.exports=command;
