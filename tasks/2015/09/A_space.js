let T,C={},B=1/0,S=module.exports=(n,p=[],e=0,N=n.trim().split("\n").map(l=>l.split(/ to | = /g).map(e=>isNaN(e)?C[e]=e:parseInt(e))))=>{let c=p[p.length-1];if(p.length==Object.keys(C).length&&e<B)B=e;for(let[a,b,d]of N)if(!c){S(n,[a],0,N);S(n,[b],0,N)}else{T=(x,y)=>{if(c==x&&!p.includes(y))S(n,[...p,y],e+d,N)};T(a,b);T(b,a)}return B}