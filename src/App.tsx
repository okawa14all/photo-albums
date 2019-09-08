import React, { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import {
  Form,
  Grid,
  Header,
  Input,
  List,
  Segment,
  Divider,
} from 'semantic-ui-react';
import Amplify, { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import {
  withAuthenticator,
  Connect,
  S3Image,
} from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import * as myQueries from './graphql/myQueries';
import {
  ListAlbumsQuery,
  CreateAlbumMutationVariables,
  CreateAlbumMutation,
  OnCreateAlbumSubscription,
  GetAlbumQuery,
  GetAlbumQueryVariables,
  ListPhotosQuery,
} from './API';

Amplify.configure(aws_exports);

const signUpConfig = {
  hiddenDefaults: ['username', 'email', 'phone_number'],
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'email',
      custom: false
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
      custom: false
    },
  ]
};

const makeComparator = (key, order = 'asc') => {
  return (a, b) => {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const aVal = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const bVal = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (aVal > bVal) comparison = 1;
    if (aVal < bVal) comparison = -1;
    return order === 'desc' ? (comparison * -1) : comparison
  };
};

type TAlbumsListProps = {
  albums: ListAlbumsQuery
}

const AlbumsList: React.FC<TAlbumsListProps> = (albumListProps: TAlbumsListProps) => {
  const { albums } = albumListProps
  const albumItems = albums && albums.listAlbums && albums.listAlbums.items || []

  return (
    <Segment>
      <Header as='h3'>My Albums</Header>
      <List divided relaxed>
        {albumItems.sort(makeComparator('name')).map(album =>
          album ? (
            <List.Item key={album.id}>
              <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
            </List.Item>
          ) : null
        )}
      </List>
    </Segment>
  )
}

const AlbumsListLoader: React.FC = () => {
  const onCreateNewAlbum = (prevQuery: ListAlbumsQuery, newData: OnCreateAlbumSubscription) => {
    const updatedQuery = Object.assign({}, prevQuery);
    if (updatedQuery.listAlbums && updatedQuery.listAlbums.items) {
      updatedQuery.listAlbums.items = updatedQuery.listAlbums.items.concat(newData.onCreateAlbum);
    }
    return updatedQuery;
  }

  return (
    <Connect
      query={graphqlOperation(queries.listAlbums)}
      subscription={graphqlOperation(subscriptions.onCreateAlbum)}
      onSubscriptionMsg={onCreateNewAlbum}
    >
      {({ data, loading, error }) => {
        if (error) return <div>Error</div>;
        if (loading || !data) return <div>Loading...</div>;
        return <AlbumsList albums={data} />;
      }}
    </Connect>
  )
}

const NewAlbum: React.FC = () => {
  const [albumName, setAlbumName] = useState('');
  const onChangeAlbumName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAlbumName(e.target.value);
    },
    []
  );

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newAlbum: CreateAlbumMutationVariables = {
      input: {
        name: albumName
      }
    }

    const result = await API.graphql(graphqlOperation(mutations.createAlbum, newAlbum));
    if ("data" in result && result.data) {
      const data = result.data as CreateAlbumMutation
      if (data.createAlbum) {
        console.log(`Created album with name=${data.createAlbum.name}, id=${data.createAlbum.id}`);
      }
    }
  }

  return(
    <Segment>
      <Header as='h3'>Add a new album</Header>
      <Input
        type='text'
        name='albumName'
        placeholder='New Album Name'
        icon='plus'
        iconPosition='left'
        action={{ content: 'Create', onClick: handleSubmit }}
        value={albumName}
        onChange={onChangeAlbumName}
      />
    </Segment>
  );
}

type TS3ImageUploadProps = {
  albumId: string
}

const S3ImageUpload: React.FC<TS3ImageUploadProps> = (props: TS3ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const onChangeFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const fileName = uuid();
      const user = await Auth.currentAuthenticatedUser();

      setUploading(true);

      const result = await Storage.put(
        fileName,
        file,
        {
          customPrefix: { public: 'uploads/' },
          metadata: { albumid: props.albumId, owner: user.username }
        }
      );

      console.log('Uploaded file: ', result);
      setUploading(false);
    },
    []
  );

  return (
    <div>
      <Form.Button
        onClick={() => {
          if (document) {
            const inputElem = document.getElementById('add-image-file-input')
            if (inputElem) inputElem.click();
          }
        }}
        disabled={uploading}
        icon='file image outline'
        content={ uploading ? 'Uploading...' : 'Add Image' }
      />
      <input
        id='add-image-file-input'
        type="file"
        accept='image/*'
        onChange={onChangeFile}
        style={{ display: 'none' }}
      />
    </div>
  );
}

type TPhotosListProps = {
  photos: Array<{
    id: string,
    thumbnail: {
      key: string,
      width: number,
      height: number,
    },
    fullsize:  {
      key: string,
      width: number,
      height: number,
    },
  }> | null
};

const PhotosList: React.FC<TPhotosListProps> = (photosListProps: TPhotosListProps) => {
  const { photos } = photosListProps;

  if (!photos) {
    return null;
  }

  return (
    <div>
      <Divider hidden />
      {photos.map(photo =>
        <S3Image
          key={photo.thumbnail.key}
          imgKey={photo.thumbnail.key.replace('public/', '')}
          style={{display: 'inline-block', 'paddingRight': '5px'}}
        />
      )}
    </div>
  );
}

// TODO
type TAlbumProps = {
  data: any
}

const Album: React.FC<TAlbumProps> = (albumProps: TAlbumProps) => {
  const { data } = albumProps
  const album = data && data.getAlbum

  if (album) {
    return (
      <Segment>
        <Header as='h3'>{album.name}</Header>
        <S3ImageUpload albumId={album.id}/>
        <PhotosList photos={album.photos.items} />
      </Segment>
    )
  } else {
    return null;
  }
}

const AlbumLoader: React.FC<GetAlbumQueryVariables> = (props: GetAlbumQueryVariables) => {
  return (
    <Connect
      query={graphqlOperation(myQueries.getAlbum, props)}
    >
      {({ data, loading, error }) => {
        if (error) return <div>Error</div>;
        if (loading || !data) return <div>Loading...</div>;
        return <Album data={data} />;
      }}
    </Connect>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <Grid padded>
        <Grid.Column>
          <Route path="/" exact component={NewAlbum} />
          <Route path="/" exact component={AlbumsListLoader} />

          <Route
            path="/albums/:albumId"
            render={ () => <div><NavLink to='/'>Back to Albums list</NavLink></div> }
          />
          <Route
            path="/albums/:albumId"
            render={ props => <AlbumLoader id={props.match.params.albumId} /> }
          />
        </Grid.Column>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(App, { signUpConfig, includeGreetings: true });
