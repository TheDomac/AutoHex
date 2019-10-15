import pureSlots from "common/consts/pureSlots";

const calculateTargetAngle = (mySlotId, targetSlotId) => {
  const mySlotX = pureSlots[mySlotId].coordinates[0];
  const mySlotY = -1 * pureSlots[mySlotId].coordinates[1];
  const targetSlotX = pureSlots[targetSlotId].coordinates[0];
  const targetSlotY = -1 * pureSlots[targetSlotId].coordinates[1];

  return (Math.atan2(targetSlotY - mySlotY, targetSlotX - mySlotX) * 180) / Math.PI;
};

export default calculateTargetAngle;
