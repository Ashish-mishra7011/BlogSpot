
import conf from '../conf/conf.js'
import { Client,Databases,Storage,Query,ID} from "appwrite";

export class Service{
   client = new  Client();
   databases;
   bucket; 
   //constructor so that when an object is called it will run 
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
       this.databases= new Databases(this.client); //for data base
       this.bucket= new Storage(this.client);   //for storage means bucket of the image


    }
    //creating post, you need to read the docs of appwrite of database section
    
    async createPost({title,slug,content,featuredImage,status,userId}){

        try {
            return await  this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                 slug,
                 {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    //updating the post , read the article for help
    async updatePost(slug,{title,content,featuredImage,status}){

        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status

                }
            )
            
        } catch (error) {
            console.log("updatePst error",error);
        }
    }
    //deleting the post, read article for help
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
           console.log("deletepost error: ",error); 
           return false;
        }
    }
    //for getting a single unique id's post,read docs for help
    async getPost(slug){
            try {
                return await this.databases.getDocument(
                    conf.appwriteDataBaseId,
                    conf.appwriteCollectionId,
                    slug,

                )
            } catch (error) {
                console.error('getPost error', error);
                return false;
                   }
    }
    //for getting all the value from collection,read docs for help
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log("getPosts error: ",error);
            return false;
            
        }

    }
    //for uploading file specially for images,read documentation for help
    async uploadFile(file){

        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file


            )
        } catch (error) {
            console.log("uploadFile error ",error);
            return false;
            
        }
    }
    //deleting file
    async deleteFile(fileId){
        try {
            await  this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("deletefile error ",error);
        }

    }
    //getting preview it is fast so dont use promise async await
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)

    }
    

}
const service = new Service;
export default service;