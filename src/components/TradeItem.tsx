const TradeItem = ({ item, quantity }: {
    item?: string,
    quantity?: number
}) => (
    <div className={`bg-glass ${item ? 'hover:bg-glass-brighter cusor-pointer' : 'cursor-not-allowed'} flex items-center justify-center bg-glass aspect-square`}></div>
)

export default TradeItem