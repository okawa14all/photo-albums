export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    id
    name
    photos {
      items {
        id
        thumbnail {
          key
          width
          height
        }
        fullsize {
          key
          width
          height
        }
      }
      nextToken
    }
  }
}
`;