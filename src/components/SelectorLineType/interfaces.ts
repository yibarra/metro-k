import type { HTMLAttributes } from "react"

export interface SelectorLineTypeProps<T = HTMLDivElement>
  extends HTMLAttributes<T> {
  defaultValue?: number
  items: Record<string, string>[]
  onChangeValue(val: number): void
  variant?: string
}
