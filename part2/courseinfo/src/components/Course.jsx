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
    let total = tot.reduce((accu, val) => accu + val.exercises, 0)
  
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

export default Course

  