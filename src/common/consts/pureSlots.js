import { mapValues } from "lodash";
import slots from "./slots";

const pureSlots = mapValues(slots, value => ({
  ...value,
  adjacentSlotsIds: value.adjacentSlotsIds.filter(slotId => slotId),
}));

export default pureSlots;
