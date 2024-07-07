import conf from '../conf/conf.js';
import {Client, Account} from "appwrite";

const client = new Client();

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(client);
//export const database = new Databases(client, conf.appwriteDbId);

