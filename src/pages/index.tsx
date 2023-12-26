const { version } = require('../../package.json')

export default function Home() {
  return (
    <div className='flex flex-row items-center justify-center min-h-screen h-auto w-screen'>
      <div className='flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-16'>
        
        <div className='flex flex-col flex-1 gap-12'>
          <div className='flex flex-row w-full items-end justify-start gap-8'>
            <img className='h-10 w-auto mr-4' src="/rust-logo.png"/>
            <div className='flex flex-row items-end justify-start gap-4'>
              <h1 className='text-3xl font-semibold'>Trade evaluator</h1>
              <p className='opacity-60 text-xl'>v{version}</p>
            </div>
          </div>
          <p className='text-2xl opacity-80 leading-10'>An unofficial trade evaluator for Rust players. Enter your items to see how fair a trade is.</p>
          <div className='flex flex-col gap-4'>
            <label className='font-medium text-xl'>What are you trading?</label>
            <div className="flex flex-row w-full relative items-start justify-start">
              <input style={{backgroundColor: '#403C34'}} className='p-4 pl-14 font-medium text-lg outline-none focus:ring focus:ring-crimson focus:ring-offset-2 focus:ring-2 focus:ring-offset-mud w-full' type="text" placeholder="e.g. Low-grade fuel"/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-6 h-6 ml-4 mt-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <p className='opacity-60 italic'>Begin typing to add items and start a trade.</p>
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-4'>
          <h2 className="text-xl font-medium">Trade details</h2>
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="w-full bg-glass p-3 flex flex-row items-center justify-start font-medium text-lg">
              Recipient
              <span className="text-base opacity-60 ml-4">(Click to edit name)</span>
            </div>
            <div className="grid grid-cols-6 gap-2 w-full px-2">
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter cursor-pointer flex items-center justify-center bg-glass aspect-square"></div>
            </div>
            <div className="w-full bg-glass mt-2 p-3 flex flex-row items-center justify-start font-medium text-lg">
              Yourself
              <span className="text-base opacity-60 ml-4">(Click to edit name)</span>
            </div>
            <div className="grid grid-cols-6 gap-2 w-full mt-2 px-2">
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
              <div className="bg-glass hover:bg-glass-brighter flex cursor-pointer items-center justify-center bg-glass aspect-square"></div>
            </div>
            <div className="w-full bg-glass mt-2 p-3 flex flex-row items-center justify-start font-medium text-lg">
              Trade evaluation
            </div>
            <div className="w-full bg-glass p-3 flex flex-row items-center justify-center gap-4 text-center">
              <p className="text-lg opacity-60 p-4">Add an item to both sides to begin evaluating.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
