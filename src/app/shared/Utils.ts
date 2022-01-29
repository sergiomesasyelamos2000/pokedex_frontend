import { FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

/**
 * Reset errors and content from all controls of a FormGroup
 * @param {FormGroup} formGroup
 */
export const resetFrom = (formGroup: FormGroup) => {
  formGroup.reset();

  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.get(key)?.setErrors(null);
  });
};

/**
 * Recover accessToken from sessionStorage
 * @return {string} accessToken from sessionStorage if exists
 */
export const recoverAccessToken = (): string | null => {
  let accessToken = sessionStorage.getItem('accessToken');
  accessToken = accessToken ? decrypt(accessToken) : accessToken;
  return accessToken;
};

/**
 * Save accessToken in sessionStorage
 * @param {string} accessToken
 */
export const saveAccessToken = (accessToken: string): void => {
  accessToken = encrypt(accessToken);
  sessionStorage.setItem('accessToken', accessToken);
};

/**
 * Remove accessToken from sessionStorage
 */
export const removeAccessToken = (): void => {
  sessionStorage.removeItem('accessToken');
};

/**
 * Encrypt an string
 * @param {string} toEncrypt String to encrypt
 * @return {string} String encrypted
 */
export const encrypt = (toEncrypt: string): string => {
  return CryptoJS.AES.encrypt(
    toEncrypt.trim(),
    environment.encoder.password.trim(),
  ).toString();
};

/**
 * Decrypt an string
 * @param {string} toDecrypt String to decrypted
 * @return {string} String decrypted
 */
export const decrypt = (toDecrypt: string): string => {
  return CryptoJS.AES.decrypt(
    toDecrypt.trim(),
    environment.encoder.password.trim(),
  ).toString(CryptoJS.enc.Utf8);
};
