import { type BaseManagerInterface } from "../base/interface";

/**
 * Represents the interface for managing phone numbers.
 * @extends {BaseManagerInterface}
 */
export interface PhoneNumberManagerInterface extends BaseManagerInterface {
  /**
   * Sends a verification code to the specified phone number.
   * @param phoneNumber - The phone number to send the verification code to.
   * @returns A Promise that resolves to a boolean indicating whether the verification code was sent successfully.
   */
  sendVerificationCode: (phoneNumber: string) => Promise<boolean>;

  /**
   * Verifies the provided verification code.
   * @param code - The verification code to verify.
   * @returns A Promise that resolves to a boolean indicating whether the verification code is valid.
   */
  verifyCode: (code: string) => Promise<boolean>;
}
