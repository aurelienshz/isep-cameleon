import {requestToken} from './auth';

describe.skip("Authentication methods", () => {
  it("Should allow to login with valid credentials", async() => {
    const pwet = await requestToken({login: "", password: ""});
    console.log(pwet);

    console.log("pwet");
  });
});
