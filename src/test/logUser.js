import {
  describe, it, before, after,
} from 'mocha';
import chai from 'chai';
import path from 'path';
import config from 'config';
import fs from 'fs';
import { logUser } from '../modules';

const { expect } = chai;

const testEmailFile = path.join(config.get('logDirectory'), 'testEmails.csv');
const validUser = {
  name: '2Gabe',
  email: 'test@test.com',
};

const invalidUser = {
  name: ',G,a,b,e',
  email: 'test@t,est.com',
};

describe('Logging a user', () => {
  before(() => {
    // Create testEmails.csv if it doesn't exist
    if (!fs.existsSync(testEmailFile)) {
      fs.writeFileSync(testEmailFile, 'Name, Email\n', { flag: 'w' });
    }
  });

  after(() => {
    fs.unlink(testEmailFile);
  });

  it('should successfully log the name and email', async () => {
    expect(await logUser(validUser.name, validUser.email, testEmailFile)).to.equal('Successfully registered');
  });

  it('should not log an invalid email', async () => {
    expect(await logUser(invalidUser.name, invalidUser.email, testEmailFile)).to.equal('Invalid email');
  });

  it('should not log existing emails', async () => {
    expect(await logUser(validUser.name, validUser.email, testEmailFile)).to.equal('Email exists');
  });
});
