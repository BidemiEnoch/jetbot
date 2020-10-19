"use strict";

const jet=require("./client");
const AwaitingMessage=require("./awaitingMessage");

class SlideTab extends AwaitingMessage{
  constructor(data,attachedFunction,userID){
     super();
     this.index=0;
     this.data=data;
     this.message=null;
     this.emotes=["\⏪","\⏩","\🔢","❌" ];
     this.attachedFunction=attachedFunction;
     this.userID=userID;
     this.awaitingMessage=null;
     this.remove=this.remove.bind(this);
     this.timer=null;
     
    }
    
    //initiates the slide tab
    async initAt(channel){
      if(!this.data.length)
            return channel.send("oops!!no data was found in this aspect");
      this.message=await channel.send(this.getEmbed());
      if(this.data.length===1) return;
      jet.slideTabs.set(this.userID,this);
      try{
          for(const e of this.emotes)
               await this.message.react(e); 
          this.timer=setTimeout(this.remove,15000);
      }
      catch(e){  this.remove(); }
   }
   
    //scrolls the slide tab
    scroll(reaction){
       this._removeAwaitingMessage();
                   
      if(reaction===this.emotes[0])
           this.index--;
      else if(reaction===this.emotes[1])
           this.index++;
      else if(reaction===this.emotes[2]&&!this.awaitingMessage)
           return this._createAwaitingMessage();
       else if(reaction===this.emotes[3])
           return this.remove();

       if(this.index<0)
             this.index=this.data.length-1;
       else if(this.index===this.data.length)
             this.index=0;
           
       this.update();
       }
       
    //updates the slide tab
    async update(){
        try{ 
            await this.message.edit(this.getEmbed()); }
        catch(e){ this.remove(); }
        }
       
    //removes the slide tab
    async remove(){
      clearTimeout(this.timer);
      try{  await this.message.clearReactions();   }
      catch(e){ console.log(e); }
      jet.slideTabs.delete(this.userID);
    }

   //gets an embed of the current index
    getEmbed(){
      const data=this.data[this.index];
      const embed=this.attachedFunction(data);
      if(this.data.length>1)
        embed.setFooter(`${this.index+1} out of ${this.data.length}`);
      return embed;
 }
 
       
}


module.exports=SlideTab;
