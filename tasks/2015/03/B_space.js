let c=new Set(["0,0"]),a,s,r;a=s=[0,0],r=[0,0];module.exports=n=>([...n].forEach(d=>(a=a==s?r:s,c.add((a[0]+={">":1,"<":-1}[d]|0)+","+(a[1]+={"v":1,"^":-1}[d]|0)))),c.size)
