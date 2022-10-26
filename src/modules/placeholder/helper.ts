import { IDomEditor, SlateNode, SlateTransforms } from '@wangeditor/editor'
import { PlaceholderElement } from './custom-types'

export function getPlaceholderHTML(value: string, alias?: string) {
  if (!value) return ''
  if (!alias) alias = value // 无 alias 则用 value 代替
  return `<span data-w-e-type="placeholder" data-w-e-is-void data-w-e-is-inline data-value="${value}" data-alias="${alias}">${alias}</span>`
}

/**
 * 插入 placeholder 节点
 * @param value value
 * @param alias alias
 */
export function insertPlaceholder(editor: IDomEditor, value: string, alias?: string) {
  if (!value) return
  if (!alias) alias = value // 无 alias 则用 value 代替

  // 还原选区
  editor.restoreSelection()

  // 插入节点
  const placeholderElem: PlaceholderElement = {
    type: 'placeholder',
    value,
    alias,
    children: [{ text: value }, { text: '' }],
  }
  // 没有使用editor.insertNode是因为editor.insertNode处理maxLength
  // https://github.com/wangeditor-team/wangEditor/blob/5496de39705711979446393b11cbd0fcd672b532/packages/core/src/editor/plugins/with-max-length.ts#L41
  SlateTransforms.insertNodes(editor, placeholderElem)
  editor.move(1)
}
