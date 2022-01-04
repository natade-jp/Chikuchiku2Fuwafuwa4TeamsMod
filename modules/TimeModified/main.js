/// <reference path="..\..\src\ChikuwaTeamsMod.js" />
/// <reference path="..\..\node_modules\@types\jquery\JQueryStatic.d.ts" />

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
	if(message_data.thread) {
		const title = message_data.date_elements.getAttribute("title");
		if(!title) {
			return;
		}

		/**
		 * @type {string}
		 */
		const innerText = message_data.date_elements.innerText;

		// 変更は不要
		if(innerText.match(/[0-9]{2,}\/[0-9]{1,2}[0-9]{1,2}/)) {
			return;
		}
	}


};
