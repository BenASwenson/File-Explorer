const {execSync} = require('child_process');

try{
	const result = execSync(`du -sh "/c/Users/ben/desktop/NodeProject-FileExplorer2"`).toString();
	console.log(result);
}catch(err){
	console.log(`Error: ${err}`);
}