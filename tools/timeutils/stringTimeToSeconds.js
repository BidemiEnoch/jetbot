const parseSeconds=require("./getSeconds");

module.exports=(str)=>{
  let totalSecs=0;
  str=str.trim("").split(/\s+/);
  str.forEach(e=>{ totalSecs+=parseSeconds(e); });
  return totalSecs;
}

