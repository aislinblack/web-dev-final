import { Link } from 'react-router-dom';
import { PostType } from '.';

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className='border  m-3'>
      {post.type === 'draft' ? (
        <div className='m-2'>
          <div>
            <h5>{post.title}</h5>
            <h6>By {post.authorName}</h6>
          </div>
          <div>
            <div>{post.text}</div>
          </div>
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
