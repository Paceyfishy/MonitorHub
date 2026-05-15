export interface UserItem {

  id: string;

  firebase_uid: string;

  email: string;

  firstName: string;

  lastName: string;

  profilePicture?: string;

  favorites: string[];
}