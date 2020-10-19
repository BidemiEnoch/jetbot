"use strict";

const jet=require("../../classes/client");
const{ EmbedColors }=require("../../tools/constants");
const Command= require("../../classes/command");


const serverinfo=(message)=>{
  const { guild,channel }=message;
  const { name,iconURL,region,memberCount,owner,id,
               roles,channels,createdAt,presences,emojis }=guild;
 
  const { user }=owner,
             _channels={
                text:channels.filter(e=>e.type==="text").size,
                voice:channels.filter(e=>e.type==="voice").size,
                category:channels.filter(e=>e.type==="category").size };
  const counts=`members:${memberCount}(online:${presences.size})\nroles:${roles.size}\nchannels:(text:${_channels.text},voice:${_channels.voice },categories:${_channels.categories})\nemojis:${emojis.size}`;
  
  const embed=jet.Embed
                              .setTitle(`${name}(${id})`)
                              .addField("owner",`${user.tag}(${user.id})`)
                              .addField("region",region)
                              .addField("details", counts)
                              .addField("created on",createdAt)
                              .setThumbnail(iconURL)
                              .setColor(EmbedColors.info); 
  channel.send( embed );

}



const command=new Command("info");
command.setPerms(["EMBED_LINKS"]);
command.setDescription("displays information about the server the command is used in");
command.setFunc(serverinfo);
module.exports=command;
	