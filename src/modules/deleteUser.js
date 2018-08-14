import config from 'config';
import fs from 'fs';
import path from 'path';
import util from 'util';

const emailFile = path.join(config.get('logDirectory'), 'emails.csv');
const readFile = util.promisify(fs.readFile);

/**
 * Deletes a user from an .csv based on the email passed
 * @param email - The email to delete
 * @param file - The file to delete the email from
 * @return {Promise<void>} - Finishes once the user is deleted
 */
export async function deleteUser(email, file = emailFile) {
  // Get the email file as a string
  const emails = await readFile(file);
  const emailsString = emails.toString();

  // Construct the string to delete
  const emailPos = emailsString.indexOf(email) + email.length;
  const shortenedEmails = emailsString.slice(0, emailPos);
  const lineBreakBeforeEmail = shortenedEmails.lastIndexOf('\n');
  const lineToDelete = shortenedEmails.substring(lineBreakBeforeEmail, emailPos);

  // Replace the name and email with a blank string
  const deletedEmailString = emailsString.replace(lineToDelete, '');

  // Overwrite the file with the email deleted
  fs.writeFileSync(file, deletedEmailString);
}
