const TradeHeader = ({ children: label, editable, onClick, marginTop } : {children?: any | any[], editable?: boolean, marginTop?: boolean, onClick?: () => void}) => (
    <div onClick={onClick} className={`w-full bg-glass p-3 flex flex-row items-center justify-start font-medium text-lg ${marginTop ? 'mt-1' : ''} ${onClick ? 'hover:bg-glass-brighter cursor-pointer' : ''}`}>
    {label}
    {editable ? <span className="text-base opacity-60 ml-4">(Click to edit name)</span> : <></>}
  </div>
)

export default TradeHeader