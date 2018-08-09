import { verifyEmail } from './verifyEmail';
import logger from './logger';
/**
 *  Logs a user to the emails.csv file
 * @param name - The name of the person to store
 * @param email - The email to store
 */
export function logUser(name, email) {
  if (verifyEmail(email)) {
  // Sanitize input

  // Log to file
  } else {
    logger.error(`${email} is not a valid email`);
  }
}
