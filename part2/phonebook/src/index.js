import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'

const postPerson = (person) => {
  personService.create(person)
  .then(res => {console.log('after postin', res)})
}

const Filter = ({ filter, setFiltered }) => {  
  return(
    <div>
        filter shown with <input value={filter} onChange={(e) => setFiltered(e.target.value)} />        
    </div>
  )
}

const PersonForm = ({newName, nameHandler, newNumber, numberHandler, submitHandler}) => {  
  return(
    <form>
      <div>
        name: <input value={newName} onChange={(e) => nameHandler(e)} />
      </div>        
      <div>
        number: <input value={newNumber} onChange={(e) => numberHandler(e)}/>
      </div>        
      <button type="submit" onClick={(e) => submitHandler(e)}>
        add
      </button>        
    </form>
  )
}

const Persons = ({ persons, filtered, deleteHandler }) => {
  let arrays;
  let result = persons.filter(
    el => el.name.indexOf(filtered) > -1
    || el.name.toLowerCase().indexOf(filtered) > -1)
  
  if(result.length !== 0){
    arrays = result
  } else {
    arrays = persons
  }
  
  return(
    <ul>      
      {arrays.map((p) => {
        return(
          <div key={`p-${p.id}`}>
            <li >{p.name} {p.number}</li>
            <button id={`${p.id}`}            
              onClick={(e) => { deleteHandler(e) }}>delete</button>
          </div>          
        )
      })}      
      </ul>
  )  
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')  
  const [ filtered, setFiltered ] = useState('')

  const deleteHandler = (e) => {
    e.preventDefault();    
    let num = e.target.id;    
    let deleted = persons.filter(el => el.id === +num) // 삭제할 요소     
    if(window.confirm(`Delete ${deleted[0].name}?`)){
      let index = persons.indexOf(deleted[0])  
      persons.splice(index, 1)
      setPersons([...persons])    
      personService.delNum(num).then(res => console.log('deleted!'))
    }
  }
  
  const nameHandler = (e) => {    
    setNewName(e.target.value);
  }

  const numberHandler = (e) => {
    setNewNumber(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const newPerson = {
      name : newName,
      number : newNumber,
      id : persons.slice(-1)[0].id + 1      
    }
    if(persons.some(el => el.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      let oldPerson = persons.filter(el => el.name === newName);
      let index = persons.indexOf(oldPerson[0]);
      let opsId = oldPerson[0].id;      
      persons.splice(index, 1, newPerson); //        
      personService.update(opsId, newPerson)
      .then(res => console.log('done with', res));
      console.log('after splicing', persons)
      setPersons([...persons])
      // [...persons]랑 persons랑 차이
      }      
    } else {
      postPerson(newPerson)
      setPersons([...persons, newPerson])      
    }
  }

  useEffect(()=>{
    personService.getAll()
    .then(data => {
      setPersons(data)
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtered={filtered} setFiltered={setFiltered}/>
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        nameHandler={nameHandler} 
        numberHandler={numberHandler} 
        submitHandler={submitHandler}  
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filtered={filtered} deleteHandler={deleteHandler}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)