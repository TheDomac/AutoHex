const generateUnitsForFight = (players, myId) => {
  const isPlayerWithMyId = players.some(player => player.id === myId);

  if (isPlayerWithMyId) {
    return players.reduce(
      (prev, player) =>
        player.id !== myId
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
  }

  return players.reduce(
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

export default generateUnitsForFight;
