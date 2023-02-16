const posthtml = require("posthtml")
const attrsSorter = require("posthtml-attrs-sorter")
const fs = require("fs")
const path = require("path")
const prettier = require("prettier")

const attrsSortOptions = {
  order: [
    "rel",
    "class",
    "id",
    "name",
    "data-.+",
    "ng-.+",
    "src",
    "for",
    "href",
    "type",
    "value",
    "values",
    "title",
    "alt",
    "role",
    "aria-.+",
    "width",
    "height",
    "loading",
    "$unknown$",
  ],
}

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles ||= []

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles)
    } else if (path.extname(file) === ".html") {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}
const result = getAllFiles("layouts")

result.forEach((filePath) => {
  const htmlRaw = fs.readFileSync(filePath, "utf8")
  posthtml()
    .use(attrsSorter(attrsSortOptions))
    .process(htmlRaw)
    .then(async (result) => {
      fs.writeFileSync(filePath, result.html, "utf-8")
      const file = fs.readFileSync(filePath, "utf8")
      const formattedFile = await prettier
        .resolveConfig(filePath)
        .then((options) => prettier.format(file, options))
      fs.writeFileSync(filePath, formattedFile, "utf-8")
    })
})
