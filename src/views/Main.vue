<template>
    <v-container class="fill-height" fluid>
        <v-row class="fill-height">
            <v-col cols="2">
                <v-text-field
                    label="搜索"
                    prepend-icon="mdi-magnify"
                ></v-text-field>

                <v-divider class="mb-5"></v-divider>

                <v-expansion-panels flat focusable popout>
                    <v-expansion-panel
                        v-for="(item, index) in boxList"
                        :key="item.id"
                        :class="curIndexDevice == index ? 'primary' : ''"
                        @click="
                            curIndexDevice = index;
                            curIndexSelect = -1;
                        "
                    >
                        <!-- 头部 -->
                        <v-expansion-panel-header>
                            <template v-slot:actions>
                                <v-icon color="secondary">$expand</v-icon>
                            </template>
                            <v-list-item-content
                                :class="
                                    curIndexDevice == index
                                        ? 'secondary--text'
                                        : ''
                                "
                            >
                                <v-list-item-title>{{
                                    item.id
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                    :class="
                                        curIndexDevice == index
                                            ? 'secondary--text'
                                            : ''
                                    "
                                    >{{ item.loca }}</v-list-item-subtitle
                                >
                            </v-list-item-content>
                        </v-expansion-panel-header>

                        <!-- 内容体 -->
                        <v-expansion-panel-content>
                            <v-list dense class="primary">
                                <v-list-item-group>
                                    <v-list-item
                                        v-for="(item, index) in btnSelect"
                                        :key="item.text"
                                        dense
                                        @click="curIndexSelect = index"
                                    >
                                        <v-list-item-icon>
                                            <v-icon
                                                :class="
                                                    curIndexSelect == index
                                                        ? 'secondary--text'
                                                        : ''
                                                "
                                                >{{ item.icon }}</v-icon
                                            >
                                        </v-list-item-icon>

                                        <v-list-item-content
                                            :class="
                                                curIndexSelect == index
                                                    ? 'secondary--text'
                                                    : ''
                                            "
                                        >
                                            <v-list-item-title
                                                v-text="item.text"
                                            ></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group> </v-list
                        ></v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-divider class="mt-5"></v-divider
            ></v-col>
            <v-divider vertical></v-divider>

            <v-col>
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title>{{
                            boxList[curIndexDevice].id
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            boxList[curIndexDevice].loca
                        }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-scroll-x-transition mode="out-in">
                    <template v-if="curIndexSelect == 0">
                        <v-data-table
                            :headers="table1"
                            :items="items"
                            :items-per-page="15"
                            class="elevation-0"
                            key="1"
                        ></v-data-table>
                    </template>

                    <template v-else-if="curIndexSelect == 1">
                        <v-data-table
                            :headers="table2"
                            :items="items"
                            :items-per-page="15"
                            class="elevation-0"
                            key="2"
                        ></v-data-table>
                    </template>

                    <template v-else-if="curIndexSelect == 2">
                        <v-data-table
                            :headers="table3"
                            :items="items"
                            :items-per-page="15"
                            class="elevation-0"
                            key="3"
                        ></v-data-table>
                    </template>

                    <template v-if="curIndexSelect == -1">
                        <v-data-table
                            :headers="table1"
                            :items="items"
                            :items-per-page="15"
                            class="elevation-0"
                            key="4"
                        ></v-data-table>
                        <v-divider class="my-16"></v-divider>

                        <v-data-table
                            :headers="table2"
                            :items="items"
                            :items-per-page="15"
                            class="elevation-0"
                            key="5"
                        >
                        </v-data-table>
                        <v-divider class="my-16"></v-divider>

                        <v-data-table
                            :headers="table3"
                            :items="items"
                            :items-per-page="15"
                            class="elevation-0"
                            key="6"
                        ></v-data-table>
                    </template>
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
            boxList: [
                {
                    id: "HEMC01",
                    loca: "广州市从化区钟落潭镇南盾设备公司",
                },
                {
                    id: "HEMC02",
                    loca: "广州市从化区钟落潭镇南盾设备公司",
                },
                {
                    id: "HEMC03",
                    loca: "广州市从化区钟落潭镇南盾设备公司",
                },
                {
                    id: "HEMC04",
                    loca: "广州市从化区钟落潭镇南盾设备公司",
                },
                {
                    id: "HEMC05",
                    loca: "广州市从化区钟落潭镇南盾设备公司",
                },
            ],
            btnSelect: [
                {
                    text: "箱子容量",
                    icon: "mdi-file-table-box-outline",
                },
                {
                    text: "礼品柜",
                    icon: "mdi-gift",
                },
                {
                    text: "投递记录",
                    icon: "mdi-history",
                },
            ],

            table1: [
                {
                    text: "时间",
                    value: "id",
                },
                { text: "当前箱子容量", value: "telephoneNumber" },
                { text: "上次清理时间", value: "openId1" },
                { text: "联系电话", value: "openId2" },
                { text: "短信通知", value: "openId3" },
            ],

            table2: [
                {
                    text: "礼品通道",
                    value: "id",
                },
                { text: "礼品名称", value: "telephoneNumber" },
                { text: "容量", value: "openId1" },
                { text: "剩余", value: "openId2" },
                { text: "兑换积分", value: "openId3" },
                { text: "联系电话", value: "openId3" },
                { text: "短信通知", value: "openId3" },
            ],
            table3: [
                {
                    text: "礼品通道",
                    value: "id",
                },
                { text: "时间", value: "telephoneNumber" },
                { text: "投递类型", value: "openId1" },
                { text: "用户", value: "openId2" },
                { text: "积分数量", value: "openId3" },
                { text: "是否领取积分", value: "openId3" },
            ],

            items: [],

            curIndexDevice: 0,

            curIndexSelect: -1,

            items1: [
                { text: "Real-Time", icon: "mdi-clock" },
                { text: "Audience", icon: "mdi-account" },
                { text: "Conversions", icon: "mdi-flag" },
            ],
        };
    },
    mounted() {
        this.$yyRequest({
            url: NW.GETUSERLIST,
            // url:'/file/getMapPlanning',
            method: "get",
        }).then((n) => {
            console.log(n);
        });
    },
};
</script>

<style>
</style>