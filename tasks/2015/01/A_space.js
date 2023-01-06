// unsafe
module.exports=n=>[...n].reduce((s,v)=>s+=v=="("?1:-1,0)

// safe
//module.exports=n=>[...n].reduce((s,v)=>s+={"(":1,")":-1}[v]|0,0)
