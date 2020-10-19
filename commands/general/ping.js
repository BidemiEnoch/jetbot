"use strict";
const jet=require("../../classes/client");
const Command= require("../../classes/command");

const ping=async(message)=>{
   const { channel }=message;
   const m = await channel.send("Ping?");
   m.edit(` 🏓you were ponged at a speed of ${Math.round(jet.ping)}ms`);
}



const command=new Command("general");
command.setDescription("runs a connection test to discord");
command.isGuildOnly=false;
command.setFunc(ping);
module.exports=command;