/**
 * @description placeholder element
 */

export type PlaceholderElement = {
  type: 'placeholder'
  alias: string
  value: string
  children: [{ text: string }, { text: '' }]
}

export interface PlaceholderInfo {
  /** 占位符 */
  value: string
  /** 别名 */
  alias?: string
  buttonText?: string
}
