import slots from "./slots";

import { keys } from "lodash";

const board = keys(slots).map(id => ({ id: Number(id), ...slots[id] }));

export default board;
