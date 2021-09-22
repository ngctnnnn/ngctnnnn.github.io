---
title: Detect COVID-19 with Deep Learning
date: 2021-08-30
author: Tan Ngoc Pham
gravatar: 6c1ae5231dcadf6b4297a6ddf6315478?s=80
linkedin: 'ngctnnnn'
---
Propose a rapidly testing method which has a high productivity in a short time, which is to use Deep Convolutional Neural Network to detect COVID-19 on Chest X-ray (CXR) images to cope with the present pandemic.    

---
### Table of contents
1. [Scientific base](#1-scientific-base)
2. [A deep learning based approach to the problem](#2-a-deep-learning-based-approach-to-the-problem)
3. [Experimental results and evaluation](#3-experimental-results-and-evaluation)

---
#### 1. Scientific base
The most crucial thing that make CXR images from pneumonia or COVID-19 patients different from normal ones is the appearance of white spots, whether they are a lot of or a few, on particular positions along patients' lungs. Those white spots are recognized as the term of ***ground glass opacity*** or GGO in medical science. Ground glass opacity is the incompletely consolidated injury in patients' lungs. It has a higher density in comparison with surrounded parenchyma while still enables us to observe underlying structures, e.g. blood vessels or bronchial membranes.    

<p align="center">
  <img src="/covid+pneumonia+normal.png" alt="ground-glass-pattern image">
  <div algin ='center'>
    <figcaption><b>Fig 1.</b> Representative CXR images for 3 cases</figcaption>
    <figcaption>COVID-19 (A), Pneumonia (B) and non-respiratory disease (C)</figcaption>
  </div>
</p>

A specified doctor in the field of diagnostic imaging could tell that those GGO is the reason for those white spots in the chest radiograph. And a professional radiologist could use these features to differentiate COVID19 with pneumonia patients. Thus, we are capable of using a deep learning network to extract these features, then categorize to give out the appropriate diagnostic results for every cases. 

#### 2. A deep learning based approach to the problem
Throughout the research, we harness the use of 2 different approaches which are <b>ResNet50</b> and <b>VGG19</b> to solve this problem. In addtion, we use [COVIDx dataset](https://github.com/lindawangg/COVID-Net/blob/master/docs/COVIDx.md) - which is a widely used dataset in recent research about COVID-19 nowadays.     

VGG19 is a deep neural network architecture under-using residual design principals, it is also a compact architecture which has a low diversity of architectures. On the other hand, ResNet50 is a deep neural network harnessing residual design principles and it has a moderate diversity of architectures. This network brings many a high productivity in a large number of researching in classifying X-ray images.

#### 2.1 COVIDx Dataset
COVIDx Datset is a dataset synthesized from 5 different sources. Additionally, this dataset also provides an image extension transfer tool: from `.mri` into `.jpg`. And the author moreover provide a code to support data pre-processing and getting rid of unnecessary part for synthesized data.    

The dataset consists of more than 20.000 CXR images from different patients and divided into 2 sets which are training set and testing set. They are also separated into 3 classes which are pneumonia (train: 5963, test: 105), COVID-19 (train: 4649, test: 274) and the healthy (train: 8751, test: 100).    

Our model will get an input of one CXR image and will give out an output as the probability of that image falling into each class which is pneumonia, COVID-19 and healthy, respectively.     

#### 2.2 Detailed implementation
Both deep learning neural network we proposed which are VGG19 and ResNet50 are all pre-trained on [ImageNet](https://www.image-net.org/). Afterwards, we proceed training process on COVIDx dataset with Adam as the optimization algorithm and the learning rate's strategy as reducing if the loss on validation set does not improve at all in a long period (patience).

Detailed implementation: [ngctnnnn/Detect-COVID19](https://github.com/ngctnnnn/Detect-COVID19).     

After implementation, here is my demo for this project:

<div align='center'>

<iframe width="560" height="315" src="/demo-covid19.mp4" frameborder="0" allow="accelerometer; autoplay; encrypted-media gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


#### 3. Experimental results and evaluation

| Disease | Precision | Recall | F1-score | Support |
|:--:|:--:|:--:|:--:|:--:|
| COVID-19 | 0.99 | 0.82 | 0.90 | 274  |
| Non-respiratory disease | 0.7 | 0.96 | 0.81 | 100 |
| Pneumonia | 0.8 | 0.86 | 0.83 | 105 |

<div align='center'><b>Table 1. </b>Results on VGG19</div>
		
| Disease | Precision | Recall | F1-score | Support |
|:--:|:--:|:--:|:--:|:--:|
| COVID-19 | 0.97 | 0.67 | 0.79 | 274 |
| Non-respiratory disease | 0.56 | 0.96 | 0.71 | 100 |
| Pneumonia | 0.74 | 0.85 | 0.79 | 105 |

<div align='center'><b>Table 2. </b>Results on ResNet50 (14 epochs)</div>

	
| Disease | Precision | Recall | F1-score | Support |
|:--:|:--:|:--:|:--:|:--:|
| COVID-19 |0.96 | 0.80 | 0.88 | 274 |
| Non-respiratory disease | 0.73 | 0.86 | 0.79 | 100|
| Pneumonia | 0.71 | 0.90 | 0.79 | 105 |
	
<div align='center'><b>Table 3. </b>Results on ResNet50 (50 epochs)</div>

| Architecture | Non-respiratory disease | Pneumonia | COVID-19 |
|:---:|:---:|:--:|:--:|
| VGG19 | 96\% | 86\% | 82\% |
| ResNet50 (14 epochs) |  96\% | 85\% | 67\% |
| ResNet50 (50 epochs) | 86\% | 90\% | 80\% |

<div align='center'><b>Table 4. </b>Comparison among models based on sensitivity</div>
	
	
| Architecture | Non-respiratory disease | Pneumonia | COVID-19 |
|:---:|:---:|:--:|:--:|
| VGG19 |70\% | 80\%| 99\% |
| ResNet50 (14 epochs) |  56\% | 74\% | 97\% |
| ResNet50 (50 epochs) | 73\% | 71\% | 96\% |

<div align='center'><b>Table 5. </b>Comparison among models based on PPV</div>

| Architecture | Number of parameters (M) | Accuracy | Resolution |
|:---:|:---:|:--:|:--:|
| VGG19 | 29.76 trainable + 20.25 non-trainable | 86% | 480 x 480 |
| ResNet50 (14 epochs) | 25.93 trainable + 23.77 non-trainable | 77% |224 x 224 |
| ResNet50 (50 epochs) | 25.93 trainable + 23.77 non-trainable | 84% | 224 x 224 |

<div align='center'><b>Table 6. </b>Comparison between precision and number of parameters among models</div>