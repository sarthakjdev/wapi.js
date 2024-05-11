const prettierWriteCommand = "pnpm prettier --write";

// eslint-disable-next-line no-undef
module.exports = {
  "*.ts": [prettierWriteCommand],
  "*.tsx": [prettierWriteCommand],
  "*.js": [prettierWriteCommand],
  "*.jsx": [prettierWriteCommand],
  "*.css": [prettierWriteCommand],
  "*.scss": [prettierWriteCommand],
};
