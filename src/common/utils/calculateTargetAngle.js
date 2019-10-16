import pureSlots from "common/consts/pureSlots";
import { X_DIFF, Y_DIFF } from "common/consts/hexSlotPositionDiffs";

const calculateTargetAngle = (mySlotId, targetSlotId) => {
  const x1 = X_DIFF * pureSlots[mySlotId].coordinates[0];
  const y1 = Y_DIFF * -1 * pureSlots[mySlotId].coordinates[1];
  const x2 = X_DIFF * pureSlots[targetSlotId].coordinates[0];
  const y2 = Y_DIFF * -1 * pureSlots[targetSlotId].coordinates[1];
  const result = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return Math.round(result);
};

export default calculateTargetAngle;
