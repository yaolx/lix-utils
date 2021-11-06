const fs = require('fs')
const beautify = require('js-beautify').js_beautify
const args = require('minimist')(process.argv.slice(2))

const devModel = args._.includes('dev')
const dist = `${__dirname}/`
const file = 'package.json'

// 1.读取package.json配置文件 2.版本迭代+1 3.写入package.json
const readFile = (path, fileName) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(`${path}/${fileName}`, {
      flag: 'r+',
      encoding: 'utf8'
    }, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
  return promise
}
// 2.将版本迭代加1
const plusVersion = (json) => {
  const {
    version
  } = json
  const versions = version
    .split('.')
    .map(_ => Number(_.replace(/[^0-9]/ig, '')))
  const lastIndex = versions.length > 0
    ? versions.length - 1
    : 0
  versions.splice(lastIndex, 1, 1 + versions[lastIndex])
  return beautify(JSON.stringify(Object.assign(json, {
    version: versions.join('.') + (devModel ? '-dev' : '')
  })))
}
const writeFile = (path, fileName, text) => {
  const tdata = Buffer.from(text)
  fs.writeFile(`${path}/${fileName}`, tdata, {
    indent_size: 4
  }, () => { })
}
readFile(dist, file)
  .then(data => plusVersion(JSON.parse(data)))
  .then(text => writeFile(dist, file, text))
