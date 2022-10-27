import '@wangeditor/editor/dist/css/style.css'
import './assets/index.less'

import type { PlaceholderInfo } from './modules/placeholder/custom-types'

export type { PlaceholderInfo }

// 注册模块
import './register-modules'

// 导出 API 和接口
export { Boot, DomEditor } from '@wangeditor/editor'

export type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  Toolbar,
  // 第三方模块 - 接口
  IModuleConf,
  IButtonMenu,
  ISelectMenu,
  IDropPanelMenu,
  IModalMenu,
  // 第三方模块 - 多语言
  i18nChangeLanguage,
  i18nAddResources,
  i18nGetResources,
  t,
  // 第三方模块 - modal 中用到的 API
  genModalTextareaElems,
  genModalInputElems,
  genModalButtonElems,
  // 第三方模块 - 上传时用到
  createUploader,
  IUploadConfig,
  // 导出 slate API 和接口
  SlateTransforms,
  SlateDescendant,
  SlateEditor,
  SlateNode,
  SlateElement,
  SlateText,
  SlatePath,
  SlateRange,
  SlateLocation,
  SlatePoint,
} from '@wangeditor/editor'

// 导出 create 函数
export { createEditor, createToolbar } from './create'

export default {}

declare module '@wangeditor/editor' {
  /**
   * 编辑器config
   */
  interface IEditorConfig {
    /**
     * 配置编辑器默认是否 focus，默认为 false
     */
    autoFocus: boolean
    /**
     * 占位符集合
     *
     * 当设置了maxLength时，占位符的长度不会被统计
     */
    placeholderList?: Array<PlaceholderInfo>
  }

  interface IDomEditor {
    getConfig: () => IEditorConfig
    /**
     * 在选区插入占位符
     */
    insertPlaceholder: (value: string, alias?: string) => void
    /**
     * 重置编辑器的 text 内容
     *
     *【注意】只能解析 editor.getText() 返回的内容。
     */
    setText: (text: string) => void
  }
}
