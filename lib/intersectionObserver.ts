/*
*  /src/templates/blog-post.tsxにて、
*  ToCのスクロール追従を実行
*/
import * as Styles from "../src/styles/tableOfContent.module.scss"

const IO = () => {
	// 交差を監視する要素
	const boxes = document.querySelectorAll(".main > h1, h2, h3")

	const options = {
		root: null, // ビューポートをルート要素に設定
		rootMargin: "0px 0px -90% 0px", // ビューポートの中心を判定基準にする
		threshold: 0,
	};

	const observer = new IntersectionObserver(doWhenIntersect, options)

	// それぞれのboxを監視し、交差するとdoWhenIntersect関数を呼び出す
	boxes.forEach(box => {
		observer.observe(box);
	})

	/**
	 * 交差したときに呼び出す関数
   */
	function doWhenIntersect(entries: IntersectionObserverEntry[]) {
		// 交差検知をしたもののなかで、isIntersectingがtrueのDOMを関数に渡す
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				activateIndex(entry.target)
			}
		})
	}

	function activateIndex(element: HTMLElement) {
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
