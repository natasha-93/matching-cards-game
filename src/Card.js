import React from 'react'

function Card({ url, isFlipped, id, onFlip }) {
  const bg = isFlipped ? `url("${url}")` : "blue"
  return (
    <div onClick={e => {
      onFlip(id)
    }} style={{ width: "10rem", height: "10rem", background: `no-repeat center/cover ${bg}`, margin: "2rem" }}>

    </div>
  );
}

export default Card;