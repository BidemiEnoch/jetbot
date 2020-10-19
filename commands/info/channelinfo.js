"use strict";

const jet=require("../../classes/client");
const { getId }=require("../../tools/basicFuncs");
const{ EmbedColors,Errors }=require("../../tools/constants");
const Command= require("../../classes/command");


const channelinfo=(param,message)=>{
   const { guild }=message;
   let channel;
   if(param==="") 
        channel=message.channel;
   else channel=guild.channels.get( getId(param));

   if(!channel)
         return message.channel.send(Errors.invalid_channel);

   const { parent,members,topic,name,id,createdAt }=channel;
   let siblingChannels=[];
   for(const [key,value] of parent.children){
       if(key===refChannel.id) continue;
       const prefix= value.type==="text"?"#":"🔊";
       const isNsfw=value.nsfw?"(nsfw)":"";
       siblingChannels.push(`${prefix}${value.name}${isNsfw} `);
}
   siblingChannels=siblingChannels.join(" , ");

   const embed=jet.Embed
                              .setTitle(`#${name}(${id})`)
                              .addField("members",members.size)
                              .addField("siblings",siblingChannels)
                              .addField("topic",topic)
                              .addField("created on",createdAt)
                              .setColor(EmbedColors.info); 

   message.channel.send( embed );

}



const command=new Command("info","#channel",true);
command.setPerms(["EMBED_LINKS"]);
command.setDescription("displays info about a specified channel, displays info of the current channel if no argument is specified");
command.setFunc(channelinfo);
module.exports=command;