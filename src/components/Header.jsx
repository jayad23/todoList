import '../styles/Header.css'

const Header = ({ totalTasks, totalTasksComp, totalTasksNot, handlerEvent})=>{
    return (
        <header className="header">
            <div>
                <h1>School Project 1</h1>
            </div>
            <div className="buttons">
                <button
                    onClick ={()=>handlerEvent(null)}
                    className="all">All Tasks: {totalTasks}
                </button>
                <button
                    onClick ={()=>handlerEvent(true)}
                    className="comp">Complete Tasks: {totalTasksComp}
                </button>
                <button
                    onClick ={()=>handlerEvent(false)}
                    className="pen">Pending Tasks: {totalTasksNot}
                </button>
            </div>
        </header>
    )
}

export default Header