const path = require("path");
const fs = require("fs");

const finalyDirectory = path.join(__dirname, "project-dist");
const finalyAssets = path.join(finalyDirectory, "assets");
const componentsDirectory = path.join(__dirname, "components");
const styleDirectory = path.join(__dirname, "styles");
const finalyStyleCss = path.join(finalyDirectory, "style.css");
const writeStream = fs.createWriteStream(finalyStyleCss);
const templateHTML = path.join(__dirname, "template.html");
const assetsDirectory = path.join(__dirname, "assets");

const copyDir = async (from, to) => {
  try {
    await createFolder(to);
    const folderData = await readFolder(from);
    await copyFiles(folderData, from, to);
  } catch (error) {
    throw new Error(error);
  }
};

const createFolder = async (folder) => {
  fs.promises.mkdir(folder, { recursive: true });
};

const readFolder = async (folder) => {
  const filesNames = await fs.promises.readdir(folder, {
    withFileTypes: true,
  });
  return filesNames;
};

const copyFiles = async (fileNames, from, to) => {
  for (let file of fileNames) {
    const fromFile = path.join(from, file.name);
    const toFile = path.join(to, file.name);
    if (file.isFile()) {
      await fs.promises.copyFile(fromFile, toFile);
    } else {
      await copyDir(fromFile, toFile);
    }
  }
};

const createCss = async () => {
  try {
    const files = await fs.promises.readdir(path.join(styleDirectory), {
      withFileTypes: true,
    });
    for (const file of files) {
      let filePath = path.join(styleDirectory, file.name);
      if (file.isFile() && path.extname(file.name) === ".css") {
        fs.createReadStream(filePath).pipe(writeStream);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

const buildHTMLFile = async (file, to) => {
  let templateContent = await fs.promises.readFile(file, "utf-8");
  let result = templateContent.matchAll(/{{(.*?)}}/g);
  for (let num of result) {
    const componentName = num[1];
    let componentFile = path.join(componentsDirectory, `${componentName}.html`);
    const componentFileValue = await fs.promises.readFile(
      componentFile,
      "utf-8"
    );
    templateContent = templateContent.replace(num[0], componentFileValue);
  }
  await fs.promises.writeFile(
    path.join(to, "index.html"),
    templateContent,
    "utf-8"
  );
};

const create = async () => {
  await createFolder(finalyDirectory);
  await copyDir(assetsDirectory, finalyAssets);
  await createCss();
  await buildHTMLFile(templateHTML, finalyDirectory);
};

create();
