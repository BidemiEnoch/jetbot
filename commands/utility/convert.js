"use strict";
const convert=require("convert-units");
const { Errors }=require("../../tools/constants");
const Command= require("../../classes/command");



const convertFn=(param,message)=>{
   const { channel }=message;
   const args=param.split(" ");
   if(args.length!==2)
      return channel.send(Errors.long_input);
   const [ firstParam,unit2 ]=args;
   let [ amount ,unit1 ]=firstParam.match(/\d+|.+/g);  
   amount=parseInt(amount);     
    try{
      const value=convert(amount).from(unit1).to(unit2);
      channel.send(`${ firstParam } converted to ${unit2} is **${"`"}${value}${unit2}${"`"}**`);   }
   catch(e){
       message.reply("some of the conversion units provided where not recognised or the conversion types provided are incompatible,use `j:seeunits` to see all units"); }
}


const command=new Command("utility","<amount of unit1> <unit1> <unit2>");
command.setAccess("public");
command.isGuildOnly=false;
command.setDescription("converts quantities between two specified units e.g`convert 10kg g`");
command.setFunc(convertFn);
module.exports=command;
