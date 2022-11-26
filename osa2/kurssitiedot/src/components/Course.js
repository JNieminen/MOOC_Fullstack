const Header = ({ course }) => {
    return (
        <h3>{course.name}</h3>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Total = ({ course }) => {
    const parts = course.parts
    const total = parts.reduce((sum, part) => {
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