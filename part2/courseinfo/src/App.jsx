const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

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
        info.map((p) => 
        (
          <Part key = {p.id} partNum = {p.name} exerciseNumber = {p.exercises} />
        )
        )
      } 
    </div>
  )
}

const Total = ({tot}) => {
  let total = tot.reduce((accu, val) => {
    console.log(val)
    return accu + val.exercises
  }, 0,)
  console.log(tot)
  return (
    <p>Number of exercises {total}</p>
  )
};

const Course = ({course}) => {
  return (
    <>
    <Header course={course.name} />
    <Content info = {course.parts} /> 
    <Total tot = {course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course = {course}/>     
    </div>
  )
};

export default App