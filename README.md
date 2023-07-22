# react+zustand

在react项目中使用zustand

> zustand是一个精简、快速、可扩展的状态管理器，特别契合react hook下开发。


1. initialState、createStore、自定义hooks式组织方式

```
./store
├─createStore.ts ----- // 负责创建 Store 的方法与 Action 方法
├─index.ts ----------- // 导出所有类型、状态与hooks
├─initialState.ts ---- // 负责 State —— 添加状态类型与初始化状态值
└─useState.ts -------- // 自定义state hooks，方便复用与筛选查询

```

2. 切片组织方式

```
./store
├─cat.ts 
├─createStore.ts 
├─dog.ts 
├─index.ts 
├─token.ts 
├─useState.ts 
└─user.ts 
```

参考：https://juejin.cn/post/7203262276572823609