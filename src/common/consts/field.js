import slots from "./slots";

import { keys } from "lodash";

const arrayOfSlots = keys(slots).map(id => ({ id, ...slots[id] }));
const field = [
  arrayOfSlots.slice(0, 7),
  arrayOfSlots.slice(7, 14),
  arrayOfSlots.slice(14, 21),
  arrayOfSlots.slice(21, 28),
  arrayOfSlots.slice(28, 35),
  arrayOfSlots.slice(35, 42),
];

export default field;
