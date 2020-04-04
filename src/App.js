import React, { useEffect, useState } from 'react';
import Card from './Card';
import { shuffle } from 'lodash';

const defaultCards = createCards([
  "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/459124/pexels-photo-459124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/104373/pexels-photo-104373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/3696179/pexels-photo-3696179.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/458991/pexels-photo-458991.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/39857/leopard-leopard-spots-animal-wild-39857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
]);

function createCards(urls) {
  const cards = []
  urls.forEach((url) => {
    cards.push({ url, isMatched: false, id: cards.length })
    cards.push({ url, isMatched: false, id: cards.length })
  })
  return shuffle(cards)
}


function App() {
  const [cards, setCards] = useState(defaultCards)
  const [guess, setGuess] = useState([]);

  useEffect(() => {
    if (guess.length === 2) {
      const cardOneIndex = cards.findIndex((card) => card.id === guess[0])
      const cardTwoIndex = cards.findIndex((card) => card.id === guess[1])
      if (cards[cardOneIndex].url === cards[cardTwoIndex].url) {

        setCards((prevCards) => {
          const newCards = [...prevCards]
          newCards[cardOneIndex].isMatched = true
          newCards[cardTwoIndex].isMatched = true

          return newCards
        })
        setGuess([])
      } else {
        setTimeout(() => {
          setGuess([])
        }, 1000)
      }
    }
  }, [guess])

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {cards.map((card, i) => {
        return <Card key={card.id} url={card.url} isFlipped={guess.includes(card.id) || card.isMatched} id={card.id} onFlip={id => {
          console.log(id);

          if (guess.length === 0) {
            setGuess([id])
          } else if (guess.length === 1) {
            setGuess([...guess, id])
          }
        }} />
      })}
    </div>
  );
}

export default App;
