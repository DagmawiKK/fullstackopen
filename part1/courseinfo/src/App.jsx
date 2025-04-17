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
    total += tot[i].exercises;
  }

  return (
    <p>Number of exercises {total}</p>
  )
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content info = {course.parts} />      
      <Total tot = {course.parts} />
    </div>
  )
};

export default App