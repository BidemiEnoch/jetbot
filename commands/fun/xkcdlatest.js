"use strict";

const jet=require("../../classes/client");
const axios=require("axios");
const{ EmbedColors,Urls }=require("../../tools/constants");
const { datePostfix }=require("../../tools/basicFuncs");
const Command= require("../../classes/command");



const xkcdlatest=async(message)=>{
   const { channel }=message;
   const msg=await channel.send("fetching image");
   try{
      const { data }=await axios.get(Urls.xkcd());

      const postfix=datePostfix(data.day),
                title=data.safe_title,
                date=`xkcd no ${data.num},created on ${data.day}${postfix} of ${ jet.month[data.month-1] } ${ data.year }`,
                title_description=data.alt;
     const embed=jet.Embed
                                .setTitle(title)
                                .addField("description",title_description)
                                .setImage(data.img)
                                .setColor(EmbedColors.xkcd)
                                .setFooter(date);
     msg.edit( embed );
  }
  catch(e){  msg.edit("An error occured");  }

}



const command=new Command("fun");
command.setPerms(["EMBED_LINKS"]);
command.setDescription("generates the latest xkcd comic");
command.isGuildOnly=false;
command.setFunc(xkcdlatest);
module.exports=command;
