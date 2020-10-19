"use strict";
const jet=require("../../classes/client");
const Command= require("../../classes/command");

const printev=(param,message)=>{
   const { channel }=message;
   try{
      const { output,execTime }=jet.EvalCode(param,message);
      console.log(output);
      channel.send("```The code has been consoled.\n⏰:"+execTime+"ms```");
      }
  catch(e){
      return channel.send("```code:"+param+"```\n```"+e+"```");
      }
}


const command=new Command("utility","<code>");
command.setAccess("public");
command.isGuildOnly=false;
command.setDescription("prints an evaluated piece of code to the console");
command.setFunc(printev);
module.exports=command;