const fs = require('fs');

/*
const fs = require('fs').promises;

fs.readFile('./text.txt', 'utf-8')
	.then(
		data => {
			const isEmptyFile = data.length === 0 || !!String(data).match(/^\s*$/)
			if (isEmptyFile === '') {
				throw new Error('Empty File')
			}
			console.log(data)
		}
	).catch(err => console.log(err))
*/

function readFileContent(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, 'utf-8', (err, data) => {
			if (err) {
				return reject(err)
			}
			
			const isEmptyFile = data.length === 0 || !!String(data).match(/^\s*$/)
			resolve({isEmptyFile, fileName, data})
		})
	})
}

Promise.all(['./text1.txt', './text2.txt', './text3.txt'].map(fileName => readFileContent(fileName)))
	.then(values => {
		values.forEach(value => {
			const {isEmptyFile, fileName, data} = value
			if (isEmptyFile) {
				throw new Error(`${fileName} is empty file`)
			}
		})
	})
	.catch(err => console.log(`${err}`)) 

/*
readFileContent('./text.txt')
	.then(value => {
		const {isEmptyFile, fileName, data} = value
		
		if (isEmptyFile) {
			throw new Error(`${fileName} is empty file`)
		}
		console.log(data)
	})
	.catch(err => console.log(`${err}`))
*/
	