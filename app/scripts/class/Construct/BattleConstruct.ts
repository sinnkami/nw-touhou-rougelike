import { IMenuInfo } from "../../definitions/class/Window/IWindowMenu";

export enum CharacterType {
	Player = "Player",
	Enemy = "Enemy",
}

export enum BattlePhase {
	Init = "Init",
	BattleStart = "BattleStart",
	SelectedTrun = "SelectedTrun",
	TrunStart = "TrunStart",
	CommandSelect = "CommandSelect",
	CommandExecute = "CommandExecute",
	CommandEnd = "CommandEnd",
	TrunEnd = "TrunEnd",
	BattleEnd = "BattleEnd",
	BattleResult = "BattleResult",
}

export enum BattleCommands {
	Attack = "Attack",
	Skill = "Skill",
	Item = "Item",
	Escape = "Escape",
}

interface IEnemyPositionInfo {
	[size: number]: { x: number; y: number }[];
}

export const BattleCommandList: IMenuInfo[] = [
	{
		menuId: BattleCommands.Attack,
		text: "戦う",
		x: 0,
		y: 0,
	},
	{
		menuId: BattleCommands.Skill,
		text: "スキル",
		x: 0,
		y: 1,
	},
	{
		menuId: BattleCommands.Item,
		text: "アイテム",
		x: 0,
		y: 2,
	},
	{
		menuId: BattleCommands.Escape,
		text: "逃げる",
		x: 0,
		y: 3,
	},
];

export const EnemyPosition: IEnemyPositionInfo = {
	1: [
		{
			x: 270,
			y: 120,
		},
	],
	2: [
		{
			x: 120,
			y: 120,
		},
		{
			x: 450,
			y: 120,
		},
	],
	3: [
		{
			x: 5,
			y: 120,
		},
		{
			x: 280,
			y: 120,
		},
		{
			x: 555,
			y: 120,
		},
	],
};
