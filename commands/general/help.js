"use strict";
const jet=require("../../classes/client");
const { Errors }=require("../../tools/constants");
const Command= require("../../classes/command");

const help=async(param,message)=>{
  if(param!=="")  return RunCommandHelp(param,message);

  const { author,channel }=message;
  const { categories,config } = jet;
  const { ownerID }=config;
  let embeds="";
  for(const header in categories){
    const category=categories[header];
    let lines=[];
    for(const [k,command] of category){
       const { args,description,access,hasOptionalArgs }=command;
       const isOptional=hasOptionalArgs?"❓":"";
       if(author.id!==ownerID&&access==="owner")continue;
       if(args)
          lines+=`${k} (${args})${isOptional}\n`;
      else lines+=`${k}\n`
         }
    embeds+=`**${header}**\n\`\`\`${lines}\`\`\``;
   }
       
  const header="These are the commands available to you,\nbe sure to prefix 'j:' before using anyone of them\ncommands with a '❓'symbol after them mean those commands can be called without an argument";
  
  const output=`${header}\n${embeds}`;
  try{
      await author.send(output);
      if(channel.type!=="dm")
            channel.send("you have been sent a dm📬");  }
  catch(e){       
      if(channel.type!=="dm")
            message.reply("i could not send you a dm"); 
      else message.reply("an error occurred");
  }
}




const RunCommandHelp=(input,message)=>{
  const { commands,config }=jet;
  const { ownerID }=config;
  const { channel,author }=message;
  
  if(!commands.has(input))
       return message.reply(Errors.invalid_command);
  const command=commands.get(input);
  
  if(command.access==="owner"&&author.id!==ownerID) 
       return message.reply(Errors.no_access);
  const{ args,description,isGuildOnly,hasOptionalArgs }=command;
  const optionalArgs="this command can be used without arguments\n";
  const head=`**usage**=>j:${input} ${args}`;
  const body=`**description**=>${description}`;
  const footer=`**can be used in dm's?**=>${!isGuildOnly}`;
  const txt=`${hasOptionalArgs?optionalArgs:""}${head}\n${body}\n${footer}`;
  channel.send(txt);
}


const command=new Command("general","<command>",true);
command.setDescription("displays a list of every available command .If a command is specified, displays details about that command");
command.isGuildOnly=false;
command.setFunc(help);
module.exports=command;

