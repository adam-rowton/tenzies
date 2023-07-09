import { useState } from 'react'
import "./styles.css"
import Die from "./Die"
import { nanoid } from 'nanoid'
import { useEffect } from 'react'



//what branch am I even on? 

const apple = true
export default function App() {

  const [diceArray, setCurrentDie ] = useState(newDice)
  const [tenzies, setTenzies] = useState(false)
  // const [firstSelected, setFirstSelected] =useState(diceArray.find((el) => !el.isHeld).value)




  // useEffect(() => {
  //    setFirstSelected(diceArray.find((el) => el.isHeld))
  //    console.log(firstSelected)
  // },[setCurrentDie])

  useEffect(() => {
    
    // const firstSelected = diceArray.find((el) => el.isHeld)
   

    const allHeld = diceArray.every((el) => el.isHeld )
    // const allSameValues = diceArray.every((el) => el.value === firstSelected)
    allHeld && allSameValues ?  console.log("you won")  : console.log("not all held")
  }, [diceArray])

 function holdDice(id){
  
  setCurrentDie(oldDie => oldDie.map(die => {
    
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
    
  }))
  
 }

 function generateNewDie() {
  let randomNumber = Math.floor(Math.random()*6) +1
  return {
      value: randomNumber, 
      isHeld: false,
      id: nanoid()
  }
}

  function rollDice(){
    
  setCurrentDie(oldDie => oldDie.map(die => {
    return die.isHeld ? die : 
    
      generateNewDie()
  }
    
    ))
  }

  
  function newDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++){
     diceArray.push(
      generateNewDie())
    }
    return(diceArray)
   }

   const diceElements = diceArray.map(die => <Die className="dice" value={die.value} isHeld={die.isHeld} key={die.id} holdDice={() => holdDice(die.id)}/>)
      
   
  
  return (
      <main>
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='die-containter'>
         {diceElements}
        </div>
        <div>
        <button className='rollBtn' onClick={rollDice}>Roll</button>
        </div>
      </main>
      
  )
}


