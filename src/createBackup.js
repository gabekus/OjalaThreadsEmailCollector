import config from 'config';
import fs from 'fs';
import moment from 'moment';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);

(async function createBackup() {
  // Format filename
  const date = moment(new Date()).format('MMM-Do-YY');
  const filename = `OjalaEmails-${date}.csv`;

  // Generate the file-path to store the backup file
  const logDir = config.get('logDirectory');
  const backupDir = path.join(logDir, 'backups');
  const backupFile = path.join(backupDir, filename);

  /*
 Don't make a backup if it already exists, otherwise
   the folder ends up with backup files with duplicate names
*/
  if (!fs.existsSync(backupFile)) {
  // Get the data to backup
    const file = path.join(logDir, 'emails.csv');
    const data = await readFile(file);
    const dataAsString = data.toString();

    // Backup the file
    fs.writeFileSync(backupFile, dataAsString);
  }
}()).catch((e) => {
  throw e;
});
