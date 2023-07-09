import { useState } from 'react'
import "./styles.css"
import Die from "./Die"
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import Confetti from 'react-confetti'


export default function App() {

  const [diceArray, setCurrentDie ] = useState(newDice)
  const [tenzies, setTenzies] = useState(false)
  // const [firstSelected, setFirstSelected] =useState(diceArray.find((el) => el.isHeld))




  // useEffect(() => {
  //   if(firstSelected) {
  //     console.log(firstSelected.value)
  //   }
  // },[holdDice])

  useEffect(() => {
    
    const firstSelected = diceArray.find((el) => el.isHeld)
 

    const allHeld = diceArray.every((el) => el.isHeld )
    
    if (firstSelected){
      const allSameValue = diceArray.every((el) => el.value === firstSelected.value)
      
       if (allHeld && allSameValue) {setTenzies(true)}
    }
      



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

    tenzies ? (setCurrentDie(newDice), setTenzies(false) ): 
    
  setCurrentDie(oldDie => oldDie.map(die => {
    return die.isHeld ? die : generateNewDie()
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
        { tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='die-containter'>
         {diceElements}
        </div>
        <div>
        <button className='rollBtn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
      </main>
      
  )
}


