import * as dto from "./dto";

class PACKAGE_NAMEController {
  private static getMessage(msg?: string): string {
    return `PACKAGE_NAME Hello World!!${msg ? ` ${msg}` : ""}`;
  }

  private static async waitSeconds(seconds: number): Promise<void> {
    const milInSec = 1000;

    await new Promise((res) => {
      setTimeout(res, seconds * milInSec);
    });
  }

  static async handler({ msg }: dto.IHandlerInput): Promise<string> {
    await this.waitSeconds(3);

    const message = this.getMessage(msg);
    console.log(message);

    return message;
  }
}

export default PACKAGE_NAMEController;
