---
title: 12 RNN
description: 
pubDate: 2025-07-01
updatedDate: 2025-07-01
heroImage: 
tags:
  - Umich
  - llms
  - RNN
---
### Critique of CNN

**CNN only generates one answer according to one input, it cannot resolve one-to-many and many-to-one sequence-related problems**

**Problems to be solved:**
1. Sequence input, one output (videos)
2. One input (CNN), sequence output (photo to text)
3. Sequence input, sequence output (translation)
4. Sequence input, sequence output about the original sequence ( per-frame video classification )

>[!TIP] RNNs for non-sequential tasks
>Actually, RNNs can perform sequential processing on non-sequential data
>RNNs take multiple glimpses at the image, and the position RNN is focused on depends on the information extracted from previous glimpses
>When generating images, **RNNs can output a series of color painting over time**, building up the entire image

### RNNs

**The whole pipeline of NLP with Encoder——Decoder Models**

```Mermaid
flowchart LD
	A[Input Text] -->|Tokenizer} B(Input Number Sequence)
	B -->|Encoder by RNNs| C(Input Vector Sequence)
	C --> |Decoder by RNNs| D(Output Vector Sequence)
	D -->|
```



![](../../assets/images/Pasted%20image%2020250702165515.png)

