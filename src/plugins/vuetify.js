import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// 预定义的 material 色彩
import colors from 'vuetify/lib/util/colors'
//引入vuetify样式
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            // 定义主题色
            light: {
                primary:'#4ecac2',
                primary_f:'#ffffff',    //'#defffc'
                secondary:'#ffffff'
            },
            dark: {

            }
        },
        dark: false,
    },
});