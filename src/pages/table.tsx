import { Item } from "@/types"
import { values } from "@/components"

const sulfurPerScrap = 8

export default function Table() {
    'use client'

    return (
        <div className="flex items-center justify-center p-2 min-h-screen w-screen">
            <table className="max-w-6xl w-full">
                <thead>
                    <tr>
                        <th colSpan={2} rowSpan={2} color="black"></th>
                        <th colSpan={3} color="yellow" ><b>Day XX of Wipe</b></th>
                    </tr>
                    <tr>
                        <th className="row-2" colSpan={2} color="#E2EFDA" align="center">(item value)</th>
                        <th className="row-2" rowSpan={2} color="lightyellow"><b>Justification</b></th>
                    </tr>
                    <tr>
                        <th className="row-3" color="white"><b>Category</b></th>
                        <th className="row-3" color="white"><b>Item</b></th>
                        <th className="row-3" color="#E2EFDA"><b>Scrap</b></th>
                        <th className="row-3" color="#C6E0B4"><b>Sulfur</b></th>
                    </tr>
                </thead>
                <tbody>
                    {(values ?? []).map((item: Item, i: number) => (
                        <tr key={i}>
                            <td style={{textTransform: 'capitalize'}}>{item.category}</td>
                            <td style={{textTransform: 'capitalize'}}>{item.name}</td>
                            <td>{(item.scrapPer).toFixed(2)}</td>
                            <td>{(item.scrapPer * sulfurPerScrap).toFixed(2)}</td>
                            <td>{item.justification ?? 'Not provided.'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}