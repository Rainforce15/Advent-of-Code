//unsafe
module.exports=n=>{let f=0,i=0;for(let j of[...n]){f+=j=="("?1:-1;i++;if(f==-1)return i}}

//safe
//module.exports=n=>{let f=0,i=0;for(let j of[...n]){f+={"(":1,")":-1}[j]||0;i++;if(f==-1)return i}}
