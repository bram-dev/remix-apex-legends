export type MatchHistory = {
  id: string
  uid: string
  name: string
  legendPlayed: string
  gameLengthSecs: number
  gameStartTimestamp: number
  gameEndTimestamp: number
  gameData: [GameData]
  map: string
  BRScoreChange: number
  BRScore: number
  user_id: string
}
  
export type GameData = {
  key: string
  value: number
  name: string
}