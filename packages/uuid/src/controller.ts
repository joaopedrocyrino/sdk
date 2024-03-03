import { v4, validate } from "uuid";
import log from "@joaopedrocyrino/log"

import * as dto from "./dto";

class UuidController {
  public static isUuid(uuidStr: string): boolean {
    console.log(`Inside UuidController.isUuid`);

    const isValidUuid = validate(uuidStr);

    return isValidUuid;
  }

  public static create(): dto.TUuid {
    console.log(`Inside UuidController.create`);

    const uuid = v4();
    log.object({ uuid })

    return uuid as dto.TUuid;
  }
}

export default UuidController;
