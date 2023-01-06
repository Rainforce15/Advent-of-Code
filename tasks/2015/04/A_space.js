let c=require("crypto"),i;module.exports=n=>{for(i=0;;i++)if(c.createHash("md5").update(n+i).digest("hex").substring(0,5)=="00000")return i}
