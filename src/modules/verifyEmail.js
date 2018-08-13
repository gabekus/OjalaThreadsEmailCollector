import fs from 'fs';
import util from 'util';
import { emailFile } from '../app';

const readFile = util.promisify(fs.readFile);

/**
 * Verifies an email has the correct email syntax
 * @param email - The email to verify
 * @return {boolean} - True if the email is legitimate
 */
export function verifyEmail(email) {
  const emailRules = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return emailRules.test(email);
}

/**
 * Check if an email already exists
 * @param email - The email to check
 * @param file - The optional file to check (default emails.csv)
 */
export async function emailExists(email, file = emailFile) {
  const data = await readFile(file);
  return data.indexOf(email) >= 0;
}
