import { useParams } from 'react-router-dom';
import './index.css';
import { format } from 'date-fns';

const FakeUser = {
  name: 'Fake User',
  email: 'fake@gmail.com',
  photo:
    'https://i.natgeofe.com/k/aa27e94d-8f1d-447e-9dba-15ac242317b0/meerkat-closeup-log_4x3.jpg',
  isAuthor: false,
  showLikedPoems: false,
  likedPoems: [],
  dateJoined: new Date(),
  followers: [],
  following: [],
};
const Profile = () => {
  const params = useParams();
  const showPrivateDetails = !params.uid;

  return (
    <div className='d-flex justify-content-center'>
      <div className='text-center'>
        <img className='profile-pic' src={FakeUser.photo} alt='' />
        <h3>{FakeUser.name}</h3>
        <div className='text-muted'>
          {FakeUser.isAuthor ? 'Author' : 'Reader'}
        </div>
        <div className='text-muted'>{`User since ${format(
          FakeUser.dateJoined,
          'MMMM do yyy GGG'
        )}`}</div>
        <div>Followers: {FakeUser.followers.length}</div>
        <div>Following: {FakeUser.following.length}</div>
      </div>
    </div>
  );
};

export default Profile;
