const moveToEnemySide = player => ({
  ...player,
  unitsOnBoard: player.unitsOnBoard.map(u => ({ ...u, slotId: 122 - u.slotId })),
});

export default moveToEnemySide;
