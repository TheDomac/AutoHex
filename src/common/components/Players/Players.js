import React from "react";

import { PlayersWrapper, Player } from "./Players.styled";

const Players = ({ players, setSelectedPlayer }) => (
  <PlayersWrapper>
    {players.map(player => (
      <Player key={player.id} onClick={setSelectedPlayer(player.id)}>
        {player.nickName} - {player.health}
      </Player>
    ))}
  </PlayersWrapper>
);

export default Players;
