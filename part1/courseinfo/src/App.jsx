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
        info.map((p, idx) => 
        (
          <Part key = {idx} partNum = {p.name} exerciseNumber = {p.exercises} />
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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content info = {[part1, part2, part3]} />      
      <Total tot = {[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
};

export default App