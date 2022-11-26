const Header = ({ course }) => <h3>{course.name}</h3>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => (
    <div>
        {course.parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </div>
)

const Total = ({ course }) => {
    const total = course.parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0)

    return (
        <h4>total of {total} exercises</h4>
    )
}

const Course = ({ course }) => (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
)

export default Course;