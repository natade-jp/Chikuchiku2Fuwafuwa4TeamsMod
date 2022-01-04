
/**
 * jsファイルのパス
 * @type {string}
 */
// @ts-ignore
const jsfile_path = __filename;

// カレントディレクトリを移動
const slashsplit = jsfile_path.split("\\");

/**
 * jsファイルのフォルダパス
 */
const jsdir_path = jsfile_path.substring(0, jsfile_path.length - slashsplit[slashsplit.length - 1].length - 1);

// カレントディレクトリを移動
// @ts-ignore
process.chdir(jsdir_path);

const File = require("../../scripts/File.js");

// ファイルを移動
File.copy("./main.js", "../../tmp/TimeModified.js");
