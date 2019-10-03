import pureSlots from "./pureSlots";

import { keys } from "lodash";

const board = keys(pureSlots).map(id => ({ id: Number(id), ...pureSlots[id] }));

export default board;
