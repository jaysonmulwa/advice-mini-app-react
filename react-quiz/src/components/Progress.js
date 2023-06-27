function Progress({ index, numQuestions, points, totalPoints }) {
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index}></progress>
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        {points}/ {totalPoints}
      </p>
    </header>
  );
}
export default Progress;
