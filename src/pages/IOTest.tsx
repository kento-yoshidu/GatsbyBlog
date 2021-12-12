import React, { useEffect } from "react"

import IO from "../../lib/intersectionObserver"
import * as Styles from "../styles/IOTest.module.scss"

const options = {
	rootMargin: "10px",
	threshold: 0
}

const Test: React.VFC = () => {

  useEffect(() => {
    IO()
  }, [])

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
			<p>iotest</p>
		</>
	)
}

export default Test