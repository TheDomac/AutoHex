import { sortBy } from "lodash";
import moveToEnemySide from "common/utils/moveToEnemySide";

export const sortPlayers = (players, myId) => sortBy(players, [player => player.id === myId]);

export const generateUnitsForFight = (players, myId) => {
  const sortedPlayers = sortPlayers(players, myId);

  const playerWithUnitsOnEnemySide = moveToEnemySide(sortedPlayers[0]);

  return [
    ...playerWithUnitsOnEnemySide.unitsOnBoard.map(unit => ({
      ...unit,
      playerId: playerWithUnitsOnEnemySide.id,
    })),
    ...sortedPlayers[1].unitsOnBoard.map(unit => ({ ...unit, playerId: sortedPlayers[1].id })),
  ];
};
