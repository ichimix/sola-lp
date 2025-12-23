import { SiteInit } from './assets/siteinit';
import { SA } from './assets/scrollAnimation';
import { CSSAcdn } from './assets/accordion';

/*
SiteInit option default
{
	menuBtn: '#menuBtn', //メニューボタンのセレクタ
	menu: '#menu', //メニューのセレクタ
	menuBtnSwitch: 'on', //メニューを開く時にメニューボタンに追加するクラス
	menuSwitch: 'show', //メニューを開く時にメニューに追加するクラス
	anchorIgnore: '.noscroll', //スムーススクロールを適用しない要素のセレクタ
	anchorSpeed: 300, //スムーススクロールのスピード
	anchorCallback: null, //スムーススクロール時に実行するコールバック関数
}
メソッド
siteInit.anchorScroll(href, cb); // hrefまでスムーススクロールさせる。hrefはセレクタorDOMオブジェクト cbはコールバック
siteInit.menuToggle() // メニューの開閉を切り替える（メニューボタンとメニューのクラスを切り替える）
siteInit.menuOpen() // メニューを開く（メニューボタンとメニューに開く時用のクラスをセットする）
siteInit.menuClose() // メニューを閉じる（メニューボタンとメニューの開く時用のクラスを削除する）
*/

const siteInit = new SiteInit({
	anchorCallback: function() {
		siteInit.menuClose(); //スムーススクロール時にメニューを閉じる処理
	}
});


/*
ScrollAnimation option default
{
	selector: '.anm', //スクロールアニメーションを適用する要素のセレクタ
	margin: window.innerHeight * 0.2, //スクロールアニメーションを適用する要素を表示させる位置（デフォルトは画面の一番下から20%の位置）
	showClass: 'show', //スクロールアニメーションを適用する要素が表示位置に来た時に追加するクラス
}
*/

const sa = new SA();


/*
CSSAcdn option default
{
	switchClass: 'open', //開く時に追加するクラス名
}
*/

const acdn = new CSSAcdn();
const btns = document.querySelectorAll('.acdnButton');
const closeBtns = document.querySelectorAll('.acdnClose');
const acdnContents = document.querySelectorAll('.acdnContents');

for (let i = 0; i < acdnContents.length; i++) {
	acdnContents[i].classList.add('acdn-active');
}

for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener('click', (e) => {
		let target = e.currentTarget.nextElementSibling;
		acdn.toggle(target);
	}, false);
}

for (let i = 0; i < closeBtns.length; i++) {
	closeBtns[i].addEventListener('click', (e) => {
		let target = e.currentTarget.parentNode.parentNode.parentNode;
		acdn.close(target);
	}, false);
}
