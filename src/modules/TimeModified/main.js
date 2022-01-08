/// <reference path="..\..\main\main.js" />
/// <reference path="..\..\..\node_modules\@types\jquery\JQueryStatic.d.ts" />

/**
 * 初期化
 */
// @ts-ignore
const initialize = function() {
};

/**
 * Teams の時刻表記を相対的な時刻から絶対的な時刻へ切り替える
 * @param {TeamsMessageData} message_data
 */
// @ts-ignore
const processing = function(message_data) {

	if(message_data.date_elements === null) {
		return;
	}

	/**
	 * @type {string}
	 */
	// @ts-ignore
	const innerText = message_data.date_elements.innerText;

	// YYYY/MM/DD 形式であれば特に変更なし
	if(/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/.test(innerText)) {
		return;
	}

	// YY/MM/DD 形式であれば、YYYY/MM/DD 形式へ変換する
	if(/^[0-9]{2}\/[0-9]{1,2}\/[0-9]{1,2}/.test(innerText)) {
		const date = (new Date()).getFullYear().toString();
		// @ts-ignore
		message_data.date_elements.innerText = date.substring(0, 2) + innerText;
		return;
	}

	/**
	 * 時刻
	 */
	 const title = message_data.date_elements.getAttribute("title");
	 if(!title) {
		 return;
	 }
 
	// YY月MM日 形式であれば、YYYY/MM/DD 形式へ変換する
	if(/^[0-9]{1,2}月[0-9]{1,2}日/.test(title)) {
		const date = (new Date()).getFullYear().toString();
		// @ts-ignore
		message_data.date_elements.innerText = title.replace(/(.*)(月)(.*)(日)/, date + "/$1/$3");
		return;
	}

};
