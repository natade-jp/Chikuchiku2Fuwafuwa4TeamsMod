/// <reference path="..\node_modules\@types\jquery\JQueryStatic.d.ts" />

/**
 * テキスト情報
 * @typedef {Object} TeamsMessageData
 * @property {string} id スレッドID
 * @property {Element} thread スレッド
 * @property {Element} chat チャット
 * @property {HTMLImageElement} icon_elements アイコン情報 
 * @property {Element} name_elements 投稿者
 * @property {Element} date_elements 投稿日
 * @property {HTMLCollectionOf<HTMLDivElement>} text_elements テキスト（div要素の配列。innerHTMLで内部を変更してください）
 */

(function() {
	'use strict';

	/**
	 * 処理を行う
	 * @param {TeamsMessageData} message_data
	 */
	const processing = function(message_data) {
		// @ts-ignore
		MODULES_PROCESSING
	};

	/**
	 * Teams のスレッドから各種情報を抽出する
	 * @param {Element} thread 
	 * @returns {TeamsMessageData}
	 */
	const extractThread = function(thread) {
		// 各種情報
		const profile_tag = thread.getElementsByTagName("profile-picture");
		const name_tag = thread.getElementsByClassName("ts-msg-name");
		const date_tag = thread.getElementsByClassName("ts-created");
		const text_tag = thread.getElementsByClassName("message-body-content");

		// 期待した情報か？
		if(
			(profile_tag.length !== 1) ||
			(name_tag.length !== 1) ||
			(date_tag.length !== 1) ||
			(text_tag.length !== 1)
		) {
			return null;
		}

		const icon_tag = profile_tag[0].getElementsByTagName("img");

		if(
			(icon_tag.length !== 1)
		) {
			return null;
		}

		return ({
			id : thread.id,
			thread : thread,
			chat : null,
			icon_elements : icon_tag[0],
			name_elements : name_tag[0],
			date_elements : date_tag[0],
			text_elements : text_tag[0].getElementsByTagName("div")
		});
	};

	/**
	 * Teams からスレッドを取得する
	 * @returns {HTMLCollectionOf<Element>}
	 */
	const getThread = function() {
		return document.getElementsByClassName("thread-body");
	};
	
	/**
	 * Teams の個別チャットから各種情報を抽出する
	 * @param {Element} chat 
	 * @returns {TeamsMessageData}
	 */
	 const extractChat = function(chat) {
		// 各種情報
		const name_tag = chat.getElementsByClassName("ui-chat__message__author");
		const date_tag = chat.getElementsByClassName("ui-chat__message__timestamp");
		const text_tag = chat.getElementsByClassName("ui-chat__message__content");

		/**
		 * @type {string}
		 */
		// @ts-ignore
		const id = chat.dataset.mid;

		// 期待した情報か？
		if(
			(!id) ||
			(name_tag.length !== 1) ||
			(date_tag.length !== 1) ||
			(text_tag.length !== 1)
		) {
			return null;
		}

		return ({
			id : id,
			thread : null,
			chat : chat,
			icon_elements : null,
			name_elements : name_tag[0],
			date_elements : date_tag[0],
			text_elements : text_tag[0].getElementsByTagName("div")
		});
	};

	/**
	 * Teams から個別チャットを取得する
	 * @returns {HTMLCollectionOf<Element>}
	 */
	 const getChat = function() {
		return document.getElementsByClassName("ui-chat__message");
	};
	
	const onTimer = function() {
		console.log("START!")

		/**
		 * スレッドから書き込みをすべて取得
		 */
		const thread_array = getThread();
		for(const thread_id in thread_array) {
			
			const thread = thread_array[thread_id];

			// 既にチェック済みなら処理を行わない
			if(thread.getAttribute("data-c2f_checked")) {
				continue;
			}

			// チェック済みかどうかのフラグをたてる
			// @ts-ignore
			thread.dataset.c2f_checked = true;

			// 各種情報を抽出して
			const thread_data = extractThread(thread);
			if(thread_data) {

				// 処理を引き渡す
				processing(thread_data);
			}
		}

		/**
		 * チャットから書き込みをすべて取得
		 */
		const chat_array = getChat();
		for(const chat_id in chat_array) {
			
			const chat = chat_array[chat_id];

			// 既にチェック済みなら処理を行わない
			if(chat.getAttribute("data-c2f_checked")) {
				continue;
			}

			// チェック済みかどうかのフラグをたてる
			// @ts-ignore
			chat.dataset.c2f_checked = true;

			// 各種情報を抽出して
			const chat_data = extractChat(chat);
			if(chat_data) {

				// 処理を引き渡す
				processing(chat_data);
			}
		}
	};

	/**
	 * 初期化を行う
	 */
	const initFunction = function() {
		console.log("TEST!")

		/**
		 * ターゲットサイトか
		 */
		const is_target = /^https:\/\/teams\.microsoft\.com\/[^\/]+\/conversations\//.test(location.href);
		if(!is_target) {
			return;
		}
		
		// @ts-ignore
		MODULES_INITIALIZE

		// お試しで1回だけ実行する
		setInterval(onTimer, 10000);
	};

	window.addEventListener("load", initFunction, false);

})();
