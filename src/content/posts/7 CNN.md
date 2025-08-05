---
title: 7 CNN
description: 
pubDate: 2025-07-01
updatedDate: 2025-07-01
heroImage: /blog-placeholder.jpg
tags:
  - CV
  - Course
  - CNN
---
### Critique of MLP

**Problem: MLP always reshape the whole pictures into a vector, so it does not respect the spatial structure of images**
Therefore, CNN is proposed to process spatial features

### Convolutional Layer

We first define an image as $l* h$ pixels, where each pixel means a color vector

![Convolution layer](../../assets/images/Pasted%20image%2020250701133146.png)

For each filter, we calculate a dot product between the pixel's color vector with the corresponding one in the filter, producing $5*5$ 