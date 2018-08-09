import fs from 'fs';
import { emailFile } from '../app';
import { logger, verifyEmail, emailExists } from '.';

/**
 *  Logs a person's name and email to the emails.csv file
 * @param name - The first name of the person to store
 * @param email - The email to store
 * @param file - An optional file to log to. Default is emails.csv
 */
export async function logUser(name, email, file = emailFile) {
  if (verifyEmail(email) && !await emailExists(email, file)) {
    // Sanitize input
    const sanitizedName = name.replace(',');

    // Log to file
    fs.writeFileSync(file, `${sanitizedName}, ${email}\n`, { flag: 'a' });
    logger.info(`${name} signed up with ${{ email }}`);
    return true;
  }

  return false;
}
