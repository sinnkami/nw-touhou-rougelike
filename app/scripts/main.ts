import Canvas from "./modules/Canvas/Canvas";

// fps表示用ライブラリ
import Stats from "stats.js"
import Render from "./modules/Canvas/Render";
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

window.onload = () => {
	document.body.appendChild(stats.dom);


	const canvas = new Canvas(832, 640);

	for (let x = 0; x <= 832; x += 32) {
		for (let y = 0; y <= 640; y += 32) {
			const render = new TestRener();
			render.setPosition(x, y);
			canvas.addRender(render);
			canvas.addRender(render);
		}
	}

	function test() {
		stats.begin();

		canvas.clearAllRender();

		canvas.update().then(() => {
			console.log("update");
		});

		stats.end();
	}
	// test();
	setInterval(test, 1000 / 90);
}
class TestRener extends Render {
	public update(ctx: CanvasRenderingContext2D) {
		super.update(ctx);
		ctx.fillStyle = `rgb(${Math.floor(this.x % 255)}, ${Math.floor(this.y % 255)}, 0)`;
		ctx.fillRect(this.x, this.y, 32, 32);
		return Promise.resolve();
	}

	public clear(ctx: CanvasRenderingContext2D) {
		super.clear(ctx);
		ctx.clearRect(this.x, this.y, 32, 32);
		return Promise.resolve();
	}

}

export {}