import { TradeHeader, TradeItem, values } from "@/components"
import { useEffect, useState } from "react"

import { Item, ItemName, ItemOffering } from "@/types"

const { version } = require('../../package.json')

export default function Home() {

  // Sender & Recipient names
  const [senderName, setSenderName] = useState<string | undefined>()
  const [recipientName, setRecipientName] = useState<string | undefined>()
  
  // The value of the item search input. If empty, item suggestion dropdown is hidden
  const [itemSearchQuery, setItemSearchQuery] = useState<string | undefined>()

  // Offer of each party in the trade
  const [senderOffer, setSenderOffer] = useState<ItemOffering[]>([])
  const [recipientOffer, setRecipientOffer] = useState<ItemOffering[]>([])

  // List of recommendations when user begins searching for items
  const [recommendations, setRecommendations] = useState<ItemName[]>([])

  // Days since last wipe
  const [daysSinceWipe, setDaysSinceWipe] = useState<number>()

  // Target inventory
  const [targetInventory, setTargetInventory] = useState<'sender' | 'recipient'>('recipient')

  // Runs once when page is first loaded
  useEffect(() => {
    // Only run on client
    if(!window) return
    // Set sender and recipient name to previous values, if saved in localStorage
    let pendingSenderName = window.localStorage.getItem('senderName')
    setSenderName(pendingSenderName === '' ? undefined : pendingSenderName as string)
    let pendingRecipientName = window.localStorage.getItem('recipientName')
    setRecipientName(pendingRecipientName === '' ? undefined : pendingRecipientName as string)
    // Set days since last wipe
    let lastWipe = window.localStorage.getItem('lastWipe')
    if(!lastWipe || lastWipe=== '') {
      setDaysSinceWipe(daysSinceFirstThursdayOfMonth())
    } else {
      const date = new Date(lastWipe)
      // If last wipe was over one month ago, reset wipe
      if(daysSinceDate(date) > 31) {
        window.localStorage.setItem('lastWipe','')
        setDaysSinceWipe(daysSinceFirstThursdayOfMonth())
      } else {
        setDaysSinceWipe(daysSinceDate(date))
      }
    }
  }, [])

  function getFirstThursdayOfMonth (year: number, month: number): Date {
    const date = new Date(year, month, 1);
    // Day of the week: 0 is Sunday, 1 is Monday, ..., 4 is Thursday
    while (date.getDay() !== 4) {
        date.setDate(date.getDate() + 1);
    }
    return date;
  }
  
  function daysSinceFirstThursdayOfMonth(): number {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // January is 0, February is 1, etc.
    const firstThursday = getFirstThursdayOfMonth(year, month);
  
    const diff = today.getTime() - firstThursday.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  }
  
  function findItem(item: ItemName): Item {
      const target: Item = values.find((value: Item) => {
        return value.name == item
      })
      if(!target) throw Error('Failed to find target')
      return target
  }

  function addItem(recommendation: ItemName) {
    // If item already exists in target offering, throw error and clear recommendations + search string
    const existingItemOffering = targetInventory === 'recipient' ? recipientOffer.find((item) => {
      return item.name ===recommendation
    }) : senderOffer.find((item) => {
      return item.name ===recommendation
    })

    if(existingItemOffering) {
      setItemSearchQuery('')
      setRecommendations([])
      throw Error('Item already exists in list, cannot add twice.')
    }
    if((targetInventory === 'recipient' && recipientOffer.length > 11) || (targetInventory === 'sender' && senderOffer.length > 11)) {
      setItemSearchQuery('')
      setRecommendations([])
      throw Error('Only 12 items can be transacted per trade.')
    }
    // Prompt for quantity
    let quantity: string | undefined | null = prompt('How much?')
    // Add item to recipient side
    if(isNaN(Number(quantity))) throw Error('Number not provided')
    if(Number(quantity) === 0) throw Error('Cannot add item with 0 quantity.')
    if(Number(quantity) > 9999) quantity = '9999'
    if(targetInventory === 'recipient') {

      setRecipientOffer([{
        name: recommendation,
        quantity: Number(quantity)
      },...recipientOffer])
    } else {
      setSenderOffer([{
        name: recommendation,
        quantity: Number(quantity)
      },...senderOffer])
    }
    // Clear recommendations and item search query to reset input state
    setItemSearchQuery('')
    setRecommendations([])
  }
  
  function areNumbersWithinMargin(num1: number, num2: number, marginPercentage: number): boolean {
    // Calculate the absolute difference
    const difference = Math.abs(num1 - num2);
  
    // Calculate the margin based on the first number
    const margin = Math.abs(num1 * marginPercentage / 100);
  
    // Check if the difference is within the margin
    return difference <= margin;
  }
  
  function daysSinceDate (inputDate: string | Date): number {
    const givenDate = new Date(inputDate);
    const currentDate = new Date();
  
    // Ensure that the time part is not considered in the difference
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    const diff = currentDate.getTime() - givenDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  // Returns the similarity between two strings, as a number
  function levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                        Math.min(matrix[i][j - 1] + 1, // insertion
                                                 matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
  }

  // Converts offering to scrap
  function convertOfferToScrap(offer: ItemOffering[]) {
    if(!daysSinceWipe) throw Error('Cannot convert offer to scrap without knowing days since last wipe.')
    let scrapValue = 0;
    
    // For each item, find value for 1x in scrap and multiply it by item quantity
    for(let i=0;i<offer.length;i++) {
      const item = findItem(offer[i].name)
  
      scrapValue += findItem(item.name).scrapPer * offer[i].quantity
  
      // TODO: Add research trades. If quantity == 1 and the item has research value, use that if greater than base value
      // Apply depreciation
      scrapValue -= daysSinceWipe * item.depreciationPerDay
    }
  
    // Return value in scrap
    return scrapValue
  }

  // Finds the closest value from the input string in the ItemName enum
  function searchItems(): ItemName[] {
    let results: ItemName[] = [];

    if(!itemSearchQuery) throw Error('Search query is required')

    values.forEach((item: Item) => {
        // Check for exact match in name and aliases
        if (item.name.startsWith(itemSearchQuery) || 
            item.aliases?.some(alias => alias.startsWith(itemSearchQuery))) {
            results.push(item.name);
        }
    });

    // If exact matches are found, return them
    if (results.length > 0) {
        return results;
    }

    // Find close matches using Levenshtein distance
    values.forEach((item: Item) => {
        if (levenshtein(itemSearchQuery, item.name) <= 2 || 
            item.aliases?.some(alias => levenshtein(itemSearchQuery, alias) <= 2)) {
            results.push(item.name);
        }
    });

    return results;
}

  // Runs every time the input search query is updated
  useEffect(() => {
    if(!itemSearchQuery) return
    setRecommendations(searchItems())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSearchQuery])

  function editOffering(itemName: ItemName, originatingParty: 'sender' | 'recipient') {
    // Find the correct offerings to edit
    let targetOfferings = originatingParty === 'sender' ? [...senderOffer] : [...recipientOffer]
    // Prompt user for new quantity
    let newQuantity: number | undefined = Number(prompt('Enter updated item quantity:')) ?? undefined
    // If new quantity is zero or undefined, delete offering from list and exit
    if(!newQuantity || isNaN(newQuantity)) {
      deleteOffering(itemName, originatingParty)
      return
    }
    if(newQuantity > 9999) newQuantity = 9999
    // Replace the target element with the updated quantity 
    let target = targetOfferings.find((item,i) => {
      if(item.name === itemName) {
        targetOfferings[i].quantity = newQuantity as number
        return true
      }
    })

    // If target can't be found, throw error and exit
    if(!target) throw Error('Failed to find target')

    console.log(targetOfferings)

    // Update the state
    if(originatingParty === 'sender') {
      setSenderOffer(targetOfferings)
    } else {
      setRecipientOffer(targetOfferings)
    }
  }

  // Used to delete an item from a party's offer.
  function deleteOffering(itemName: ItemName, originatingParty: 'sender' | 'recipient') {
    // Find the correct offerings to edit
    let targetOfferings = originatingParty === 'sender' ? [...senderOffer] : [...recipientOffer]
    // Find the target
    const target = targetOfferings.find((item,i) => {
      return item.name === itemName
    })
    // If target can't be found, throw error and exit
    if(!target) throw Error('Failed to find target')
    // Find index of target
    const targetIndex = targetOfferings.indexOf(target)
    // Remove target from offerings
    targetOfferings.splice(targetIndex, 1)
    // Update the state
    if(originatingParty === 'sender') {
      setSenderOffer(targetOfferings)
    } else {
      setRecipientOffer(targetOfferings)
    }
  }

  // Used to switch an item from one party (ex: sender) to another (ex: recipient)
  function switchOfferingParties(itemName: ItemName, originatingParty: 'sender' | 'recipient') {
     // Find the correct offerings to edit
     let targetOfferings = originatingParty === 'sender' ? [...senderOffer] : [...recipientOffer]
     let otherPartyOfferings = originatingParty === 'sender' ? [...recipientOffer] : [...senderOffer]
     // Find the target
     const target: ItemOffering | undefined = targetOfferings.find((item,i) => {
       return item.name === itemName
     })
     // If target can't be found, throw error and exit
     if(!target) throw Error('Failed to find target')
     // Ensure the non-originating party does not already have the target
    const existingItem = otherPartyOfferings.find((item: ItemOffering) => {
      return item.name === itemName
    })
    if(existingItem) throw Error('Cannot switch item parties, other party is already offering this item.')
     // Find index of target
     const targetIndex = targetOfferings.indexOf(target)
     // Remove target from offerings
     targetOfferings.splice(targetIndex, 1)
     // Add target to other party
     otherPartyOfferings = [target, ...otherPartyOfferings]
     // Update the state
     if(originatingParty === 'sender') {
       setSenderOffer(targetOfferings)
       setRecipientOffer(otherPartyOfferings)
     } else {
       setRecipientOffer(targetOfferings)
       setSenderOffer(otherPartyOfferings)
     }
  }

  // If page is loading, return loading message
  if(daysSinceWipe === undefined) return <p className="p-12 text-center w-full text-lg opacity-60 font-medium">Loading...</p>

  return (
    <div className='flex flex-col items-center justify-center min-h-screen h-auto w-screen gap-8'>
      {/* Interface */}
      <div className='flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-16 p-3 lg:p-0'>
        
        <div className='flex flex-col flex-1 gap-8'>
          <div className='flex flex-col items-center lg:flex-row w-full lg:items-end justify-start gap-8 pt-8 lg:pt-0'>
            <img className='h-10 w-auto' src="/rust-logo.png"/>
            <div className='flex flex-row items-end justify-start gap-4'>
              <h1 className='text-3xl font-semibold'>Trade evaluator</h1>
              <p className='opacity-60 text-xl'>v{version}</p>
            </div>
          </div>
          <p className='text-center lg:text-left text-2xl opacity-80 leading-10'>An unofficial trade evaluator for Rust players. Enter your items to see how fair a trade is.</p>
          <div className='flex flex-col gap-4 items-center text-center lg:items-start lg:text-left'>
            <label className='font-medium text-xl'>What are you trading?</label>
            <div className="flex flex-row w-full relative items-start justify-start">
              <input onKeyDown={(e) => {if(e.key === 'Enter' && recommendations.length > 0) addItem(recommendations[0])}}  value={itemSearchQuery} onChange={(e) => {
                setItemSearchQuery(e.target.value)
              }} style={{backgroundColor: '#403C34'}} className='p-4 pl-14 font-medium text-lg outline-none focus:ring focus:ring-crimson focus:ring-offset-2 focus:ring-2 focus:ring-offset-mud w-full' type="text" placeholder="e.g. 5.56 Rifle ammo"/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-6 h-6 ml-4 mt-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              {/* Droppdown of recommendations */}
              {itemSearchQuery ? <div style={{top: '100%', marginTop: 12, left: 0, zIndex: 9, maxHeight: 220, overflowY: 'scroll'}} className="shadow-lg bg-glass absolute w-full flex flex-col p-2 gap-1">
                {recommendations.map((recommendation, i) => {
                  const itemDetails = values.find((item: Item) => {
                    return item.name === recommendation
                  })
                  
                  return (
                  <div className="bg-glass-brighter p-3 flex justify-start items-center capitalize cursor-pointer" style={{zIndex:10}} key={i} onClick={() => addItem(recommendation)}>{(itemDetails && itemDetails.imageUrl) ? <img src={itemDetails.imageUrl} className="w-10 h-auto mr-3"/> : <></>}{recommendation}</div>
                )})}
                {recommendations.length < 1 ? <p className="text-center w-full mx-auto opacity-60 p-3 py-6">No items found with that name. Check your spelling and try again?</p> : <></>} 
              </div> : <></>}
            </div>
            <div onClick={() => setTargetInventory(targetInventory === 'sender' ? 'recipient' : 'sender')} className="lg:text-sm flex flex-col lg:flex-row items-center justify-start gap-2 cursor-pointer w-full mt-3">
              <span className='opacity-60 italic'>Adding items to {targetInventory === 'sender' ? `${senderName ? `${senderName}'s` : 'Your'}` : `${recipientName ? `${recipientName}'s` : `the Recipient's`}`} offer.</span>
              <span className="underline font-medium opacity-60 hover:opacity-100">Click here to update your offer instead.</span>
            </div>
            <div onClick={() => {
              const pendingDaysSinceWipe = prompt('How many days ago was your last server wipe?')
              // If prompt is clear, reset
              if(pendingDaysSinceWipe === '') {
                setDaysSinceWipe(daysSinceFirstThursdayOfMonth())
                localStorage.setItem('lastWipe','')
                return
              }
              // Error handling if prompt returned is not a valid number
              if(isNaN(Number(pendingDaysSinceWipe))) throw Error('Number not provided')
              // Convert # of days into a date
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() - Number(pendingDaysSinceWipe));
              localStorage.setItem('lastWipe', currentDate.toISOString())
              setDaysSinceWipe(Number(pendingDaysSinceWipe))
            }} className="flex flex-col lg:flex-row items-center justify-start gap-2 cursor-pointer w-full mt-3 lg:text-sm">
              <span className='opacity-60'>Days since last wipe: {daysSinceWipe} days.</span>
              <span className="underline font-medium opacity-60 hover:opacity-100">Click here to update.</span>
            </div>
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-4 w-full'>
          <h2 className="text-xl font-medium">Trade details</h2>
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <TradeHeader editable onClick={() => {
                let pendingName : string | undefined | null = prompt('Enter recipient username:')
                if(pendingName === '') pendingName = undefined
                window.localStorage.setItem('recipientName', pendingName ?? '')
                setRecipientName(pendingName ?? undefined)
            }}>{recipientName ?? 'Recipient'}</TradeHeader>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 w-full px-2">
              {recipientOffer.map((item, i) => <TradeItem
                item={item.name}
                quantity={item.quantity}
                key={i}
                onSwitchParties={() => switchOfferingParties(item.name, 'recipient')}
                onDelete={() => deleteOffering(item.name, 'recipient')}
                onEdit={() => editOffering(item.name, 'recipient')}
              />)}
              {[...Array(12-recipientOffer.length)].map((e, i) => <TradeItem key={i + recipientOffer.length}/>)}
            </div>
            <TradeHeader marginTop editable onClick={() => {
                let pendingName : string | undefined | null = prompt('Enter your username:')
                if(pendingName === '') pendingName = undefined
                window.localStorage.setItem('senderName', pendingName ?? '')
                setSenderName(pendingName ?? undefined)
            }}>{senderName ?? 'Yourself'}</TradeHeader>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 w-full px-2 mt-2">
              {senderOffer.map((item, i) => <TradeItem
                item={item.name}
                onSwitchParties={() => switchOfferingParties(item.name, 'sender')}
                onDelete={() => deleteOffering(item.name, 'sender')}
                onEdit={() => editOffering(item.name, 'sender')}
                quantity={item.quantity}
                key={i}/>)}
              {[...Array(12-senderOffer.length)].map((e, i) => <TradeItem key={i + senderOffer.length}/>)}
            </div>
            <div className="w-full bg-glass mt-2 p-3 flex flex-row items-center justify-start font-medium text-lg">
              Trade evaluation
            </div>
            <div className="w-full bg-glass p-3 flex flex-col items-center justify-center p-6 gap-2 text-center">
              <p className="text-lg opacity-60">
                {
                (senderOffer.length > 0 && recipientOffer.length > 0) ?
                  `Trade is ${areNumbersWithinMargin(convertOfferToScrap(recipientOffer), convertOfferToScrap(senderOffer), 25) === true
                    ? 'fair.'
                    : `unfair. ${convertOfferToScrap(senderOffer) > convertOfferToScrap(recipientOffer) ? `${recipientName ?? 'The Recipient'} should offer more.` : `${senderName ?? 'You'} should offer more.`}`}`
                  : 'Add an item to begin evaluating.'}
              </p>
              {senderOffer.length > 0 || recipientOffer.length > 0
                ? <p className="max-w-sm opacity-40 text-sm">{senderOffer.length > 0
                    ? `${senderName ?? 'You'} offered ~${Number(convertOfferToScrap(senderOffer).toFixed(0)).toLocaleString()} scrap worth of goods.`
                    : `${senderName ?? 'You'} haven't offered anything yet.`}
                  <br/>
                  {recipientOffer.length > 0
                    ? `${recipientName ?? 'Recipient'} offered ~${Number(convertOfferToScrap(recipientOffer).toFixed(0)).toLocaleString()} scrap worth of goods.`
                    : `${recipientName ?? 'The recipient'} hasn't offered anything yet.`
                  }</p>
                : <></>}
            </div>
          </div>
        </div>

      </div>
      {/* Footer */}
      <div className="w-full flex flex-col gap-2 items-center justify-center max-w-6xl mx-auto p-4">
        <div className="w-full flex flex-col lg:flex-row gap-3 items-center justify-center text-center">
          <p className="text-sm opacity-60 max-w-xs lg:max-w-none">Rust Trade Evaluator is open-source, <a className="text-crimson hover:underline" href="https://github.com/jimmybisenius/trade-rust" target="_blank">view our source-code Github.</a></p>
          <p className="text-sm opacity-60">Built by <a target="_blank" className="text-crimson hover:underline" href="#">PlasteredDragon</a> & <a target="_blank" className="text-crimson hover:underline" href="https://github.com/jimmybisenius">Burger</a>.</p>
          <p className="text-sm opacity-60">All rights reserved.</p>
        </div>
        <p className="text-xs opacity-30">This site is is not officially affiliated with, endorsed by, or connected to the makers of &quot;Rust&quot; (Facepunch Studios).</p>
      </div>
    </div>
  )
}
