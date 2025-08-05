---
title: "Transformers and LLMs"
description: "Hands-on LLMs chapter 1-2"
pubDate: 2025-07-01
updatedDate: 2025-07-01
category: "Deep Learning"
tags: ["Transformer", "llms", "attention"]
---
Resource: [李沐对transformer的讲解](https://www.youtube.com/watch?v=nzqlFIcCSWQ&list=PLFXJ6jwg0qW-7UM8iUTj3qKqdhbQULP5I&index=43)

### 题外话

LLMs 的开山之作，题目非常经典，同时也提出了与MLP， CNN, RNN并列的第四大基础模型 transformer

由于视频为中文，本文用中文讲解
这篇文章尽力降低门槛了，因此：

<h1> Attention is all you need! </h1>


>[!TIP] 李沐的 “三遍读论文” 办法
>第一遍粗读：读标题、摘要、结论，明白 WTD，然后看实验或者方法
>**在这个地方海选，评判要不要精读**
>第二遍精读：从头到尾，**主要理解图表！理解 pipeline + 实验的细节**
>可以筛相关文献（文章太难了就看之前工作）
>第三遍研读（需要完全搞懂）：要知道每一句话，每一段的意思
>**这一遍要对比阅读，把自己当成作者，想想自己有什么办法能比作者做得更好**


接下来正式 dive into transformers

---

## SPT & CPT —— Introduction

主流模型：language models + encoder——decoder architectures

#### RNN 的缺陷

RNN的机制： **一个词一个词读**， 第 t 个词的隐藏状态 $h_t$ 依赖于 $h_{t-1}$ 和当前的第 t 个词
问题： **从左向右读，不能并行，且前面的信息在后面很容易被丢掉**

#### Attention 的应用

之前：主要用在 encoder——decoder 的传输 （RNN 的使用）






