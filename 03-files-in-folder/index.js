const fs = require("fs");
const path = require("path");

const toKilobytes = 1000;

const dirPath = path.join(__dirname, "secret-folder");
fs.readdir(dirPath, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((el) => {
    fs.stat(`${dirPath}/${el}`, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        let size = stats.size / toKilobytes;
        console.log(
          `${path.basename(
            `${dirPath}/${el}`,
            path.extname(`${dirPath}/${el}`)
          )} - ${path.extname(`${dirPath}/${el}`).slice(1)} - ${size}kb`
        );
      }
    });
  });
});
