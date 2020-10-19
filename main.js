"use strict";

const  jet =require("./classes/client");
const HandleMessage= require("./messageHandlers");
const IntervalProcess=require("./intervalProcess");
const FetchMutes=require("./tools/fetchMutes");

jet.configure();

jet.on('ready', () => { 
   const { size }=jet.guilds;
   const postfix=size>1?"guilds":"guild";
   jet.user.setActivity(`j:help in ${size} ${postfix}`);
   FetchMutes();
   setInterval(IntervalProcess,5000);
   console.log(" jet\'s ready"); 
}); 


jet.on('message', message => {
  const { content,author }= message;
  const { caller }=jet.config;
  if(author.bot||!content.startsWith(caller)) return;
  const param=content.substring(caller.length).trim();
  HandleMessage(message,param);
}); 



	
 
jet.on('messageReactionAdd', (reaction, user) => {
  const slideTab=jet.slideTabs.get(user.id);
  if(!slideTab) return;
 
  if(reaction.message.id!==slideTab.message.id||
     !slideTab.emotes.includes(reaction.emoji.name)) return;
  
  clearTimeout(slideTab.timer);
  slideTab.timer=setTimeout(slideTab.remove,30000);

  slideTab.scroll(reaction.emoji.name);
  if(reaction.emoji.name!=="❌")
     reaction.remove(user.id).catch();
});


jet.on("messageDelete", message =>{
  const searchFunc=e=>e.message.id===message.id ;
  const slideTab=jet.slideTabs.find(searchFunc);
  if(!slideTab) return;
  clearTimeout(slideTab.timer);
  jet.slideTabs.delete(slideTab.userID);

 });

jet.on("guildCreate",async guild=>{
   const { size }=jet.guilds;
   try{
      const { owner }=guild;
      await owner.send("thanks for adding me to your server"); 
      }
   catch(e){}
   const postfix=size>1?"guilds":"guild";
   jet.user.setActivity(`j:help in ${size} ${postfix}`);
});



jet.on("guildDelete",guild=>{
   const { size }=jet.guilds;
   const postfix=size>1?"guilds":"guild";
   jet.user.setActivity(`j:help in ${size} ${postfix}`);
});

jet.login(jet.config.SUPER_SECRET_FUCKING_TOKEN);

