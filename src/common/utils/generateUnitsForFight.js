import { sortBy } from "lodash";

export const sortPlayers = (players, myId) => sortBy(players, [player => player.id === myId]);

export const generateUnitsForFight = (players, myId) => {
  const sortedPlayers = sortPlayers(players, myId);

  return sortedPlayers.reduce(
    (prev, player, i) =>
      i === 0
        ? [
            ...prev,
            ...player.unitsOnBoard.map(unit => ({
              ...unit,
              playerId: player.id,
              slotId: 122 - unit.slotId,
            })),
          ]
        : [...prev, ...player.unitsOnBoard.map(unit => ({ ...unit, playerId: player.id }))],
    [],
  );
};
