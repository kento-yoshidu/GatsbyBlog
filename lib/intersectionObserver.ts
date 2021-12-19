import React, { useRef } from "react"

import * as Styles from "../src/styles/tableOfContent.module.scss"

const IO = () => {
	// 今回の交差を監視する要素
	const boxes = document.querySelectorAll(".main > h1, h2, h3");

  console.log(boxes)

	const options = {
		root: null, // 今回はビューポートをルート要素とする
		rootMargin: "-30% 0px", // ビューポートの中心を判定基準にする
		threshold: 0 // 閾値は0
	};

	const observer = new IntersectionObserver(doWhenIntersect, options)
	// それぞれのboxを監視する
	boxes.forEach(box => {
		observer.observe(box);
	})

	/**
	 * 交差したときに呼び出す関数
   */
	function doWhenIntersect(entries: IntersectionObserverEntry[]) {
    console.log(entries)
		// 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				activateIndex(entry.target)
			}
		})
	}

	function activateIndex(element: Event["target"]) {
    console.log(element)
		// すでにアクティブになっている目次を選択
		const currentActiveIndex = document.querySelector(`.${Styles.tableOfContent} .${Styles.active}`);
		// すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
		if (currentActiveIndex !== null) {
			currentActiveIndex.classList.remove(Styles.active);
		}
		// 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
		const links = document.querySelectorAll(`.tableOfContent a`);

    Array.from(links).map(link => {
      if(element?.innerHTML === link.innerHTML) {
        link?.classList.add(Styles.active);
      }
    })
  }
}

export default IO
