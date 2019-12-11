import Vue from 'vue'
import Router from 'vue-router'

import Tab from '@/pages/catalog/Tab'// 目录

import Daily from '@/pages/daily_homework/Daily'// 布置作业
import Answer from "@/pages/daily_homework/Answer" // 设置答题卡
import Send from "@/pages/daily_homework/Send" // 发送作业
import Appoint from "@/pages/daily_homework/Appoint" // 指定学生

import Teach from '@/pages/teaching_assistant/Teach'// 我的教辅
import Chapter from "@/pages/teaching_assistant/Chapter" // 选择章节
import Content from "@/pages/teaching_assistant/Content" // 教辅详情页
import Selected from "@/pages/teaching_assistant/Selected" //已选题目


import Item from '@/pages/item_bank/Item'// 题库出题
import Details from "@/pages/item_bank/Details" // 题库详情页


import Error from '@/pages/error_book/Error'// 错题本出题


import Record from "@/pages/job_log/Record" // 作业记录


Vue.use(Router)

export default new Router({
  // mode: 'history',未配置
  routes: [
    {path: '/', redirect: '/tab'},
    {path: '/tab', name: 'Tab', component: Tab}, //目录
    {path: '/daily', name: 'Daily', component: () => import('@/pages/daily_homework/Daily'),},//布置作业
    {path: '/error', name: 'Error', component: () => import('@/pages/error_book/Error')},//出题本出题
    {path: '/item', name: 'Item', component: () => import('@/pages/item_bank/Item')},//题库出题
    {path: '/teach', name: 'Teach', component: () => import('@/pages/teaching_assistant/Teach')},//我的教辅
    {path: '/addBook', name: 'AddBook', component: () => import('@/pages/teaching_assistant/AddBook')},//我的教辅
    {path: '/answer', name: 'Answer', component: Answer,},//
    {path: '/edit', component: () => import('@/pages/daily_homework/Edit'), name: 'Edit',},
    {path: '/send', name: 'Send', component: Send},//
    {path: '/appoint', name: 'Appoint', component: Appoint},//
    {path: '/chapter', name: 'Chapter', component: Chapter},//
    {path: '/content', name: 'Content', component: Content},//
    {path: '/details', name: 'Details', component: Details},//
    {path: '/selected', name: 'Selected', component: Selected},//
    {path: '/record', name: 'Record', component: Record},//
    { path: '/tack', name:"Tack",component: () => import('@/pages/job_log/Tack')},
    { path: '/see', name:"see",component: () => import('@/pages/job_log/see')},
    { path: '/itemSend', name:"ItemSend",component: () => import('@/pages/item_bank/ItemSend')},
    { path: '/preview', name:"Preview",component: () => import('@/pages/daily_homework/Preview')},


  ]
})
