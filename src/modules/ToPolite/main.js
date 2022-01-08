/// <reference path="..\..\main\main.js" />
/// <reference path="..\..\..\node_modules\@types\jquery\JQueryStatic.d.ts" />

/**
 * 初期化
 */
// @ts-ignore
const initialize = function() {

	/**
	 * くだけた表現を丁寧な表現へ変更する
	 * @param {string} message 
	 * @returns {string}
	 */
	const ctf_map = function(message) {
		// 5chの掲示板の書き込み等から適当に変換しやすいものを選択
		// 語尾多め

		let x = message.toString();
		x = x.replace(/くれん？/g, "頂けませんか？");
		x = x.replace(/ごめん|すまん/g, "すみません");
		x = x.replace(/じゃん/g, "です");
		x = x.replace(/じゃない(です)?/g, "ではないです");
		x = x.replace(/たっけ/g, "たでしたか");
		x = x.replace(/だな/g, "ですね");
		x = x.replace(/だね/g, "ですね");
		x = x.replace(/だろ$/g, "ですよね");
		x = x.replace(/たな$/g, "たのですよね");
		x = x.replace(/だよ/g, "ですよ");
		x = x.replace(/たわ$/g, "ました");
		x = x.replace(/たんで/g, "たので");
		x = x.replace(/でしょ？?/g, "です");
		x = x.replace(/ないな$/g, "ないです");
		x = x.replace(/ないの？/g, "ないですか");
		x = x.replace(/なった/g, "なりました");
		x = x.replace(/なの？/g, "なのですか");
		x = x.replace(/なんだが？?/g, "なのですが");
		x = x.replace(/なんで？/g, "なぜですか");
		x = x.replace(/の？/g, "のですか");
		x = x.replace(/([^ま])した？/g, "$1しましたか？");
		x = x.replace(/([^ま])した。?$/g, "$1しました");
		x = x.replace(/らん$/g, "らないです");
		x = x.replace(/るの？/g, "りますか");
		x = x.replace(/ろよ/g, "てください");
		x = x.replace(/やった？/g, "やりましたか");
		x = x.replace(/やった/g, "やりました");
		x = x.replace(/やってる/g, "実施している");
		x = x.replace(/やってん/g, "実施しているの");
		x = x.replace(/やれよ/g, "やってください");
		x = x.replace(/んなよ/g, "ないでください");
		x = x.replace(/([\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])？/g, "$1ですか？");

		x = x.replace(/終わった/g, "終わりました");
		x = x.replace(/笑った/g, "笑いました");

		// もう1回
		x = x.replace(/ですか/g, "でしょうか");
		return x;
	}

	// @ts-ignore
	globalThis.ctf_map = ctf_map;

};

/**
 * 丁寧な表現へ変換する
 * @param {TeamsMessageData} message_data
 */
// @ts-ignore
const processing = function(message_data) {

	// @ts-ignore
	if((message_data.text_elements === null) || (globalThis.ctf_map === undefined)){
		return;
	}

	for(let i = 0; i < message_data.text_elements.length; i++ ) {
		const div = message_data.text_elements[i];
		// @ts-ignore
		div.textContent = globalThis.ctf_map(div.textContent);
	}

};
