const Card = ({card}) => {
  const {image, value, suit, code} = card;
  return <div>
    <img src={image} alt={code} />
    <h1>{value} of {suit}</h1>
  </div>
}

export default Card