const fs = require("fs");
const path = require("path");
const { stdout } = require("process");

const sourceDir = path.join(__dirname, "files");
const destinationDir = path.join(__dirname, "files-copy");

const copyDir = () => {
  fs.promises
    .mkdir(destinationDir, { recursive: true })
    .catch((err) => stdout.write(err));

  fs.promises.readdir(sourceDir, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
      fs.copyFile(
        path.join(sourceDir, file.name),
        path.join(destinationDir, file.name),
        (err) => {
          if (err) stdout.write(err);
        }
      );
    });
  });
};
copyDir();
