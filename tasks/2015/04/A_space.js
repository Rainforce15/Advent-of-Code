let c=require("crypto"),i=0;module.exports=n=>{for(;;i++)if(c.createHash("md5").update(n+i).digest("hex").substring(0,5)=="00000")return i}
