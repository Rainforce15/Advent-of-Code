module.exports=n=>n.split("\n").reduce((s,v)=>s+=/(?=.*(..).*\1).*(.).\2/.test(v)?1:0,0)
