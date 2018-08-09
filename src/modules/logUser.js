/**
 *
 * @param name - The name of the person to store
 * @param email - The email to store
 */
import { verifyEmail } from './verifyEmail';

export function logUser(name, email) {
  if (verifyEmail(email)) {
  // Sanitize input

  // Log to file
  }
}
