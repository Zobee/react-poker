import {useState, useEffect} from 'react'
import Card from './components/Card'


function App() {
  const [deckId, setDeckId] = useState("")
  const [drawing, setDrawing] = useState(false)
  const [remainingCards, setRemainingCards] = useState(0)
  const [cards, setCards] = useState([])

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => res.json())
    .then(res => {
      setDeckId(res.deck_id)
      setRemainingCards(res.remaining)
    })
    .catch(err => console.log(err))
  },[])

  const draw = (count = 5) => {
    setDrawing(true)
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
    .then(res => res.json())
    .then(res => {
      setCards(res.cards)
      setRemainingCards(res.remaining)
    })
    .then(() => setDrawing(false))
    .catch(err => console.log(err))
  }
  return (
    <div>
      Deck ID: {deckId} Cards Remaining: {remainingCards}

      <div>
        My Cards:
      </div>
      <button onClick={() => draw(2)}>Draw</button>
      {drawing ? <h1>Drawing...</h1> 
      : 
      <div className='card-container'>
        {cards.map(card => <Card card={card} />)}
      </div>}
    </div>
  );
}

export default App;
