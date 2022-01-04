// ==UserScript==
// @name         ChikuwaTeamsMod
// @namespace    https://github.com/natade-jp/
// @version      0.1
// @description  Aim for a mod that converts thoughtless words into gentle words within Teams.
// @author       natade-jp
// @match        https://teams.microsoft.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
/// <reference path="..\node_modules\@types\jquery\JQueryStatic.d.ts" />

(function() {
	'use strict';

	/**
	 * スレッド情報
	 * @typedef {Object} ThreadData
	 * @property {string} id スレッドID
	 * @property {Element} thread スレッド
	 * @property {HTMLImageElement} icon_elements アイコン情報 
	 * @property {Element} name_elements 投稿者
	 * @property {Element} date_elements 投稿日
	 * @property {HTMLCollectionOf<HTMLDivElement>} text_elements テキスト（div要素の配列。innerHTMLで内部を変更してください）
	 */

	/**
	 * 処理を行う
	 * @param {ThreadData} thread_data
	 */
	const processing = function(thread_data) {
		console.log(thread_data.id + "_" + thread_data.name_elements.innerHTML);
	};

	/**
	 * スレッドから各種情報を抽出する
	 * @param {Element} thread 
	 * @returns {ThreadData}
	 */
	const extract = function(thread) {
		// 各種情報
		const profile_tag = thread.getElementsByTagName("profile-picture");
		const name_tag = thread.getElementsByClassName("ts-msg-name");
		const date_tag = thread.getElementsByClassName("ts-created");
		const text_tag = thread.getElementsByClassName("message-body-content");

		// 各種情報が1つのみである。恐らく１つのはず。
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
			icon_elements : icon_tag[0],
			name_elements : name_tag[0],
			date_elements : date_tag[0],
			text_elements : text_tag[0].getElementsByTagName("div")
		});
	};

	const onTimer = function() {
		console.log("START!")

		/**
		 * 書き込みをすべて取得
		 */
		const thread_array = document.getElementsByClassName("thread-body");
		for(const thread_id in thread_array) {
			
			const thread = thread_array[thread_id];

			// 既にチェック済みなら処理を行わない
			// @ts-ignore
			if(thread.dataset) {
				continue;
			}

			// チェック済みかどうかのフラグをたてる
			// @ts-ignore
			thread.dataset.c2f_checked = true;

			// 各種情報を抽出して
			const thread_data = extract(thread);
			if(thread_data) {

				// 処理を引き渡す
				processing(thread_data);
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

		// お試しで1回だけ実行する
		setTimeout(onTimer, 10000);
	};

	window.addEventListener("load", initFunction, false);

})();
