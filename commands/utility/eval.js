"use strict";
const jet=require("../../classes/client");
const axios=require("axios");
const StringifyObject=require("stringify-object");
const{ Urls }=require("../../tools/constants");
const Command= require("../../classes/command");


const ev=(param,message)=>{
   const { channel }=message;
   try{
      let { output,execTime }=jet.EvalCode(param,message);
      const outputType=typeof output;
      if(outputType==="object"&&!(output instanceof Map))
         output=StringifyObject(output);
      else output=`${output}`;
      if(output.length<200)
         channel.send(`\`\`\`code:${param}\noutput:${output}\ntype:${outputType}\n⌚️:${execTime}ms\`\`\``);
      else UploadToHasteBin(channel,output,execTime,outputType);
      }
  catch(e){
      return channel.send("```code:"+param+"```\n```"+e+"```");
      }

}



const UploadToHasteBin=async(channel,output,execTime,type)=>{
  try{
	const { data }=await axios.post(`${Urls.hasteBin}/documents`,
                                       output );
    const { key }=data; 
    channel.send(`output uploaded to hastebin\n${Urls.hasteBin}/${key}\n\`\`\`type:${type}\n⌚️:${execTime}ms\`\`\``);
    }
 catch(e){
    channel.send("could not upload output to hastebin");
    }
  }
  
  
const command=new Command("utility","<code>");
command.setAccess("owner");
command.setDescription("evaluates a piece of code in my scope");
command.isGuildOnly=false;
command.setFunc(ev);
module.exports=command;
