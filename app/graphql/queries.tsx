import { gql } from '@apollo/client'

export const GET_MATCH_HISTORIES = gql`
  query MatchHistories {
    matchHistories {
        id
        uid
        name
        legendPlayed
        gameLengthSecs
        gameStartTimestamp
        gameEndTimestamp
        gameData {
        value
        name
        }
        map
        BRScoreChange
        BRScore
        user_id
    }
  }
`

export const GET_MATCH_HISTORIES_BY_UID = gql`
  query MatchHistoriesByUid($uid: ID!) {
    matchHistoriesByUid(uid: $uid) {
      id
      uid
      name
      legendPlayed
      gameLengthSecs
      gameStartTimestamp
      gameEndTimestamp
      gameData {
        name
        value
      }
      map
      BRScoreChange
      BRScore
      user_id
    }
  }
`