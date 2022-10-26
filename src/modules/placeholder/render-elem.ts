/**
 * @description render elem
 */

import { h, VNode } from 'snabbdom'
import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor'
import { PlaceholderElement } from './custom-types'

function renderPlaceholder(
  elem: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  const isDisabled = editor.isDisabled()

  // 当前节点是否选中
  const selected = DomEditor.isNodeSelected(editor as any, elem)

  // 构建 vnode
  const { value = '', alias = '' } = elem as PlaceholderElement

  const className = ['w-e-placeholder-container']
  if (selected && !isDisabled) {
    className.push('w-e-placeholder-container--selected')
  }

  const vnode = h(
    'span',
    {
      props: {
        contentEditable: false, // 不可编辑
        className: className.join(' '),
      },
      dataset: {
        value,
        alias,
      },
      style: {
        display: 'inline-block', // inline
        cursor: isDisabled ? 'pointer' : 'inherit',
      },
    },
    [alias]
  )

  return vnode
}

const conf = {
  type: 'placeholder', // 节点 type ，重要！！！
  renderElem: renderPlaceholder,
}

export default conf
