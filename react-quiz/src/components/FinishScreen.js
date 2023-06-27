function FinishScreen({ points, totalPoints }) {
  return (
    <p className='result'>
      <strong>
        You scorred {points} out of {totalPoints}
      </strong>
    </p>
  );
}

export default FinishScreen;
