/**
 * @description placeholder plugin
 */

import { DomEditor, IDomEditor } from '@wangeditor/editor'

function withPlaceholder<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid } = editor
  const newEditor = editor

  DomEditor.getLeftLengthOfMaxLength = () => {
    const { maxLength, onMaxLength, placeholderList } = editor.getConfig()

    // 未设置 maxLength ，则返回 number 最大值
    if (typeof maxLength !== 'number' || maxLength <= 0) return Infinity

    let editorText = editor.getText().replace(/\r|\n|(\r\n)/g, '') // 去掉换行
    if (placeholderList?.length) {
      placeholderList.forEach(item => {
        const reg = new RegExp(item.value, 'g')
        editorText = editorText.replace(reg, '')
      })
    }

    const curLength = editorText.length
    const leftLength = maxLength - curLength

    if (leftLength <= 0) {
      // 触发 maxLength 限制，不再继续插入文字
      if (onMaxLength) onMaxLength(editor)
    }

    return leftLength
  }

  // 重写 isInline
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'placeholder') {
      return true
    }

    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'placeholder') {
      return true
    }

    return isVoid(elem)
  }

  return newEditor
}

export default withPlaceholder
