const TradeHeader = ({ children: label, editable, onClick, marginTop, onClickConvert } : {children?: any | any[], editable?: boolean, marginTop?: boolean, onClick?: () => void, onClickConvert?: () => void}) => (
    <div className={`w-full bg-glass p-3 flex flex-row items-center justify-start font-medium text-lg ${marginTop ? 'mt-1' : ''}`}>
    {label}
    {editable ? <span onClick={onClick} className="cursor-pointer mr-auto text-base opacity-60 ml-4 hover:underline">(<span className="hidden lg:inline">Click to edit</span><span className="inline lg:hidden">Edit</span> name)</span> : <></>}
    {editable ? <div onClick={onClickConvert ? () => onClickConvert() : undefined} className="opacity-60 hover:opacity-100 text-sm flex flex-row items-center cursor-pointer justify-center p-1">
      Convert to
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </div> : <></>}
  </div>
)

export default TradeHeader