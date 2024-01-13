import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
   client = new Client();
   account;

   constructor() {
      this.client
         .setEndpoint(conf.appwriteUrl) // Your API Endpoint
         .setProject(conf.appwriteProjectId);
      this.account = new Account(this.client);
   }

   //Create  Accouunt Function

   async createAccount({ email, password, name }) {
      try {
         const userAccount = await this.account.create(ID.unique(), email, password, name)
         if (userAccount) {
            // Calling another Method  in this case :: we are also login in if user account acces 
            // We can also provide succes message 
            return this.login(email, password)
         } else {
            return userAccount
         }
      } catch (error) {
         throw error
      }
   }

   //Login Function

   async login({ email, password }) {
      try {
         return await this.account.createEmailSession(email, password)
      } catch (error) {
         throw error
      }
   }

   //User Login or Not Fucntion

   async getCurentUser() {
      try {
         return await this.account.get();
      } catch (error) {
         console.log("Appwrite serive :: getCurrentUser :: error", error);
      }
      return null;
   }

   //Logout Function

   async logOut() {
      try {
         await this.account.deleteSessions()
      } catch (error) {
         console.log("Appwrite serive :: getCurrentUser :: error", error);
      }
   }
}

const authService = new AuthService()
export default authService