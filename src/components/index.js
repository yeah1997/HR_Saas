import PageTools from '@/components/PageTools/'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import Print from 'vue-print-nb'
import SreenFull from '@/components/ScreenFull'
import ThemePicker from '@/ThemePicker'
import LangSelect from '@/components/Lang'
import TagsView from '@/components/TagsView'

export default {
    install(Vue) {
        Vue.component("PageTools", PageTools)
        Vue.component('UploadExcel', UploadExcel)
        Vue.component('ImageUpload', ImageUpload)
        Vue.component("SreenFull", SreenFull)
        Vue.component("ThemePicker", ThemePicker)
        Vue.component("LangSelect", LangSelect)
        Vue.component('TagsView', TagsView)

        Vue.use(Print)
    },
}