/**
 * @description parse elem html
 */

import { DOMElement } from '@wangeditor/editor/dist/editor/src/utils/dom'
import { PlaceholderElement } from './custom-types'

function parseHtml(elem: DOMElement) {
  const value = elem.getAttribute('data-value') || ''
  const alias = elem.getAttribute('data-alias') || ''
  return {
    type: 'placeholder',
    value,
    alias,
    children: [{ text: value }, { text: '' }], // void node 必须有一个空白 text
  } as PlaceholderElement
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="placeholder"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
