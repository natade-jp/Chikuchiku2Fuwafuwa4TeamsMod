/// <reference path="..\..\main\ChikuwaTeamsMod.js" />
/// <reference path="..\..\..\node_modules\@types\jquery\JQueryStatic.d.ts" />

/**
 * 初期化
 */
const initialize = function() {
};

/**
 * 処理を行う
 * @param {TeamsMessageData} message_data
 */
const processing = function(message_data) {

	const title = message_data.date_elements.getAttribute("title");
	if(!title) {
		return;
	}

	/**
	 * @type {string}
	 */
	// @ts-ignore
	const innerText = message_data.date_elements.innerText;

	// YYYY/MM/DD
	if(/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/.test(innerText)) {
		return;
	}

	// YY/MM/DD
	if(/^[0-9]{2}\/[0-9]{1,2}\/[0-9]{1,2}/.test(innerText)) {
		// @ts-ignore
		message_data.date_elements.innerText = "20" + innerText;
		return;
	}

	// YY月MM日
	if(/^[0-9]{1,2}月[0-9]{1,2}日/.test(title)) {
		const date = (new Date()).getFullYear().toString();
		// @ts-ignore
		message_data.date_elements.innerText = title.replace(/(.*)(月)(.*)(日)/, date + "/$1/$3");
		return;
	}

};
