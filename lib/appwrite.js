import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.personal.aora",
  projectId: "669e68860019cda554ca",
  databaseId: "669e6a2c0017109f9842",
  userCollectionId: "669e6a52001a068e837b",
  videoCollectionId: "669e6a7e0002fcfc5c35",
  storageId: "669e6ed30000d8bb9edb",
};
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw new Error("Account not created");
    }
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e) {
    throw new Error(e.message);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if(!currentAccount) {
      throw new Error('No user found');
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if(!currentUser) {
      throw new Error('No user found');
    }
    return currentUser.documents[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getAllPosts = async () => {
  try{
     const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt')]
     );
      return posts.documents;
  }catch(e){
    throw new Error(e.message);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(10)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search('title', query)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal('creator', userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (e) {
    throw new Error(e.message);
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if(type==='video'){
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    }else if(type==='image'){
      fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
    }else{
      throw new Error('Invalid file type');
    }
    if(!fileUrl) {
      throw new Error('File not found');
    }
    return fileUrl;
  } catch (e) {
    throw new Error(e.message);
  }
}

export const uploadFile = async (file, type) => {
  if(!file) {
    return;
  }
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri
  };
  try {
    const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (e) {
    throw new Error(e.message);
  }
}

export const createVideo = async (form)=>{
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])
    const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      creator: form.userId,
      prompt: form.prompt
    });
    return newPost;
  } catch (e) {
    throw new Error(e.message);
  }
}
