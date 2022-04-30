import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentOnPoem, findPoem } from '../../services/poetry-service';
import Review, { ReviewType } from './review';
import PoemBody from './poem-body';
import { getReviews, postReview } from '../../services/review-service';

export type PoemType = {
  _id: string;
  lines: string[];
  author: string;
  title: string;
  likes: any[];
  comments: { postedByName: string; comment: string }[];
  ratings: number[];
};

const Poem = () => {
  const [poem, setPoem] = useState<null | PoemType>(null);
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const params = useParams();
  const author = params.author!;
  const title = params.title!;

  const sendComment = async (comment: string) => {
    if (!poem) {
      return;
    }
    const res = await commentOnPoem(poem!._id, comment);

    setPoem({ ...res.updatedComment, lines: poem.lines });
  };

  const onSubmit = (reviewBody: string, rating: number) => {
    return postReview({
      text: reviewBody,
      rating: rating,
      collaborators: [],
      poemId: poem!._id,
    }).then((res) => {
      setReviews([res, ...(reviews || [])]);
    });
  };

  useEffect(() => {
    getReviews({ poem: poem?._id }).then((res) => {
      setReviews(res);
    });
  }, [poem?._id]);

  useEffect(() => {
    findPoem(title, author).then((res) => {
      setPoem(res);
    });
  }, [title, author]);

  const ratings = reviews.map((review) => review.rating);

  if (!poem) {
    return (
      <div>
        <h1>{title}</h1>
        <h4>{author}</h4>
        <div>
          <i className='fas fa-spinner fa-pulse fa-3x' />
        </div>
      </div>
    );
  }

  return (
    <div className='row'>
      <div className='col'>
        <PoemBody poem={poem} sendComment={sendComment} ratings={ratings} />
      </div>
      <div className='col'>
        <Review poemId={poem._id} submitReview={onSubmit} reviews={reviews} />
      </div>
    </div>
  );
};

export default Poem;
