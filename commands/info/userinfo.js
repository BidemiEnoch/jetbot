"use strict";

const jet=require("../../classes/client");
const { getId }=require("../../tools/basicFuncs");
const{ EmbedColors,Errors }=require("../../tools/constants");
const Command= require("../../classes/command");


const userinfo=(param, message)=>{
   const { channel,guild,author }=message;
  let member;
  if(param==="")  member=guild.members.get( author.id );
  else  member=guild.members.get(getId(param));
  if(!member) return GetDiscordUser(param,message);

   const { user,nick,id,joinedTimestamp,roles }=member,
              name=user.tag,
              pfp=user.displayAvatarURL,
              roleArray=roles.array(),
              joinedServer=new Date(joinedTimestamp),
              joinedDiscord=user.createdAt;
              
  let roleNames=[];
  for(const { name } of roleArray){
        if(name==="@everyone") continue;
        roleNames.push(name);  }
  roleNames=roleNames.join(" ,");

   const embed=jet.Embed
                               .setAuthor(name,pfp)
                               .setThumbnail(pfp)
                               .addField("nickname:",nick?nick:"...", true)
                               .addField("id:",id, true)
                               .addField("roles on this server",roleNames)
                               .addField("joined server:",joinedServer, true)
                               .addField("account created on",joinedDiscord)
                               .setColor(EmbedColors.info); 
  if(user.bot) 
        embed.addField("bot","true");
  channel.send( embed );

}


const GetDiscordUser=async(param,message)=>{
   const { channel }=message;
   let user;
   try{ user=await jet.fetchUser(getId(param)); }
   catch(e){ return message.reply(Errors.invalid_user);  }
   const { username,discriminator,avatar,id }=user,
              name=`${username}#${discriminator}`,
              pfp=Urls.userAvatar(id,avatar),
              footer="user is not a member of this server";
   const embed=jet.Embed
                               .setAuthor(name,pfp)
                               .setThumbnail(pfp)
                               .addField("id:",id, true)
                               .setColor(EmbedColors.info)
                               .setFooter(footer);
   if(user.bot) 
        embed.addField("bot","true");
   channel.send(embed);
}


const command=new Command("info","@user",true);
command.setPerms(["EMBED_LINKS"]);
command.setDescription("displays information about a specified user.displays your's if no user is specified");
command.setFunc(userinfo);
module.exports=command;
	