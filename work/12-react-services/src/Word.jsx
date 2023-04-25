import Loading from './Loading';

function Word({
  word,
  isWordPending,
}) {
  // All this code before the return is to make the return easier to skim
  const SHOW = {  // a constant used only in this component
    PENDING: 'pending',
    EMPTY: 'empty',
    STORE_WORD: 'word',
  };

  let show;
  if(isWordPending) {
    show = SHOW.PENDING;
  } else if (!word.newword) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.STORE_WORD;
  }
  // The `Object.values(todos).map()` below returns
  // an array of JSX elements
  return (
    <div className="content">
      { show === SHOW.PENDING && <Loading className="words__waiting">Loading Word...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No Word yet, add one!</p>
      )}
      { show === SHOW.STORE_WORD && (
        <span data-id={word.id} className='word'>
			<h1>Word: {word.newword}</h1>
		</span>
      )}
    </div>
  );
}

export default Word;