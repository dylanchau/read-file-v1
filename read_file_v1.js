const fs = require('fs')
const path = require('path')

/**
 * List all files of a directory
 *
 * @param {String} dir the directory path
 */
function listAllFileOfDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err)
      }
      const allFiles = []
      files.map((f) => {
        if (fs.lstatSync(path.resolve(dir, f)).isFile()) {
          allFiles.push(f)
        }
        return allFiles
      })

      return resolve(allFiles)
    })
  })
}

/**
 * Read content of a file 
 * 
 * @param {String} fileName the name of file
 */
function readFileContent(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      const isEmptyFile = data.length === 0 || !!String(data).match(/^\s*$/)

      if (err || isEmptyFile) {
        err = err || new Error(`${fileName} is empty`)
        return reject(err)
      }

      resolve({ isEmptyFile, fileName, data })
    })
  })
}

listAllFileOfDir('./')
  .then((values) => {
    return Promise.all(values.map((file) => readFileContent(file)))
  })
  .then((values) => {
    console.log('Read files processing is finished')
    // values.forEach((value) => {
    //   const { isEmptyFile, fileName, data } = value
    //   if (isEmptyFile) {
    //     throw new Error(`${fileName} is empty file`)
    //   }
    // })
  })
  .catch((err) => console.error(err))
