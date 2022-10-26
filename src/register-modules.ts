/**
 * @description register modules
 */
import { Boot } from '@wangeditor/editor'

// placeholder-module
import './modules/placeholder/style.less'
import placeholderModule from './modules/placeholder'

Boot.registerModule(placeholderModule)
