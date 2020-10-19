"use strict";

const Command= require("../../classes/command");


const emotify=(param,message)=>{
   const { channel }=message;
   const text=Gen(text);
   channel.send("emotified-text:"+text);
}

const Gen=(param)=>{
	param=param.split("").map(e=>e.toLowerCase());
	let text;
	for(const char of param)
        text+=/^[a-z]$/.test(char)?`:regional_indicator_${char}:`:char;
     return text;
}

const command=new Command("fun","<text>");
const text=Gen("text");
command.setDescription(`converts a specific text to ${text}`);
command.isGuildOnly=false;
command.setFunc(emotify);
module.exports=command;
