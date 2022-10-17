export type Name = string
export type Element = number | 'infinity'

export type TDValue = Element | Name | null

export interface TRow {
  race?: Name
  being?: Name
  state: Name | null
  correspond: Element | null
  electro: Element
  pyro: Element
  hydro: Element
  cryo: Element
  dendro: Element
  anemo: Element
  geo: Element
  physical: Element
}

export type THKey = keyof TRow

export type THItem = { key: string; value: string }
