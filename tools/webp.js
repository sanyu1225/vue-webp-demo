/**
 * 參考https://segmentfault.com/a/1190000023370005
 * 腳本位於tools目錄，即 ./tools/webp.js
 * 項目的源碼均位於src目錄，即 ./src/
 * 可以自行調整代碼中的部分目錄配置
 */
const imageMin = require('imagemin')
const imageMinWebp = require('imagemin-webp')
const path = require('path')
const fs = require('fs')

let quality = 75
let rootDir = path.join(__dirname, '../src')

async function init(dir) {
  console.log('start!')
  await loop(dir)
  console.log('completed!')
}

async function loop(dir) {
  let res = fs.readdirSync(dir, {
    withFileTypes: true,
  })
  await imageMin([path.join(dir, '*.{jpg,png}')], dir, {
    plugins: [
      imageMinWebp({
        quality: quality,
      }),
    ],
  })
  console.log(dir)
  for (let i = 0, length = res.length; i < length; i++) {
    if (res[i].isDirectory()) {
      await loop(path.join(dir, res[i].name))
    }
  }
}

if (process.argv.length >= 3) {
  if (process.argv[3]) {
    quality = process.argv[3]
  }
  let dir = path.join(__dirname, '../', process.argv[2])
  const stats = fs.statSync(dir)
  if (stats.isDirectory()) {
    rootDir = dir
    init(rootDir)
  } else if (stats.isFile()) {
    console.log('start!')
    imageMin([dir], path.dirname(dir), {
      plugins: [
        imageMinWebp({
          quality: quality,
        }),
      ],
    })
    console.log(dir)
    console.log('completed!')
  }
} else {
  init(rootDir)
}
