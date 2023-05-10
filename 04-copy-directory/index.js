const fs = require("fs");
const path = require("path");
const { stdout } = require("process");

const sourceDir = path.join(__dirname, "files");
const destinationDir = path.join(__dirname, "files-copy");

const copyDir = async (from, to) => {
  try {
    await deleteFolder(destinationDir);
  } catch (error) {
    console.log(error);
  } finally {
    await createFolder(to);
    const folderData = await readFolder(from);
    await copyFiles(folderData, from, to);
  }
};

const createFolder = async (folder) => {
  fs.promises.mkdir(folder, { recursive: true });
};

const deleteFolder = async (folder) => {
  await fs.promises.rm(folder, { recursive: true });
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

copyDir(sourceDir, destinationDir);
