/**
 * @description elem to html
 */

import { SlateElement } from '@wangeditor/editor'
import { PlaceholderElement } from './custom-types'
import { getPlaceholderHTML } from './helper'

// 生成 html 的函数
function placeholderToHtml(elem: SlateElement, _childrenHtml: string): string {
  const { value, alias } = elem as PlaceholderElement
  return getPlaceholderHTML(value, alias)
}

// 配置
const conf = {
  type: 'placeholder', // 节点 type ，重要！！！
  elemToHtml: placeholderToHtml,
}

export default conf
