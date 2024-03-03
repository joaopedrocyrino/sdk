import * as dto from "./dto";

class LogController {
  public static object(objectsToLog: dto.IObjectInput): void {
    Object.keys(objectsToLog).forEach((key) => {
      let valueToLog = objectsToLog[key];

      if (typeof valueToLog === "object")
        valueToLog = JSON.stringify(valueToLog, undefined, 2);

      console.log(`${key}: ${objectsToLog[key]}`);
    });
  }
}

export default LogController;
