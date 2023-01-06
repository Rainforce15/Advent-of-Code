let c=require("crypto"),i;module.exports=n=>{for(i=0;;i++)if(c.createHash("md5").update(n+i).digest("hex").substring(0,6)=="000000")return i}
