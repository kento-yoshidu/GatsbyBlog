import React from "react"

const IO = () => {
	// 今回の交差を監視する要素
	const boxes = document.querySelectorAll(".box");

	const options = {
		root: null, // 今回はビューポートをルート要素とする
		rootMargin: "-50% 0px", // ビューポートの中心を判定基準にする
		threshold: 0 // 閾値は0
	};

	const observer = new IntersectionObserver(doWhenIntersect, options);
	// それぞれのboxを監視する
	boxes.forEach(box => {
		observer.observe(box);
	});

	/**
	 * 交差したときに呼び出す関数
	 */
	function doWhenIntersect(entries) {
		// 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				activateIndex(entry.target);
			}
		});
		//window.alert('hoge')
	}

	/**
	 * 目次の色を変える関数
	 * @param element
	 */
	function activateIndex(element) {
		// すでにアクティブになっている目次を選択
		const currentActiveIndex = document.querySelector("#indexList .active");
		// すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
		if (currentActiveIndex !== null) {
			currentActiveIndex.classList.remove("active");
		}
		// 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
		const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
		newActiveIndex.classList.add("active");
	}
}

export default IO
