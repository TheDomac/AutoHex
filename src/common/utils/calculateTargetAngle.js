import slots from "common/consts/slots";
import { X_DIFF, Y_DIFF } from "common/consts/hexSlotPositionDiffs";

const calculateTargetAngle = (mySlotId, targetSlotId) => {
  const x1 = X_DIFF * slots[mySlotId].coordinates[0];
  const y1 = Y_DIFF * -1 * slots[mySlotId].coordinates[1];
  const x2 = X_DIFF * slots[targetSlotId].coordinates[0];
  const y2 = Y_DIFF * -1 * slots[targetSlotId].coordinates[1];
  const result = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return Math.round(result);
};

export default calculateTargetAngle;
