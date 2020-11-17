<template>
    <v-container class="fill-height" fluid>
        <v-row class="fill-height">
            <v-col cols="2">
                <v-list two-line>
                    <v-text-field
                        label="搜索"
                        prepend-icon="mdi-magnify"
                    ></v-text-field>
                    <v-divider class="mb-5"></v-divider>
                    <v-list-item
                        v-for="(item, index) in userList"
                        :key="item.id"
                        link
                        @click="handleSwitchTable(index)"
                        :class="curTable == index ? 'primary' : ''"
                    >
                        <v-list-item-icon>
                            <v-icon large :class="
                                    curTable == index ? 'secondary--text' : ''
                                ">{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                :class="
                                    curTable == index ? 'secondary--text' : ''
                                "
                                >{{ item.text }}</v-list-item-title
                            >
                            <v-list-item-subtitle
                                :class="
                                    curTable == index ? 'secondary--text' : ''
                                "
                                v-if="item.number!==''"
                                >{{
                                    "数量：" + item.number + "个"
                                }}</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-5"></v-divider>
                </v-list>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
                <!-- <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title>{{
                            boxList[indexItem].id
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            boxList[indexItem].loca
                        }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item> -->
                <v-scroll-x-transition mode="out-in">
                    <v-data-table
                        :headers="tableSwitch[curTable].headersUser"
                        :items="tableSwitch[curTable].dessertsUser"
                        :options.sync="options"
                        :server-items-length="
                            tableSwitch[curTable].totalDessertsUser
                        "
                        :items-per-page="10"
                        :loading="loading"
                        class="elevation-0"
                        v-if="tableIf"
                    >
                    <template v-slot:no-data>
                        <div>暂无数据</div>
                    </template>
                    
                    </v-data-table>
                </v-scroll-x-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import NW from "@/network/options";
export default {
    data() {
        return {
            // 左侧选项栏
            userList: [
                {
                    text: "全部用户",
                    number: "",
                    id: 0,
                    icon: "mdi-account-group",
                },
                {
                    text: "投瓶用户",
                    number: "",
                    id: 1,
                    icon: "mdi-bottle-soda-classic",
                },
                {
                    text: "人脸用户",
                    number: "",
                    id: 2,
                    icon: "mdi-face-recognition",
                },
                {
                    text: "认证用户",
                    number: "",
                    id: 3,
                    icon: "mdi-card-account-details-outline",
                },
                {
                    text: "微信用户",
                    number: "",
                    id: 4,
                    icon: "mdi-wechat",
                },
                {
                    text: "兑换礼品用户",
                    number: "",
                    id: 5,
                    icon: "mdi-gift",
                },
            ],

            curTable: 0,

            loading: true,
            options: {},

            tableSwitch: [
                {
                    // 全部
                    dataUser: [],
                    totalDessertsUser: 0,
                    dessertsUser: [],
                    countUserPage: 1,
                    headersUser: [
                        {
                            text: "用户ID",
                            value: "id",
                        },
                        { text: "电话", value: "telephoneNumber" },
                        { text: "是否人脸认证", value: "openId1" },
                        { text: "是否采集人脸", value: "openId2" },
                        { text: "是否来自微信", value: "openId3" },
                        { text: "当前积分", value: "openId4" },
                        { text: "投瓶记录", value: "openId5" },
                        { text: "兑换记录", value: "openId6" },
                    ],
                },
                {
                    // 投瓶用户
                    dataUser: [],
                    totalDessertsUser: 0,
                    dessertsUser: [],
                    countUserPage: 1,
                    headersUser: [
                        {
                            text: "用户ID",
                            value: "id",
                        },
                        { text: "投瓶时间", value: "time" },
                        { text: "投瓶种类", value: "openId1" },
                        { text: "积分", value: "openId2" },
                        { text: "是否兑换", value: "openId3" },
                    ],
                },
                {
                    // 人脸用户
                    dataUser: [],
                    totalDessertsUser: 0,
                    dessertsUser: [],
                    countUserPage: 1,
                    headersUser: [
                        {
                            text: "用户ID",
                            value: "id",
                        },
                        { text: "投瓶时间", value: "time" },
                        { text: "投瓶种类", value: "openId1" },
                        { text: "积分", value: "openId2" },
                        { text: "已有积分", value: "openId5" },
                        { text: "是否兑换", value: "openId3" },
                    ],
                },
                {
                    // 认证用户
                    dataUser: [],
                    totalDessertsUser: 0,
                    dessertsUser: [],
                    countUserPage: 1,
                    headersUser: [
                        {
                            text: "用户ID",
                            value: "id",
                        },
                        { text: "电话", value: "time" },
                        { text: "积分", value: "openId1" },
                        { text: "手机人脸", value: "openId2" },
                        { text: "箱子人脸", value: "openId5" },
                        { text: "投瓶记录", value: "openId3" },
                        { text: "兑换记录", value: "openId4" },
                    ],
                },
                {
                    // 微信用户
                    dataUser: [],
                    totalDessertsUser: 0,
                    dessertsUser: [],
                    countUserPage: 1,
                    headersUser: [
                        {
                            text: "用户ID",
                            value: "id",
                        },
                        { text: "电话", value: "time" },
                        { text: "积分", value: "openId1" },
                        { text: "投瓶记录", value: "openId2" },
                        { text: "兑换记录", value: "openId3" },
                    ],
                },
                {
                    // 兑换礼品用户
                    dataUser: [],
                    totalDessertsUser: 0,
                    dessertsUser: [],
                    countUserPage: 1,
                    headersUser: [
                        {
                            text: "用户ID",
                            value: "id",
                        },
                        { text: "电话", value: "time" },
                        { text: "积分", value: "openId1" },
                        { text: "兑换地方", value: "openId2" },
                        { text: "邮寄地址", value: "openId3" },
                        { text: "是否完成", value: "openId4" },
                        { text: "兑换记录", value: "openId5" },
                    ],
                },
            ],

            tableIf: true,
        };
    },
    watch: {
        options: {
            handler(newVal, oldVal) {
                if (
                    newVal.page ===
                    this.tableSwitch[this.curTable].countUserPage
                ) {
                    this.loading = true;
                    this.requestUserList(
                        this.getUrl(this.curTable),
                        this.tableSwitch[this.curTable].countUserPage++
                    )
                        .then(({ data }) => {
                            this.tableSwitch[this.curTable].dataUser.push(
                                ...data.list
                            );
                            if (newVal.itemsPerPage > 0) {
                                this.tableSwitch[
                                    this.curTable
                                ].dessertsUser = this.tableSwitch[
                                    this.curTable
                                ].dataUser.slice(
                                    (newVal.page - 1) * newVal.itemsPerPage,
                                    newVal.page * newVal.itemsPerPage
                                );
                            }
                            this.tableSwitch[this.curTable].totalDessertsUser =
                                data.total;

                            this.loading = false;

                            this.userList[this.curTable].number = data.total;
                        })
                        .catch((n) => {
                            console.log(n, "报错");
                        });
                } else {
                    if (newVal.itemsPerPage > 0) {
                        this.tableSwitch[
                            this.curTable
                        ].dessertsUser = this.tableSwitch[
                            this.curTable
                        ].dataUser.slice(
                            (newVal.page - 1) * newVal.itemsPerPage,
                            newVal.page * newVal.itemsPerPage
                        );
                        this.loading = false;
                    }
                }
            },
            deep: true,
        },
    },
    mounted() {},
    methods: {
        // 请求用户列表
        requestUserList(url, page) {
            return this.$yyRequest({
                url: `${url}${page}`,
                headers: { token: `${this.$yyCookies.get("token")}` },
                method: "get",
            });
        },
        getUrl(index) {
            index = Number(index);
            switch (index) {
                case 0:
                    return NW.GETUSERLIST;
                case 1:
                    return NW.GETUSERLIST;
                case 2:
                    return NW.GETFACEUSERLIST;
                case 3:
                    return NW.GETUSERLIST;
                default:
            }
        },
        handleSwitchTable(index) {
            this.tableIf = false;

            this.curTable = index;
            setTimeout(() => {
                this.tableIf = true;
            }, 0);
        },
    },
};
</script>

<style>
</style>