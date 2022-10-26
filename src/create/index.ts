import {
  ICreateEditorOption as _ICreateEditorOption,
  ICreateToolbarOption as _ICreateToolbarOption,
} from '@wangeditor/editor/dist/editor/src/create'

import {
  createEditor as coreCreateEditor,
  createToolbar as coreCreateToolbar,
  IEditorConfig,
  IDomEditor,
  Toolbar,
} from '@wangeditor/editor'
import { getPlaceholderHTML, insertPlaceholder } from '../modules/placeholder/helper'
import { merge } from 'lodash-es'
import { delay } from '../utils'

interface ICreateEditorOption extends Omit<_ICreateEditorOption, 'config'> {
  /** 是否允许在选区回车换行，默认允许 */
  allowBreak?: boolean
  config: Partial<IEditorConfig>
}

interface ICreateToolbarOption extends Omit<_ICreateToolbarOption, 'editor'> {
  editor: IDomEditor | null
}

const customPaste = (editor, event: ClipboardEvent): boolean => {
  // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
  // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent
  const text = event.clipboardData?.getData('text/plain') // 获取粘贴的纯文本
  if (text) editor.insertText(text)
  // 阻止默认的粘贴行为
  event.preventDefault()
  return false
}

/**
 * createEditor 默认配置
 */
const baseOption: Partial<ICreateEditorOption> = {
  mode: 'simple',
  allowBreak: true,
  config: {
    autoFocus: false,
    customPaste: customPaste,
  },
}

async function setTextCore(editor: IDomEditor, text: string) {
  const config = editor.getConfig()
  if (config.placeholderList?.length) {
    config.placeholderList.forEach(item => {
      const reg = new RegExp(item.value, 'g')
      text = text.replace(reg, getPlaceholderHTML(item.value, item.alias))
    })
  }
  const html = text
    .split(/\n/)
    .map(line => `<p>${line}</p>`)
    .join('')

  editor.setHtml(html)

  // 将光标定位到末端
  await delay(0)
  editor.focus(true)
  await delay(0)
  editor.blur()
}

/**
 * 创建 editor 实例
 */
export function createEditor(option: Partial<ICreateEditorOption> = {}): IDomEditor {
  const opt: Partial<ICreateEditorOption> = merge({}, baseOption, option)

  const editor = coreCreateEditor(opt as any) as IDomEditor
  editor.insertPlaceholder = (...options) => {
    insertPlaceholder(editor, ...options)
  }
  editor.setText = (text: string) => {
    setTextCore(editor, text)
  }

  if (!opt.allowBreak) {
    editor.insertBreak = () => void 0
  }

  return editor
}

/**
 * 创建 toolbar 实例
 */
export function createToolbar(option: ICreateToolbarOption): Toolbar {
  if (!option.mode) option.mode = 'simple'

  return coreCreateToolbar(option as any)
}
