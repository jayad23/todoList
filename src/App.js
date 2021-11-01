import React, {useState, useEffect} from 'react';

//COMPONENTS
import Header from './components/Header'
import Cards from './components/Cards'
import Loader from './components/Loader'
import './styles/Cards.css';

function App() {
  //STATES
  const [dataApi, setDataApi] = useState([])
  const [renderTasks, setRenderTasks] = useState(null)
  const [totalTasksComplete, setTotalTasksComplete] = useState(0)
  const [totalTasksNotComplete, setTotalTasksNotComplete] = useState(0)

  //INITIAL API REQUEST
  useEffect(() =>{
    const requestApi = async () =>{
      const urlDir = 'https://jsonplaceholder.typicode.com/todos'
      const response = await fetch(urlDir)
      const result = await response.json()
      const selected = result.slice(0, 34)
      setDataApi(selected)
      setRenderTasks(selected)  
    }
    requestApi()
  }, [])

  //FUNCTIONS
  // A. Changing state true/false
  const settingStatus = (id)=>{
    setDataApi(dataApi.map(data =>(
      data.id === id ? {...data, completed:!data.completed}: data
    )))
    setRenderTasks(renderTasks.map(data =>(
      data.id === id ? {...data, completed:!data.completed}: data
    )))
  }

  // B. Header Buttons Filter
  const handlerRenderTasks = (value) =>{
      if(value === null){
        setRenderTasks(dataApi)
      } else if (value === true){
        setRenderTasks(dataApi.filter(data => data.completed === true))
      } else if(value === false){
        setRenderTasks(dataApi.filter(data => data.completed === false))
      }
      
  }
  
  // HEADER COUNTER BASE & UPDATED VALUES
  useEffect(()=>{
    const countersOnHeader = ()=>{
      const completeTask = dataApi.filter(data => data.completed === true)
      setTotalTasksComplete(completeTask.length)

      const notCompleteTasks = dataApi.filter(data => data.completed === false)
      setTotalTasksNotComplete(notCompleteTasks.length)
    }
    countersOnHeader()
  } )

  // RENDERING SECTION
  return (
    <div className="App">
      <>
         <Header
            totalTasks = {dataApi.length}
            totalTasksComp = {totalTasksComplete}
            totalTasksNot = {totalTasksNotComplete}
            handlerEvent = {handlerRenderTasks}
          />
      </>
      <div className="cardsContainer">
        {
          renderTasks && renderTasks.length > 0 ?
          renderTasks.map(data =>
            <Cards
              key={data.id}
              title={data.title}
              id={data.id}  
              status={data.completed}
              handlerStatus={settingStatus}
            />
          ):<Loader/>
        }
      </div>
    </div>
  );
}

export default App;

