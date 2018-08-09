import config from 'config';
import fs from 'fs';
import path from 'path';
import { verifyEmail } from './verifyEmail';
import { logger } from './logger';

export const emailFile = path.join(config.get('logDirectory'), 'emails.csv');

/**
 *  Logs a person's name and email to the emails.csv file
 * @param name - The first name of the person to store
 * @param email - The email to store
 */
export function logUser(name, email) {
  if (verifyEmail(email)) {
    // Sanitize input
    const sanitizedName = name.replace(',');

    // Log to file
    fs.writeFileSync(emailFile, `${sanitizedName}, ${email}\n`, { flag: 'a' });
    return true;
  }

  // Email is invalid
  logger.error(`${email} is not a valid email`);
  return false;
}
