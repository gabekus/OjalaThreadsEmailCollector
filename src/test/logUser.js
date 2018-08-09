import {
  describe, it, before, after,
} from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import config from 'config';
import fs from 'fs';
import { emailExists, logUser } from '../modules';

const { expect } = chai;

const testEmailFile = path.join(config.get('logDirectory'), 'testEmails.csv');
const validUsers = [
  {
    name: '2Gabe',
    email: 'test@test.com',
  },
  {
    name: 'B2ig Boy',
    email: 'maleHuge@large.big',
  },
  {
    name: 'gibson5Marhsall@guitar.fender',
    email: 'test5@test.com',
  },
];

const invalidUsers = [
  {
    name: ',G,a,b,e',
    email: 'test@t,est.com',
  },
  {
    name: 'Big Boy',
    email: 'maleHu ge@large.big',
  },
  {
    name: '43fender',
    email: '25FretPRS@DanElectro.a',
  },
];

describe('Logging a user', () => {
  before(() => {
    chai.use(chaiAsPromised);

    // Create testEmails.csv if it doesn't exist
    if (!fs.existsSync(testEmailFile)) {
      fs.writeFileSync(testEmailFile, 'Name, Email\n', { flag: 'w' });
    }
  });

  after(() => {
    fs.unlink(testEmailFile);
  });

  it('should successfully log the name and email', () => {
    validUsers.forEach(user => expect(logUser(user.name, user.email, testEmailFile)).to.eventually.equal(true));
  });

  it('should not log the name and email', () => {
    invalidUsers.forEach(user => expect(logUser(user.name, user.email, testEmailFile)).to.eventually.equal(false));
  });

  it('should not log existing emails', () => {
    validUsers.forEach(user => expect(emailExists(user.email, testEmailFile)).to.eventually.equal(true));
  });
});
