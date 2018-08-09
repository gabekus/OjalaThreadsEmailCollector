import { describe, it } from 'mocha';
import chai from 'chai';
import { verifyEmail } from '../modules';

const { expect } = chai;

const verifiedEmails = ['bob123@gmail.com', 'gibson@yahoo.com', '23stacys14Mom@nyc.rr.com'];
const fakeEmails = ['fake input', 'test', 'j203f02', '_DJ*@(#', 'gmail @com.gmail', 'emailWithComma,@gmail.com', ',anotherCommaEmail@test.com', 'test@gmail,com'];

describe('verifyEmail', () => {
  it('should verify valid emails', () => {
    verifiedEmails.forEach(email => expect(verifyEmail(email)).to.equal(true));
  });

  it('should not verify invalid emails', () => {
    fakeEmails.forEach(email => expect(verifyEmail(email)).to.equal(false));
  });
});
