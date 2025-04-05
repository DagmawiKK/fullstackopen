const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({part, exerciseNumber}) => {
  return (
    <>
     {
      part.map((partNum, idx) => 
      (<p key={idx}>{partNum} {exerciseNumber[idx]}</p>)
      )
     }
    </>
  )
}

const Total = ({tot}) => {
  return (
    <p>Number of exercises {tot}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const total = exercises1 + exercises2 + exercises3;

  // return (
  //   <div>
  //     <h1>{course}</h1>
  //     <p>
  //       {part1} {exercises1}
  //     </p>
  //     <p>
  //       {part2} {exercises2}
  //     </p>
  //     <p>
  //       {part3} {exercises3}
  //     </p>
  //     <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  //   </div>
  // )
  return (
    <div>
      <Header course={course} />
      <Content part = {[part1, part2, part3]} exerciseNumber = {[exercises1, exercises2, exercises3]} />      
      {/* <Content part = {part2} exerciseNumber = {exercises2} /> */}
      {/* <Content part = {part3} exerciseNumber = {exercises3} /> */}
      <Total tot = {total} />
    </div>
  )
}

export default App