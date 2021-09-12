export interface ICredentials {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  age?: number | undefined;
  gender?: string | undefined;
  country?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

export interface IDisplayPic {
  url: string | undefined;
  picNameInStorage: string | undefined;
}

export interface IUserInfo {
  age: number | undefined;
  country: string | undefined;
  dp: IDisplayPic | undefined;
  email: string | undefined;
  firstName: string | undefined;
  gender: string | undefined;
  lastName: string | undefined;
  role: string | undefined;
  likedSongs?: string[];
}

export interface IFile {
  lastModified?: number;
  lastModifiedDate?: Date;
  name?: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
}

export interface IPlaylist {
  id?: string | undefined;

  name?: string | undefined;

  playlistPic?: {
    picName: string | undefined;
    url: string | undefined;
  };

  songs?: string[];
}

export interface ISong {
  id: string;

  name: string;
  url: string;

  likes: number;

  pic: {
    name: string;
    url: string;
  };
}
