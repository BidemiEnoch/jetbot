module.exports=(e)=>{
  if(/^(s|sec(s?)|second(s?))+$/i.test(e)) return "s";
  if(/^(m|min(s?)|minute(s?))+$/i.test(e)) return "m";
  if(/^(h|hr(s?)|hour(s?))+$/i.test(e)) return "h";
  if(/^(d|day(s?))+$/i.test(e) ) return "d";
  if(/^(w|wk(s?)|week(s?))+$/i.test(e)) return "w";
  throw new Error("invalid units were provided")
}