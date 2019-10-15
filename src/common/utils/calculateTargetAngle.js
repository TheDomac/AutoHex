import slots from "common/consts/slots";

const getAngleBetweenAdjecentSlots = (mySlotId, targetSlotId) => {
  const index = slots[mySlotId].adjacentSlotsIds.findIndex(slotId => slotId === targetSlotId);

  return 30 + index * 60;
};

const calculateTargetAngle = (mySlotId, targetSlotId, path) =>
  path.reduce((prev, slot, i) => {
    if (!path[i + 1]) {
      return prev + getAngleBetweenAdjecentSlots(slot, targetSlotId) / i;
    }

    return prev + getAngleBetweenAdjecentSlots(slot, path[i + 1]) / i;
  }, calculateTargetAngle(mySlotId, path[0] || targetSlotId));

export default calculateTargetAngle;
