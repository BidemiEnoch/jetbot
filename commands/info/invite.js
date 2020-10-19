"use strict";
const Command= require("../../classes/command");

const invite=(message)=>{
   const { channel }=message;
   const txt="heyy be free to invite me to your server..here is my invite link\n";
   const link="<https://discordapp.com/oauth2/authorize?client_id=465578020665688074&permissions=356904022&scope=bot>";
   channel.send(`${txt}${link}`);
}



const command=new Command("info");
command.setDescription("displays my invite link so you can add me to more servers");
command.isGuildOnly=false;
command.setFunc(invite);
module.exports=command;