const File = require("./File.js");

// パッケージ情報を取得
const package_info = JSON.parse(File.loadTextFile("./package.json"));

const code = {
	header  : "./src/main/header.js",
	main    : "./src/main/main.js",
	modules : "./src/modules",
	tmp 	: "./tmp",
	output  : "./build/ChikuwaTeamsMod.js"
};

// 各ファイルを取得する
const header	= File.loadTextFile(code.header);
const main		= File.loadTextFile(code.main);
const modules	= File.findDirectory(code.modules);

// tmp内のファイルを削除
const remove_files = File.findFiles(
	{
		source : code.tmp,
		includes : /\.js$/
	}
);
for(rem_file_num in remove_files) {
	File.deleteFile(remove_files[rem_file_num]);
}

// 各モジュールのデータを tmp へ移動してもらう
for(file_num in modules) {
	const dir_name = File.getFileName(modules[file_num]);
	const js_file = modules[file_num] + "/install.js";
	if(File.isFile(js_file)) {
		File.exec("node \"" + js_file + "\"");
	}
}

const install_files = File.findFiles(
	{
		source : code.tmp,
		includes : /\.js$/
	}
);

/**
 * @type {string[]}
 */
 const modules_text = [];

 /**
  * @type {string[]}
  */
 const initialize_text = [];
  
 /**
  * @type {string[]}
  */
 const processing_text = [];
 
for(rem_file_num in remove_files) {
	const js_file = remove_files[rem_file_num];
	const js_name = File.getFileName(js_file).replace(/\..*/, "");

	const js_file_text = File.loadTextFile(js_file);
	// 関数名が被らないように変更する
	const function_name_initialize = "ChikuwaTeamsMod_" + js_name + "_initialize";
	const function_name_processing = "ChikuwaTeamsMod_" + js_name + "_processing";
	const o1 = js_file_text.replace(/(^|\n)\/\/\/[^\n]+/g, "");
	const o2 = o1.replace(/(\nconst\s*)(initialize)(\s*=\s*function)/, "$1" + function_name_initialize + "$3");
	const o3 = o2.replace(/(\nconst\s*)(processing)(\s*=\s*function)/, "$1" + function_name_processing + "$3");
	// データを記録する
	modules_text.push(o3);
	initialize_text.push(function_name_initialize + "();");
	processing_text.push(function_name_processing + "(message_data);");
}

// データを結合
const build_code = header + "\n" + modules_text.join("\n") + 
	main.replace(/MODULES_PROCESSING/, processing_text.join("\n")).replace(/MODULES_INITIALIZE/, initialize_text.join("\n"));
;

// ファイルを作成
File.saveTextFileWithBOM(code.output, build_code);
