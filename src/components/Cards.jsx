import '../styles/Cards.css'

const Cards = ({title, id, status, handlerStatus})=>{
    return (
        
            <div className="cards">
                <div className="card-text">
                    <h2>Task: {id}</h2>
                    <p>The task that has been assigned for today is: {title}</p>
                </div>
                <div className="cardButton">
                    <button 
                        onClick={()=> handlerStatus(id, status)}
                        className={status ? 'completed' : 'unCompleted'}>{status ? 'Completed' : 'Pending'}
                    </button>
                </div>
            </div>
    )
}

export default Cards