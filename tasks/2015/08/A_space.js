module.exports=n=>n.length-n.replace(/\\x..|\\"|\\\\|"\n"/g,'?').length+2
