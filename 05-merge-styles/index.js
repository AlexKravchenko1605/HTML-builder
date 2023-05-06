const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "styles");
const bundlePath = path.join(__dirname, "project-dist", "bundle.css");
const writeStream = fs.createWriteStream(bundlePath);

const createBundles = async () => {
  try {
    const files = await fs.promises.readdir(path.join(sourceDir), {
      withFileTypes: true,
    });
    for (const file of files) {
      let filePath = path.join(sourceDir, file.name);
      if (file.isFile() && path.extname(file.name) === ".css") {
        fs.createReadStream(filePath).pipe(writeStream);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

createBundles();
