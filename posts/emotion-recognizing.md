---
title: Real-time emotions recognizing
date: 2021-09-20
author: Tan Ngoc Pham
gravatar: 6c1ae5231dcadf6b4297a6ddf6315478?s=80
linkedin: 'ngctnnnn'
---

Introduce a deep learning approach to the problem of recognizing emotions in real time. 

---
Detailed implementation here: [ngctnnnn/RealTime-Emotion-Recognizer](https://github.com/ngctnnnn/RealTime-Emotion-Recognizer)

#### Table of contents
1. [Introduction](#1-introduction)
2. [Dataset](#2-dataset)
3. [Proposed architecture](#3-proposed-architecture)

#### 1. Introduction
There is a large number of neural networks nowadays to help us in almost every aspect of our life. In addition, we realize that different problems often require different types of networks. In this problem, I choose to use VGGFace network, or it is also called as Deep Face architecture.  

VGGFace architecture was first introduced to solve the problem of recognizing humans' face (i think it is called as Deep Face at first due to that reason, in my opinion).

<div align='center'>

<iframe width="560" height="315" src="https://www.youtube.com/embed/IQ9qnqSi3gc" frameborder="0" allow="accelerometer; autoplay; encrypted-media gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

With that reason in mind, i think that VGGFace would perform well on other problems relevant to our faces as in the problem of emotion recognizing.

#### 2. Dataset
The data using in this research is taken from [Kaggle's FER-2013](https://www.kaggle.com/msambare/fer2013). 
> The data consists of 48x48 pixel grayscale images of faces. The faces have been automatically registered so that the face is more or less centred and occupies about the same amount of space in each image. The task is to categorize each face based on the emotion shown in the facial expression into one of seven categories (0=Angry, 1=Disgust, 2=Fear, 3=Happy, 4=Sad, 5=Surprise, 6=Neutral). The training set consists of 28,709 examples and the public test set consists of 3,589 examples.

However, in order to get a sufficient data for my model training, as well as avoiding inbalance between data classes, i just take out 3 most important emotions which are happy, sad and neutral. I also get rid of the testing phase due to the limitation in data. The training set is splitted into 2 smaller sets, which are training set (80%) and validation set (20%).

#### 3. Proposed architecture
The originally proposed VGGFace architecture was shown as:
<p align="center">
  <img src="https://i1.wp.com/sefiks.com/wp-content/uploads/2019/04/vgg-face-architecture.jpg?ssl=1" alt="vggface-architecture">
  <div algin ='center'>
  <figcaption><b>Fig 1.</b> Visualization of VGGFace architecture</figcaption>
  </div>
</p>

However, i did some minor change in the original architecture to give out a better performance to my own problem. In details, there is an extra layer after the second one and an extra dense layer in the fully connected one. Additionally, i also reduce learning rate with a factor of 0.5 once 7 continuous epochs do not improve their performance; and an early stopping once the performance does not improve in 7 consecutive epochs.   

The detailed model is shown here: [VGGFace](https://github.com/GDSC2021/RealTime-Emotion-Recognizer/blob/main/build_model/vgg_face.py).   

Here is the final result after training the model.   
<p align="center">
  <img src="../public/demo-emotion-recognizing.png" alt="demo-project">
  <div algin ='center'>
  </div>
</p>