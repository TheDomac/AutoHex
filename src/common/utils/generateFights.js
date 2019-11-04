import uuid from "uuid/v1";

const generateFights = (players, fightSetupIndex) => {
  const fights = players.reduce((prev, player, i) => {
    const playerAlreadyHasOpponent = prev.some(fight =>
      fight.players.some(p => p.id === player.id),
    );

    if (playerAlreadyHasOpponent) {
      return prev;
    }

    const opponentIndex = (i + fightSetupIndex) % players.length;

    const isOpponentTaken = prev.some(fight =>
      fight.players.some(p => p.id === players[opponentIndex].id),
    );

    const opponent = isOpponentTaken
      ? { ...players[opponentIndex], isCopy: true }
      : players[opponentIndex];

    return [
      ...prev,
      {
        id: uuid(),
        isFinished: false,
        players: [player, opponent],
      },
    ];
  }, []);

  return fights;
};

export default generateFights;
