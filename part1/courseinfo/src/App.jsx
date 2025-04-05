const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

// Without Part Component

// const Content = ({part, exerciseNumber}) => {
//   return (
//     <>
//      {
//       part.map((partNum, idx) => 
//       (<p key={idx}>{partNum} {exerciseNumber[idx]}</p>)
//       )
//      }
//     </>
//   )
// }

// With Part Component

const Part = ({partNum, exerciseNumber}) => {
  return (
    <p>
      {partNum} {exerciseNumber}
    </p>
  );
};

const Content = ({info}) => {
  return (
    <div>
      {
        info[0].map((p, idx) => 
        (
          <Part key = {idx} partNum = {p} exerciseNumber = {info[1][idx]} />
        )
        )
      } 
    </div>
  )
}

const Total = ({tot}) => {
  let total = 0;
  for (let i = 0; i < tot.length; i++) {
    total += tot[i]
  }
  
  return (
    <p>Number of exercises {total}</p>
  )
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content info = {[[part1, part2, part3], [exercises1, exercises2, exercises3]]} />      
      <Total tot = {[exercises1, exercises2, exercises3]} />
    </div>
  )
};

export default App