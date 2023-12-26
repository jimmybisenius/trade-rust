import { values } from '@/components'
import { Item } from '@/types'

const TradeItem = ({ item, quantity, onSwitchParties, onEdit, onDelete }: {
    item?: string,
    quantity?: number,
    onEdit?: () => void,
    onDelete?: () => void,
    onSwitchParties?: () => void
}) => {
    const itemDetails = values.find((details: Item) => {
        return details.name === item
    })

    return (
    <div className={`bg-glass ${item ? 'cursor-pointer' : 'cursor-not-allowed'} item flex flex-col p-2 items-end justify-end bg-glass aspect-square relative`}>{item ? <>
        {itemDetails.imageUrl ?<img style={{height: 50, marginBottom:-10}} className='mx-auto' src={itemDetails.imageUrl} alt={item}/> : <p className="w-full text-center capitalize font-bold">{item}</p>}
        <p className="text-right opacity-60 font-medium" style={{textShadow: '0 2px 5px rgba(0,0,0,.5)'}}>x {quantity?.toLocaleString()}</p>
    </> : <></>}
        {item ?<div className="item-controls flex flex-row items-center justify-between w-full p-1 top-0 left-0 absolute">
            <div onClick={onSwitchParties ? () => onSwitchParties() : undefined} className="p-1 rounded hover:bg-glass-brighter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
            </div>
            <div onClick={onEdit ? () => onEdit() : undefined} className="p-1 rounded hover:bg-glass-brighter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </div>
            <div onClick={onDelete ? () => onDelete() : undefined} className="p-1 rounded hover:bg-glass-brighter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
        </div> : <></>}
    </div>
)
}

export default TradeItem