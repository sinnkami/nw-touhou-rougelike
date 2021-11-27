export interface IDataBossMessages {
	bossMessagesId: string;
	enemyPartyId: string;
	messages: IBossMessage[];
	backgroundImagePath: string;
}

export interface IBossMessage {
	// 話すキャラのID
	characterId: string;
	// メッセージ内容
	message: string;
}
