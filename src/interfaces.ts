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
  likes: number;

  pic: {
    name: string;
    url: string;
  };

  song: {
    name: string;
    url: string;
  };
}
