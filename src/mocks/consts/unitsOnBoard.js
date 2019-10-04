import { myId, enemyId } from "mocks/consts/players";

const unitsOnBoard = [
  {
    id: 4,
    championId: 1,
    slotId: 118,
    playerId: myId,
    health: 100,
    damage: 15,
    attackSpeed: 0.7,
    range: 4,
  },
  {
    id: 8,
    championId: 2,
    slotId: 4,
    playerId: enemyId,
    health: 100,
    damage: 15,
    attackSpeed: 0.7,
    range: 1,
  },
];

export default unitsOnBoard;
