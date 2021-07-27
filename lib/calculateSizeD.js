//require Node modules
const {execSync} = require('child_process');

const calculateSizeD = itemFullStaticPath => {
	//escape spaces, tabs, etc.
	const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');
	
	const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();
	
	console.log(commandOutput);
	
	//remove spaces, tabs, etc
	let filesize = commandOutput.replace(/\s/g, '');
	
	//isolate the filesize from the rest of the path which starts at C:\Users...etc
	let final = '';
	for(i=0;i<filesize.length;i++){
		if(filesize[i]=='C'){
			break;
		}
		final += filesize[i];
	}
	
	//create human readable format and in bytes
	let number, unit, filesizeBytes;
	if(final === '0'){
		final = '0B';
	}else{
		//extract unit
		unit = final.replace(/\d|\./g, '');
		
		//extract size number
		number = parseFloat(final.replace(/(a-z)/i, ''));
		
		//establish file size in bytes
		const units = "BKMGT";
		filesizeBytes = number * Math.pow(1024, units.indexOf(unit));
	}
	
	
	return [final, filesizeBytes];
	
};

module.exports = calculateSizeD;