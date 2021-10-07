import { AnimatedSprite, Spritesheet } from "pixi.js";
import Sprite_Base from "./Sprite_Base";
import json from "../../../spritesheet/character.json";
import GameManager from "../manager/GameManager";
import ResourceManager from "../manager/ResourceManager";
import { KeyCode } from "../Construct/CommonConstruct";
import { IKeyInfo } from "../../definitions/class/Game/IGameInput";
import { ISpriteCharacterOption } from "../../definitions/class/Sprite/ISpriteCharacter";

const SPRITE_NAME = "character";

export enum CharacterAnimation {
	Up = "up",
	Down = "down",
	Right = "right",
	Left = "left",
}
/**
 * キャラを描画を行うクラス
 */
export default class Sprite_Character extends Sprite_Base {
	// 現在実行中のアニメーション
	private runingAnimation: CharacterAnimation = CharacterAnimation.Down;

	// 読み込むファイルパス
	protected path: string = "";

	// 歩行アニメーションの更新速度
	protected animationSpeed: number = 0;

	public init(option: ISpriteCharacterOption): void {
		if (option.name === undefined) option.name = SPRITE_NAME;
		if (option.delay === undefined) option.delay = 8;

		super.init(option);
		this.path = option.path;
		this.animationSpeed = option.animationSpeed || 0.25;
	}

	/**
	 * 描画するスプライトを設定
	 * @override
	 */
	public async setSprite(): Promise<void> {
		// コンテナを設定し、取得
		await super.setContainer();
		const container = super.getContainer();

		// スプライトシートを取得し、設定
		const texture = await ResourceManager.getTexture(this.path);
		const sheet = new Spritesheet(texture, json);
		this.setSheet(sheet);

		// スプライトシートを解析
		await new Promise(resolve => sheet.parse(() => resolve(null)));

		// 表示するキャラの情報を設定
		const sprite = new AnimatedSprite([sheet.textures["down_0"]]);
		sprite.animationSpeed = this.animationSpeed;

		// コンテナの初期位置を設定
		container.setTransform(this.x * 32, this.y * 32);

		// コンテナに追加
		container.addChild(sprite);
	}

	/**
	 * スプライトの更新処理
	 * @override
	 */
	public update(): void {
		// MEMO: 不要なのでコメントアウト
		// super.update();

		// キー情報を取得
		const keyInfo = {
			up: GameManager.input.getKey(KeyCode.Up),
			down: GameManager.input.getKey(KeyCode.Down),
			right: GameManager.input.getKey(KeyCode.Right),
			left: GameManager.input.getKey(KeyCode.Left),
		};

		// 現在最も入力時間の短いキーを取得
		const key = GameManager.input.getKeyOfLowestFrame(Object.values(keyInfo));

		// アニメーションを設定
		this.animation(key);

		return;
	}

	/**
	 * スプライトのアニメーションを行う
	 * @param key
	 * @returns
	 */
	private animation(key: IKeyInfo | undefined): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		if (key) {
			// とりあえず再生
			sprite.play();

			// 方向キーに応じて向きを設定
			switch (key.keyCode) {
				case KeyCode.Up:
					return this.setTextures(CharacterAnimation.Up);
				case KeyCode.Down:
					return this.setTextures(CharacterAnimation.Down);
				case KeyCode.Right:
					return this.setTextures(CharacterAnimation.Right);
				case KeyCode.Left:
					return this.setTextures(CharacterAnimation.Left);
			}
		} else {
			// 移動していない場合は止まる
			this.stopAnimation();
		}

		return;
	}

	/**
	 * 現在実行中のアニメーションを一時停止
	 * @returns
	 */
	private stopAnimation(): void {
		const sprite = this.getSprite();
		if (!sprite) return;

		sprite.gotoAndStop(1);
		return;
	}

	/**
	 * スプライトにアニメーションを設定
	 * @param animation
	 * @returns
	 */
	private setTextures(animation: CharacterAnimation): void {
		const sheet = this.getSheet();
		if (!sheet) return;

		const sprite = this.getSprite();
		if (!sprite) return;

		// 現在設定されているアニメーションが同じものならスルー
		if (this.sameAnimation(animation)) return;

		// 出なければ設定
		sprite.textures = sheet.animations[animation];
		this.runingAnimation = animation;

		return;
	}

	/**
	 * スプライトを取得
	 * @override
	 * @returns sprite
	 */
	public getSprite(): AnimatedSprite | undefined {
		const container = super.getContainer();
		if (!container) return;

		// キャラ画像は1つのみなので最初を取得
		const sprite = container.getChildAt(0);
		if (!sprite) return;

		return sprite as AnimatedSprite;
	}

	/**
	 * 指定されたアニメーションと同じかどうか
	 * @param animation
	 * @returns boolean
	 */
	private sameAnimation(animation: CharacterAnimation): boolean {
		return this.runingAnimation === animation;
	}
}
