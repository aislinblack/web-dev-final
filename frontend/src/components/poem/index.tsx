import { useParams } from 'react-router-dom';
import { map } from '../../vendors/fontawesome/js/v4-shims';

const poemExample = {
  title: "April Is a Dog's Dream",
  author: 'Marilyn Singer',
  lines: [
    "april is a dog's dream",
    'the soft grass is growing',
    'the sweet breeze is blowing',
    'the air all full of singing feels just right',
    'so no excuses now',
    "we're going to the park",
    'to chase and charge and chew',
    'and I will make you see',
    'what spring is all about',
  ],
  likes: 4,
  rating: 2,
};

const Poem = () => {
  const params = useParams();
  const author = params.author;
  const title = params.title;

  return (
    <div>
      <h1>{title}</h1>
      <h4>{author}</h4>
      {poemExample.lines.map((line) => (
        <div>{line}</div>
      ))}
      <div className='mt-5'>
        Likes: {poemExample.likes} Rating: {poemExample.rating}
      </div>
    </div>
  );
};

export default Poem;
