import Vue from 'vue'
import VueI18n from 'vue-i18n'

import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import elementEN from 'element-ui/lib/locale/lang/en'
import elementJA from 'element-ui/lib/locale/lang/ja'

import custonZH from '@/lang/zh'
import custonEN from '@/lang/en'
import custonJA from '@/lang/ja'

import Cookie from 'js-cookie'

Vue.use(VueI18n)

export default new VueI18n({
    locale: Cookie.get('language') || 'zh' || "ja",
    messages: {
        en: {
            ...elementEN,
            ...custonEN
        },
        zh: {
            ...elementZH,
            ...custonZH
        },
        ja: {
            ...elementJA
        }
    }
})