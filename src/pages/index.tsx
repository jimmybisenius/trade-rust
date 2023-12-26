import { TradeHeader, TradeItem, values } from "@/components"
import { use, useEffect, useState } from "react"

import { Item, ItemCategory, ItemName, ItemOffering } from "@/types"

const { version } = require('../../package.json')

function findScrapValue(item: ItemName): number {
    const target: Item = values.find((value: Item) => {
      return value.name == item
    })
    if(!target) throw Error('Failed to find target')
    return target.scrapPer
}

function convertOfferToScrap(offer: ItemOffering[]) {
  let scrapValue = 0;
  
  // For each item, find value for 1x in scrap and multiply it by item quantity
  for(let i=0;i<offer.length;i++) {
    scrapValue += findScrapValue(offer[i].name) * offer[i].quantity
  }

  // Return value in scrap
  return scrapValue
}

function areNumbersWithinMargin(num1: number, num2: number, marginPercentage: number): boolean {
  // Calculate the absolute difference
  const difference = Math.abs(num1 - num2);

  // Calculate the margin based on the first number
  const margin = Math.abs(num1 * marginPercentage / 100);

  // Check if the difference is within the margin
  return difference <= margin;
}

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

  // String displaying trade evaluation, TODO: Improve
  const [tradeFairness, setTradeFairness] = useState<string>()

  // Runs once when page is first loaded
  useEffect(() => {
    // Only run on client
    if(!window) return
    // Set sender and recipient name to previous values, if saved in localStorage
    let pendingSenderName = window.localStorage.getItem('senderName')
    setSenderName(pendingSenderName === '' ? undefined : pendingSenderName as string)
    let pendingRecipientName = window.localStorage.getItem('recipientName')
    setRecipientName(pendingRecipientName === '' ? undefined : pendingRecipientName as string)
  }, [])

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

  // Finds the closest value from the input string in the ItemName enum
  function searchItems(): ItemName[] {
    if(!itemSearchQuery) {
      console.log(`No query`)
      return []
    }
    const enumValues = Object.values(ItemName);
    const similarityScores = enumValues.map(enumValue => ({
        enumValue,
        score: levenshtein(itemSearchQuery.toLowerCase(), enumValue.toLowerCase())
    }));

    similarityScores.sort((a, b) => a.score - b.score);
    const closestMatches = similarityScores.filter(item => item.score === similarityScores[0].score);

    return closestMatches.map(item => item.enumValue);
  }

  // Runs every time the input search query is updated
  useEffect(() => {
    if(!itemSearchQuery) return
    setRecommendations(searchItems())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSearchQuery])

  // Runs anytime either parties offering is updated
  useEffect(() => {
    // If either offer is empty, exit without evaluating trade
    if(senderOffer.length<1 || recipientOffer.length < 1) {
      setTradeFairness(undefined)
      return
    }

    // Evaluate trade
    // Convert offers to scrap
    let senderOfferValue = convertOfferToScrap(senderOffer)
    let recipientOfferValue = convertOfferToScrap(recipientOffer)

    setTradeFairness(`
      Sender offered ~${Number(recipientOfferValue.toFixed(0)).toLocaleString()} scrap,
      recipient offered ~${Number(senderOfferValue.toFixed(0)).toLocaleString()} scrap.
      Trade is ${areNumbersWithinMargin(recipientOfferValue, senderOfferValue, 25) === true ? 'fair' : 'unfair'}.
    `)

  }, [senderOffer, recipientOffer])

  function editOffering(itemName: ItemName, originatingParty: 'sender' | 'recipient') {
    // Find the correct offerings to edit
    let targetOfferings = originatingParty === 'sender' ? [...senderOffer] : [...recipientOffer]
    // Prompt user for new quantity
    let newQuantity: number | undefined = Number(prompt('Enter updated item quantity:')) ?? undefined
    // If new quantity is zero or undefined, delete offering from list and exit
    if(!newQuantity) {
      deleteOffering(itemName, originatingParty)
      return
    }
    console.log(`New quantity: ${newQuantity}`)
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

  return (
    <div className='flex flex-row items-center justify-center min-h-screen h-auto w-screen'>
      <div className='flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-16'>
        
        <div className='flex flex-col flex-1 gap-8'>
          <div className='flex flex-row w-full items-end justify-start gap-8'>
            <img className='h-10 w-auto' src="/rust-logo.png"/>
            <div className='flex flex-row items-end justify-start gap-4'>
              <h1 className='text-3xl font-semibold'>Trade evaluator</h1>
              <p className='opacity-60 text-xl'>v{version}</p>
            </div>
          </div>
          <p className='text-2xl opacity-80 leading-10'>An unofficial trade evaluator for Rust players. Enter your items to see how fair a trade is.</p>
          <div className='flex flex-col gap-4'>
            <label className='font-medium text-xl'>What are you trading?</label>
            <div className="flex flex-row w-full relative items-start justify-start">
              <input value={itemSearchQuery} onChange={(e) => {
                setItemSearchQuery(e.target.value)
              }} style={{backgroundColor: '#403C34'}} className='p-4 pl-14 font-medium text-lg outline-none focus:ring focus:ring-crimson focus:ring-offset-2 focus:ring-2 focus:ring-offset-mud w-full' type="text" placeholder="e.g. Low-grade fuel"/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-6 h-6 ml-4 mt-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              {/* Droppdown of recommendations */}
              {itemSearchQuery ? <div style={{top: '100%', marginTop: 12, left: 0, zIndex: 9}} className="bg-glass absolute w-full flex flex-col p-2 gap-1">
                {recommendations.map((recommendation, i) => (
                  <div className="bg-glass-brighter p-2 capitalize cursor-pointer" style={{zIndex:10}} key={i} onClick={() => {
                    // Prompt for quantity
                    let quantity: number = Number(prompt('How much?')) ?? 1
                    // Add item to recipient side
                    setRecipientOffer([{
                      name: recommendation,
                      quantity
                    },...recipientOffer])
                    // Clear recommendations and item search query to reset input state
                    setItemSearchQuery('')
                    setRecommendations([])
                  }}>{recommendation}</div>
                ))}
                {recommendations.length < 1 ? <p>No items found with that name. Check your spelling and try again?</p> : <></>} 
              </div> : <></>}
            </div>
            <p className='opacity-60 italic'>Begin typing to add items and start a trade.</p>
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-4'>
          <h2 className="text-xl font-medium">Trade details</h2>
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <TradeHeader editable onClick={() => {
                let pendingName : string | undefined | null = prompt('Enter recipient username:')
                if(pendingName === '') pendingName = undefined
                window.localStorage.setItem('recipientName', pendingName ?? '')
                setRecipientName(pendingName ?? undefined)
            }}>{recipientName ?? 'Recipient'}</TradeHeader>
            <div className="grid grid-cols-6 gap-2 w-full px-2">
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
            <div className="grid grid-cols-6 gap-2 w-full mt-2 px-2">
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
            <div className="w-full bg-glass p-3 flex flex-row items-center justify-center gap-4 text-center">
              <p className="text-lg opacity-60 p-4">{tradeFairness ?? 'Add an item to both sides to begin evaluating.'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
