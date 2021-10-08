import React, { useEffect } from "react"

//import * as Styles from "../styles/IOTest.module.scss"

const options = {
	rootMargin: "10px",
	threshold: 0
}

const Test: React.VFC = () => {

	/*
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
	 *
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
	 *
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
	*/

	return (
		<>
			<aside className={Styles.indexWrapper}>
				<h1>目次</h1>
				<ol id="indexList" className={`${Styles.index} index`}>
					<li><a href="#index1">Lorem</a></li>
					<li><a href="#index2">Ipsum </a></li>
					<li><a href="#index3">Dolor</a></li>
					<li><a href="#index4">Sit amet</a></li>
					<li><a href="#index5">Consectetur</a></li>
				</ol>
			</aside>

			<hr />

			<main className="contents">
				<div className={`${Styles.box} ${Styles.box1} box active`} id="index1">
					aaa
				</div>

				<div className={`${Styles.box} ${Styles.box2} box`} id="index2">
					bbb
				</div>

				<div className={`${Styles.box} ${Styles.box3} box`} id="index3">
					ccc
				</div>

				<div className={`${Styles.box} ${Styles.box4} box`} id="index4">
					ddd
				</div>

				<div className="box" id="index5" style={{height: "100vh"}}>
					eee
				</div>
			</main>
		</>
	)
}

export default Test