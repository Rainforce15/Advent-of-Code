module.exports=n=>n.replace(/(^")|("$)/gm,'???').replace(/["\\]/g,"??").length-n.length
