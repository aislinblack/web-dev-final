import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostType } from '.';
import { useAppSelector } from '../../hooks';
import { likeDraft } from '../../services/draft-service';

const Post = ({ post }: { post: PostType }) => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const didUserLikeDraft =
    userInfo.loggedIn &&
    post.type === 'draft' &&
    post.likes.includes(userInfo.user._id);

  const [liked, setLiked] = useState<boolean>(false);

  const like = async (draftId: string) => {
    if (userInfo.loggedIn) {
      likeDraft(draftId).then((res) => {
        setLiked(true);
      });
    }
  };

  return (
    <div className='border  m-3'>
      {post.type === 'draft' ? (
        <div className='m-2'>
          <div>
            <h5>{post.title}</h5>
            <h6>By {post.authorName}</h6>
          </div>
          <div>
            <pre>{post.text}</pre>
          </div>
          <span onClick={() => !liked && like(post._id)}>
            <i
              className='fa fa-solid fa-heart me-1'
              style={{ color: liked || didUserLikeDraft ? 'red' : 'white' }}
            ></i>
            {post.likes.length + (liked ? 1 : 0)}
          </span>
        </div>
      ) : (
        <div className='m-2'>
          <div>
            <h5>
              {post.poem?.title}
              <Link
                to={`/poem/${encodeURIComponent(
                  post.poem!.author
                )}/${encodeURIComponent(post.poem!.title)}`}
              >
                <i className='fa fa-solid fa-arrow-right ms-2'></i>
              </Link>
            </h5>
          </div>
          <div>
            <h6>Critiqued by {post.criticNames.join()}</h6>
          </div>
          <div>{post.text}</div>
          <div>
            <i
              className='fa fa-solid fa-star me-1'
              style={{ color: 'gold' }}
            ></i>
            {post.rating}
          </div>
          <div>{post.datePosted}</div>
        </div>
      )}
    </div>
  );
};

export default Post;
