import { uniqBy } from "lodash";

const isRoundOver = unitsOnBoard => uniqBy(unitsOnBoard, u => u.playerId).length === 1;

export default isRoundOver;
