<template>
    <v-app>
        <!-- 
          左抽屉
          app：app挂载
          clipped：抽屉位于应用程序工具栏下方
         -->
        <v-navigation-drawer
            app
            clipped
            v-model="openStatusData.drawer"
            mini-variant
            mini-variant-width="56px"
            class="primary"

        >
            <v-list dense>
                <v-list-item class="px-2">
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item-avatar
                                link
                                v-bind="attrs"
                                v-on="on"
                                class="mx-auto"
                                @click="handleLogin"
                                @contextmenu.prevent="handleLoginOut"
                            >
                                <!-- 登录显示 -->
                                <v-icon x-large v-if="isLogin" color="secondary"
                                    >mdi-account</v-icon
                                >

                                <!-- 未登录显示 -->
                                <v-icon x-large v-else color="secondary"
                                    >mdi-account-question</v-icon
                                >

                                
                            </v-list-item-avatar>
                        </template>
                        <span>{{ forData.user.tips }}</span>
                    </v-tooltip>
                </v-list-item>

                <v-divider></v-divider>
                <template v-for="item in forData.items">
                    <v-tooltip right :key="item.text">
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item
                                link
                                v-bind="attrs"
                                v-on="on"
                                @click="$router.push(item.fullPath)"
                                :class="item.fullPath===$route.fullPath?'white':'' "
                            >
                                <v-list-item-icon >
                                    <v-icon :color="item.fullPath===$route.fullPath?'primary':'secondary' ">{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <span>{{ item.tips }}</span>
                    </v-tooltip>
                </template>


                <v-tooltip right >
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item link v-bind="attrs" v-on="on" style="position: absolute;bottom: 30px;">
                            <v-list-item-icon>
                                <v-icon color="red">mdi-close-circle-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title> 退出 </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <span>退出</span>
                </v-tooltip>
            </v-list>
        </v-navigation-drawer>

        <!-- 
          顶部导航栏
          app：app挂载
          clipped-left：指定位于左侧的应用程序的v-navigation-drawer在应用程序栏下方
          dense：密集
         -->
        <v-app-bar app clipped-left dense class="primary primary_f--text">
            <v-app-bar-nav-icon
                @click.stop="openStatusData.drawer = !openStatusData.drawer"
                color = 'secondary'
            ></v-app-bar-nav-icon>
            <!-- 导航栏标题 -->
            <v-toolbar-title class="mr-12 align-center">
                <span class="title">后台管理系统</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <!-- 主要内容 -->
        <v-main>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </v-main>

        <v-dialog max-width="500" v-model="openStatusData.login" persistent>
            <v-card class="mx-auto" max-width="500">
                <v-card-title class="font-weight-bold justify-space-between">
                    <span>登录</span>
                </v-card-title>

                <v-card-text>
                    <v-form v-model="loginForm.valid" ref="loginForm">
                        <v-text-field
                            label="账号"
                            placeholder="输入你的用户名"
                            v-model="loginForm.username"
                            :rules="[formRules.required]"
                        ></v-text-field>

                        <v-text-field
                            label="密码"
                            placeholder="输入你的密码"
                            :rules="[formRules.required]"
                            v-model="loginForm.password"
                            autocomplete="new-password"
                            :append-icon="
                                loginForm.eye1 ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="loginForm.eye1 ? 'text' : 'password'"
                            @click:append="loginForm.eye1 = !loginForm.eye1"
                        ></v-text-field>
                    </v-form>

                    <v-btn
                        block
                        color="primary"
                        @click="requestLogin"
                        class="mt-4"
                        :disabled="!loginForm.valid"
                        >登录</v-btn
                    >
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- 常用消息提示组件 -->
        <v-snackbar v-model="snackbarStatus" :color="snackbarColor">
            {{ snackbarText }}
        </v-snackbar>
    </v-app>
</template>

<script>
import NW from "@/network/options";
export default {
    name: "Home",
    data() {
        return {
            /**
             * 开启关闭状态
             */
            openStatusData: {
                leftDrawer: null,
                login: false,
            },
            /**
             * 列表渲染状态
             */
            forData: {
                user: {
                    src: "https://randomuser.me/api/portraits/women/75.jpg",
                    tips: "用户",
                },
                items: [
                    {
                        icon: "mdi-apps-box",
                        tips: "箱子管理",
                        text: "箱子管理",
                        fullPath: "/Main",
                    },
                    {
                        icon: "mdi-account-group",
                        tips: "用户管理",
                        text: "用户管理",
                        fullPath: "/UserManage",
                    },
                    {
                        icon: "mdi-store-outline",
                        tips: "商城管理",
                        text: "商城管理",
                        fullPath: "/ShopManage",
                    },
                ],
            },

            /**
             * 登录表单
             */
            loginForm: {
                username: "",
                password: "",
                valid: false,
                eye1: false,
            },
            /**
             * 表单验证：通用规则
             */
            formRules: {
                required: (v) => !!v || "必填",
            },

            /**
             * 登录状态
             */
            isLogin: false,

            /**
             * 常用消息提示组件
             */
            snackbarStatus: false,
            snackbarText: "",
            snackbarColor: "info",
        };
    },
    methods: {
        handleLogin() {
            if (this.isLogin) {
                return;
            } else {
                this.openStatusData.login = true;
            }
        },
        handleLoginOut() {
            // 如果已经登录了 则退出
            if (this.isLogin) {
                this.openStatusData.login = true;
                this.$yyCookies.remove('token')
                this.isLogin = false
            } else {
                return;
            }
        },
        requestLogin() {
            this.$yyRequest({
                url: NW.LOGIN,
                method: "post",
                data: {
                    userName: this.loginForm.username,
                    passWord: this.loginForm.password,
                },
            })
                .then((res) => {
                    this.$yyCookies.set("token", res.data);
                    this.showSnackbar({
                        text: "登录成功",
                        type: "success",
                    });
                    this.openStatusData.login = false;
                    this.isLogin = true
                })
                .catch((res) => {
                    this.showSnackbar({
                        text: "登录失败",
                        type: "error",
                    });
                    this.loginForm.username = ''
                    this.loginForm.password = ''
                });
        },
        // 消息条函数
        showSnackbar(obj) {
            this.snackbarText = obj.text;
            this.snackbarStatus = true;
            this.snackbarColor = obj.type || "info";
            setTimeout(() => {
                this.snackbarStatus = false;
                this.snackbarText = "";
            }, obj.time || 2000);
        },
    },
    mounted(){
        if(this.$yyCookies.get("token")){
            this.isLogin = true
        }else{
            this.openStatusData.login = true
        }
        
    },
    components: {},
};
</script>