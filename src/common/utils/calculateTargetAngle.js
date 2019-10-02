import slots from "common/consts/slots";

const calculateTargetAngle = (mySlotid, targetSlotId) => {
  const index = slots[mySlotid].adjacentSlotsIds.findIndex(slotId => slotId === targetSlotId);
  return 30 + index * 60;
};

export default calculateTargetAngle;
