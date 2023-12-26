const TradeItem = ({ item, quantity }: {
    item?: string,
    quantity?: number
}) => (
    <div className={`bg-glass ${item ? 'hover:bg-glass-brighter cursor-pointer' : 'cursor-not-allowed'} flex items-center justify-center bg-glass aspect-square`}>{item ? <p>{item} x {quantity}</p> : <></>}</div>
)

export default TradeItem