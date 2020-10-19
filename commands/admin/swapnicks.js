"use strict";
const { Errors }=require("../../tools/constants");
const { getId,shuffleArr,parseUsers }=require("../../tools/basicFuncs");
const Command= require("../../classes/command");


const swapNicks=async(param,message)=>{
   const { guild,channel }=message;
   param=parseUsers(param);
   if(!param)
       return message.reply(Errors.invalid_members);
   if(param.length<2)
        return message.reply("this command requires the mention of two or more users");
   const members=param.map(p=>guild.members.get( getId(p))); 
   if( members.some(e=>!e) )
         return message.reply(Errors.invalid_members);
         
   let displayNames=members.map(m=>m.displayName);
   
   if(members.length===2)  
       displayNames=displayNames.reverse();
   else displayNames=shuffleArr(displayNames);
   try{
       for(const n in displayNames)
            await members[n].setNickname(displayNames[n])
       channel.send("nicks swapped"); 
       } 
  catch(e){
       channel.send(Errors.missing_perms); }

}


const command=new Command("admin","@members");
command.setAccess("admin");
command.setPerms(["MANAGE_NICKNAMES"]);
command.setDescription("interchanges the nicknames of the members specified");
command.setFunc(swapNicks);
module.exports=command;


