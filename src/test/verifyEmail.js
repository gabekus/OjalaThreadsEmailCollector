import { describe, it } from 'mocha';
import * as chai from 'chai';
import { verifyEmail } from '../modules/verifyEmail';

const { expect } = chai;

const verifiedEmails = ['bob123@gmail.com', 'gibson@yahoo.com', '23stacys14Mom@nyc.rr.com'];
const fakeEmails = ['fake input', 'test', 'j203f02', '_DJ*@(#', 'gmail @com.gmail', 'emailWithComma,@gmail.com', ',anotherCommaEmail@test.com', 'test@gmail,com'];

describe('verifyEmail', () => {
  it('should verify all the following emails', () => {
    verifiedEmails.forEach(email => expect(verifyEmail(email)).to.equal(true));
  });

  it('should NOT verify all the following emails', () => {
    fakeEmails.forEach(email => expect(verifyEmail(email)).to.equal(false));
  });
});
