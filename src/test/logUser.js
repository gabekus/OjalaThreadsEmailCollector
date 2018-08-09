import { describe, it } from 'mocha';
import chai from 'chai';
import { logUser } from '../modules';

const { expect } = chai;

const validUsers = [
  {
    name: 'Gabe',
    email: 'test@test.com',
  },
  {
    name: 'Big Boy',
    email: 'maleHuge@large.big',
  },
  {
    name: 'gibsonMarhsall@guitar.fender',
    email: 'test@test.com',
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
    name: '42fender',
    email: '25FretPRS@DanElectro.a',
  },
];

// TODO Don't interfere with the actual emails.csv, or remove these entries after tester
describe('Logging a user', () => {
  it('should successfully log the name and email', () => {
    validUsers.forEach(user => expect(logUser(user.name, user.email)).to.equal(true));
  });

  it('should not log the name and email', () => {
    invalidUsers.forEach(user => expect(logUser(user.name, user.email)).to.equal(false));
  });
});
