/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateAlbumInput = {
  id?: string | null,
  name: string,
  owner?: string | null,
};

export type UpdateAlbumInput = {
  id: string,
  name?: string | null,
  owner?: string | null,
};

export type DeleteAlbumInput = {
  id?: string | null,
};

export type CreatePhotoInput = {
  id?: string | null,
  bucket: string,
  fullsize: PhotoS3InfoInput,
  thumbnail: PhotoS3InfoInput,
  photoAlbumId?: string | null,
};

export type PhotoS3InfoInput = {
  key: string,
  width: number,
  height: number,
};

export type UpdatePhotoInput = {
  id: string,
  bucket?: string | null,
  fullsize?: PhotoS3InfoInput | null,
  thumbnail?: PhotoS3InfoInput | null,
  photoAlbumId?: string | null,
};

export type DeletePhotoInput = {
  id?: string | null,
};

export type ModelAlbumFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  owner?: ModelStringFilterInput | null,
  and?: Array< ModelAlbumFilterInput | null > | null,
  or?: Array< ModelAlbumFilterInput | null > | null,
  not?: ModelAlbumFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelPhotoFilterInput = {
  id?: ModelIDFilterInput | null,
  bucket?: ModelStringFilterInput | null,
  and?: Array< ModelPhotoFilterInput | null > | null,
  or?: Array< ModelPhotoFilterInput | null > | null,
  not?: ModelPhotoFilterInput | null,
};

export type CreateAlbumMutationVariables = {
  input: CreateAlbumInput,
};

export type CreateAlbumMutation = {
  createAlbum:  {
    __typename: "Album",
    id: string,
    name: string,
    owner: string | null,
    photos:  {
      __typename: "ModelPhotoConnection",
      items:  Array< {
        __typename: "Photo",
        id: string,
        bucket: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateAlbumMutationVariables = {
  input: UpdateAlbumInput,
};

export type UpdateAlbumMutation = {
  updateAlbum:  {
    __typename: "Album",
    id: string,
    name: string,
    owner: string | null,
    photos:  {
      __typename: "ModelPhotoConnection",
      items:  Array< {
        __typename: "Photo",
        id: string,
        bucket: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteAlbumMutationVariables = {
  input: DeleteAlbumInput,
};

export type DeleteAlbumMutation = {
  deleteAlbum:  {
    __typename: "Album",
    id: string,
    name: string,
    owner: string | null,
    photos:  {
      __typename: "ModelPhotoConnection",
      items:  Array< {
        __typename: "Photo",
        id: string,
        bucket: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePhotoMutationVariables = {
  input: CreatePhotoInput,
};

export type CreatePhotoMutation = {
  createPhoto:  {
    __typename: "Photo",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null,
    bucket: string,
    fullsize:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
    thumbnail:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
  } | null,
};

export type UpdatePhotoMutationVariables = {
  input: UpdatePhotoInput,
};

export type UpdatePhotoMutation = {
  updatePhoto:  {
    __typename: "Photo",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null,
    bucket: string,
    fullsize:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
    thumbnail:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
  } | null,
};

export type DeletePhotoMutationVariables = {
  input: DeletePhotoInput,
};

export type DeletePhotoMutation = {
  deletePhoto:  {
    __typename: "Photo",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null,
    bucket: string,
    fullsize:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
    thumbnail:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
  } | null,
};

export type GetAlbumQueryVariables = {
  id: string,
};

export type GetAlbumQuery = {
  getAlbum:  {
    __typename: "Album",
    id: string,
    name: string,
    owner: string | null,
    photos:  {
      __typename: "ModelPhotoConnection",
      items:  Array< {
        __typename: "Photo",
        id: string,
        bucket: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListAlbumsQueryVariables = {
  filter?: ModelAlbumFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAlbumsQuery = {
  listAlbums:  {
    __typename: "ModelAlbumConnection",
    items:  Array< {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPhotoQueryVariables = {
  id: string,
};

export type GetPhotoQuery = {
  getPhoto:  {
    __typename: "Photo",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null,
    bucket: string,
    fullsize:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
    thumbnail:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
  } | null,
};

export type ListPhotosQueryVariables = {
  filter?: ModelPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhotosQuery = {
  listPhotos:  {
    __typename: "ModelPhotoConnection",
    items:  Array< {
      __typename: "Photo",
      id: string,
      album:  {
        __typename: "Album",
        id: string,
        name: string,
        owner: string | null,
      } | null,
      bucket: string,
      fullsize:  {
        __typename: "PhotoS3Info",
        key: string,
        width: number,
        height: number,
      },
      thumbnail:  {
        __typename: "PhotoS3Info",
        key: string,
        width: number,
        height: number,
      },
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateAlbumSubscription = {
  onCreateAlbum:  {
    __typename: "Album",
    id: string,
    name: string,
    owner: string | null,
    photos:  {
      __typename: "ModelPhotoConnection",
      items:  Array< {
        __typename: "Photo",
        id: string,
        bucket: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateAlbumSubscription = {
  onUpdateAlbum:  {
    __typename: "Album",
    id: string,
    name: string,
    owner: string | null,
    photos:  {
      __typename: "ModelPhotoConnection",
      items:  Array< {
        __typename: "Photo",
        id: string,
        bucket: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteAlbumSubscription = {
  onDeleteAlbum:  {
    __typename: "Album",
    id: string,
    name: string,
    owner: string | null,
    photos:  {
      __typename: "ModelPhotoConnection",
      items:  Array< {
        __typename: "Photo",
        id: string,
        bucket: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreatePhotoSubscription = {
  onCreatePhoto:  {
    __typename: "Photo",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null,
    bucket: string,
    fullsize:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
    thumbnail:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
  } | null,
};

export type OnUpdatePhotoSubscription = {
  onUpdatePhoto:  {
    __typename: "Photo",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null,
    bucket: string,
    fullsize:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
    thumbnail:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
  } | null,
};

export type OnDeletePhotoSubscription = {
  onDeletePhoto:  {
    __typename: "Photo",
    id: string,
    album:  {
      __typename: "Album",
      id: string,
      name: string,
      owner: string | null,
      photos:  {
        __typename: "ModelPhotoConnection",
        nextToken: string | null,
      } | null,
    } | null,
    bucket: string,
    fullsize:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
    thumbnail:  {
      __typename: "PhotoS3Info",
      key: string,
      width: number,
      height: number,
    },
  } | null,
};
