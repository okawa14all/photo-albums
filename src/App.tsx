import React, { useState, useCallback } from 'react';
import {
  Grid,
  Header,
  Input,
  List,
  Segment
} from 'semantic-ui-react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  withAuthenticator,
  Connect
} from 'aws-amplify-react';
import aws_exports from './aws-exports';
import './App.css';
import * as queries from './graphql/queries';
import { ListAlbumsQuery } from './API';

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
            <li key={album.id}>
              {album.name}
            </li>
          ) : null
        )}
      </List>
    </Segment>
  )
}

const AlbumsListLoader: React.FC = () => {
  return (
    <Connect query={graphqlOperation(queries.listAlbums)}>
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
    [albumName]
  );

  return(
    <Segment>
      <Header as='h3'>Add a new album</Header>
      <Input
        type='text'
        name='albumName'
        placeholder='New Album Name'
        icon='plus'
        iconPosition='left'
        action={{ content: 'Create', onClick: () => { console.log(albumName) } }}
        value={albumName}
        onChange={onChangeAlbumName}
      />
    </Segment>
  );
}

const App: React.FC = () => {
  return (
    <Grid padded>
      <Grid.Column>
        <NewAlbum />
        <AlbumsListLoader />
      </Grid.Column>
    </Grid>
  );
}

export default withAuthenticator(App, { signUpConfig, includeGreetings: true });
