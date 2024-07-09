import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

//this syntax is updated from appwrite docs , read and manage
//here we'r using classes because we need constructor  , when an object will be called it constructor will run that why using
export class AuthService {
  client = new Client();
  account;
  //this is because we want to run this code when object is called so constructor will run automatically

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }
  //this is for creating account
  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  //this is just for login the code
  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  //this is for checking login hai ya nai
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite error in getCurrentUser:", error);
    }
    return null;
  }
  //this for log out of all session because of it creates session by default
  async logout() {
    //if you want to remove this eslint line then you just need to replace throw error to console.log(error)
    // eslint-disable-next-line no-useless-catch
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();

export default authService;
