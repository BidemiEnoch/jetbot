"use strict";

const jet=require("../../classes/client");
const fs=require("fs");
const axios=require("axios");
const{ EmbedColors,Urls }=require("../../tools/constants");
const Command= require("../../classes/command");


const readfile=async(param,message)=>{
   const { channel }=message;
   if(!/^\S+(\.js)?$/.test(param))
        channel.send("invalid file path provided");
   param+=param.endsWith(".js")?"":".js";
   const m=await channel.send("searching for file...");
   try{
        const path="/storage/emulated/0/@jet/"+param;
        const data= fs.readFileSync(path,'utf8'); 
        if(data.length>500) 
             return PasteFileToHasteBin(param,m,data);
        const embed=jet.Embed
                                    .setTitle(`path(${ param })`)
                                    .addField("data","```"+data+"```")
                                    .setColor(EmbedColors.other);
       m.edit(embed);
    }
  catch(e){ 
       m.edit("An error occured:\n```"+e+"```"); }

}



const PasteFileToHasteBin=async(param,message,file)=>{
  try{
    message.edit("uploading file to hastebin..");
    const { data }=await axios.post(`${Urls.hasteBin}/documents`,
                                       file );
    const { key }=data;
    const embed=jet.Embed
                                .setTitle(`path(${ param })`)
                                .addField("data",`[click here to see file](${Urls.hasteBin}/${key})`)
                                .setFooter("due to the files size,it was uploaded to hastebin")
                                .setColor(EmbedColors.other);
    message.edit(embed);
   }
catch(e){
    message.edit("could not upload file to hastebin");
   }

}


const command=new Command("utility","<file-path>");
command.setAccess("owner");
command.setPerms(["EMBED_LINKS"]);
command.isGuildOnly=false;
command.setDescription("reads a file from my directory");
command.setFunc(readfile);
module.exports=command;
