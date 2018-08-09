import config from 'config';
import fs from 'fs';
import path from 'path';
import { verifyEmail } from './verifyEmail';
import { logger } from './logger';

export const emailFile = path.join(config.get('logDirectory'), 'emails.csv');

/**
 *  Logs a user to the emails.csv file
 * @param name - The name of the person to store
 * @param email - The email to store
 */
export function logUser(name, email) {
  if (verifyEmail(email)) {
    // Sanitize input
    const sanitizedName = name.replace(',');

    // Log to file
    fs.writeFileSync(emailFile, `${sanitizedName}, ${email}\n`, { flag: 'a' });
  } else {
    logger.error(`${email} is not a valid email`);
  }
}
