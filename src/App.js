import React, {useState, useEffect} from 'react';

//COMPONENTS
import Header from './components/Header'
import Cards from './components/Cards'
import Loader from './components/Loader'
import './styles/Cards.css';

function App() {
  //STATES
  const [dataApi, setDataApi] = useState([])
  const [renderTasksComplete, setRenderTasksComplete] = useState([])
  const [renderTasksUncomplete, setRenderTasksUncomplete] = useState([])
  const [totalTasksComplete, setTotalTasksComplete] = useState(0)
  const [totalTasksNotComplete, setTotalTasksNotComplete] = useState(0)
  const [ filterStatus, setFilterStatus] = useState(undefined)
  //INITIAL API REQUEST
  useEffect(() =>{
    const requestApi = async () =>{
      const urlDir = 'https://jsonplaceholder.typicode.com/todos'
      const response = await fetch(urlDir)
      const result = await response.json()
      const selected = result.slice(0, 34)
      setDataApi(selected)
      setFilterStatus('all')
    }
    requestApi()
  }, [])

  //FUNCTIONS
  // A. Changing state true/false
  const settingStatus = (id)=>{
    setDataApi(dataApi.map(data =>(
      data.id === id ? {...data, completed:!data.completed}: data
    )))
  }

  // B. Header Buttons Filter
  const handlerRenderTasks = (value) =>{
    if (value === null){
      setFilterStatus('all')
    } else if (value === true){
      setFilterStatus('complete')
    } else if(value === false){
      setFilterStatus('unComplete')
    }
      
  }

  const printing = ()=>{
    if(filterStatus === 'all'){
      return (
        dataApi.map(data =>
          <Cards
            key={data.id}
            title={data.title}
            id={data.id}  
            status={data.completed}
            handlerStatus={settingStatus}
          />
        )
      )
    }else if(filterStatus === 'complete'){
      return(
        renderTasksComplete.map(data =>
          <Cards
            key={data.id}
            title={data.title}
            id={data.id}  
            status={data.completed}
            handlerStatus={settingStatus}
          />
        )
      )
    } else if(filterStatus === 'unComplete'){
      return(
        renderTasksUncomplete.map(data =>
          <Cards
            key={data.id}
            title={data.title}
            id={data.id}  
            status={data.completed}
            handlerStatus={settingStatus}
          />
        )
      )
    }
  }

  // HEADER COUNTER BASE & UPDATED VALUES
  useEffect(()=>{
    const countersOnHeader = ()=>{
      const completeTask = dataApi.filter(data => data.completed === true)
      setTotalTasksComplete(completeTask.length)
      setRenderTasksComplete(completeTask)
      const notCompleteTasks = dataApi.filter(data => data.completed === false)
      setTotalTasksNotComplete(notCompleteTasks.length)
      setRenderTasksUncomplete(notCompleteTasks)
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
          dataApi && dataApi.length > 0 ?
            printing()
          :<Loader/>
        }
      </div>
    </div>
  );
}

export default App;

