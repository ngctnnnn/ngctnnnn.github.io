---
title: Leukocyte classification to predict diseases (Part 1)
date: 2021-09-22
author: Tan Ngoc Pham
gravatar: 6c1ae5231dcadf6b4297a6ddf6315478?s=80
linkedin: 'ngctnnnn'

---
Data analysis on number of blood cells, which are white blood cells and red blood cells, per a certain blood volume could help us observe our medical situation. In this blog, we introduce a faster method to recognize disease via the number of leukocytes.

---

Since this blog is rather long, we divide it into 2 parts, the first one is to introduce our approach to the problem, our dataset and our approach to preprocess data, then the second one is to discuss further about how to identify our needed cells in the preprocessed data through Canny object detection and Hough transformation.

#### Table of contents
- [Part 1](https://ngctnnnn.github.io/posts/computer-vision-for-leukocyte-prediction.html)
    - 1. [Introduction](#:~:text=1.%20Introduction)
    - 2. [Dataset and data preprocessing](#:~:text=2.%20Dataset%20and%20data%20preprocessing)
    - 3. [Foreground and background segmentation technique](#:~:text=3.%20Foreground%20and%20background%20segmentation%20technique)            
- [Part 2](https://ngctnnnn.github.io/posts/computer-vision-for-leukocyte-prediction-2.html)
    - 4. [Edge detection with Canny method](https://ngctnnnn.github.io/posts/computer-vision-for-leukocyte-prediction-2.html#:~:text=4.%20Edge%20detection%20with%20Canny%20method)
    - 5. [Hough transformation to identify blood cells borderlines](https://ngctnnnn.github.io/posts/computer-vision-for-leukocyte-prediction-2.html#:~:text=5.%20Hough%20transformation%20to%20identify%20blood%20cells%20borderlines)
    - 6. [References](https://ngctnnnn.github.io/posts/computer-vision-for-leukocyte-prediction-2.html#:~:text=6.%20References)

---
#### 1. Introduction

While blood cells (WBC), also known as *leukocytes*, are produced in the bone marrow and composed of nuclei and cytoplasm. WBCs are divided into five groups: basophil, eosinophil, lymphocyte, monocyte and neutrophil. Leukocytes protects the body against infectious disease and foreign substance, constitute an important part of the immune system. A healthy adult human consists of 4.1e9 to 11.1e9 of WBCs per a blood liter (or 4,500 to 11,000 WBCs per a blood microliter) and a drop in a blood consists of 7,000 to 25,000 WBCs. Any statistical number that outranges taken from an adult is considered as a disease.      

<div align='center'>

| <p align='center'> Name</p> | <p align='center'> Description </p> | 
|------|-------------| 
| <p align='center'> Neutrophils </p>  | <p align='center'> Contact the microbial invasion, phagocytize and destroy invading organism </p> |
| <p align='center'> Eosinophils </p> | <p align='center'> Part of defense mechanism </p><p align='center'>against parasitic infections, inflammatory processes and allergic tissue reactions </p>|
| <p align='center'> Basophils </p>   | <p align='center'> Play role in allergic and immediate hypersensitivity reactions </p>| 
| <p align='center'> Monocytes </p>     |<p align='center'> Involve in defensive reactions to some microorganisms, remove damaged cells, cell debris</p><p align='center'> and armour bactericidal action as immune reaction </p> | 
| <p align='center'> Lymphocytes </p>  | <p align='center'> Produce antibodies and join in immune reactions </p>| 

<b>Table 1. </b>Names and brief demonstration of normal leukocytes.

</div>



#### 2. Dataset and data preprocessing
The [LISC - *Leukocyte Images for Segmentation and Classification*](http://users.cecs.anu.edu.au/~hrezatofighi/Data/Leukocyte%20Data.htm) is used for automatic identification and blood cells counting since it is relatively easy to use.       

> Samples were taken from peripheral blood of 8 normal subjects and 400 samples were obtained from 100 microscope slides. The microscope slides were smeared and stained by Gismo-Right technique and images were acquired by a light microscope (Microscope-Axioskope 40) from the stained peripheral blood using an achromatic lens with a magnification of 100. Then, these images were recorded by a digital camera and were saved in the BMP format. The images contain 720×576 pixels.    

> All of them are color images. The images were classified by a hematologist into normal leukocytes: basophil, eosinophil, lymphocyte, monocyte, and neutrophil. Also, the areas related to the nucleus and cytoplasm were manually segmented by an expert.

You can download dataset here: [LISC database](http://users.cecs.anu.edu.au/~hrezatofighi/Data/Leukocyte%20Data.htm).     

After that, images are transformed into gray scale using Python's [opencv](https://pypi.org/project/opencv-python/) library: 

```python
import cv2
gray_img = cv2.cvtColor(original_img, cv2.COLOR_BGR2GRAY)
```
And after using opencv, we can change a normal leukocyte into a grayscale leukocyte.

<div align='center' id='banner' style='display: flex; justify-content: space-between'>
<div>
<img width=70% src="https://github.com/BTrDung/Complex/raw/master/CreProjCBC/4.bmp" alt='leukocyte-before'>
</div>
<div>
<img width=40% src='/grayscale-leukocyte.png' alt='leukocyte-after'>
</div>
</div>

<div align='center'>
<b>Fig 1.</b> Image of a normal leukocyte before and after using opencv 
</div>

#### 3. Foreground and background segmentation technique

At the very first glance to the solution, we have to notice how to differentiate between foreground and background.    

We could define foreground as an object that we want to observe detailedly. For a thorough understanding, a foregrounding object is the object we would like to separate from the whole picture for later purposes, e.g. object detecting or motion predicting. In this topic area, leukocytes and erythrocytes are defined as the foreground and moreover, we will not use background. Hence, at the end this section, we would guide you thoroughly to extract the foreground from the a whole picture.     

Let make an overview about the image mentioned below:  

<p align="center">
  <img src="https://webpath.med.utah.edu/jpeg5/HEME005.jpg" alt="basophil">
  <div align ='center'>
    <figcaption>
    <b>Fig 2.</b> Example of one blood cell photo from dataset 
    </figcaption> 
  </div>
</p>

Scientific evidence has it that dark purple areas are leukocytes and light purple areas are erythrocytes. We would divide the whole picture into 2 different ones: the first one only consists of leukocytes' positions and the other consists of those from erythrocytes; and both of them would remain the original scale. The reason behind doing splitting thing is to make processing and classifying procedure more easily.    

One of the most basic approach for this method is to use thresholding technique. The threshold formula could be expressed as below:

<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{150}&space;f(x,y)&space;=&space;\left\{\begin{matrix}&space;255&space;&f(x,y)&space;>&space;thres&space;\\&space;0&space;&f(x,y)\leq&space;thres&space;\end{matrix}\right." target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{150}&space;f(x,y)&space;=&space;\left\{\begin{matrix}&space;255&space;&f(x,y)&space;>&space;\theta&space;\\&space;0&space;&f(x,y)\leq&space;\theta&space;\end{matrix}\right." title="f(x,y) = \left\{\begin{matrix} 255 &f(x,y) > \theta \\ 0 &f(x,y)\leq thres \end{matrix}\right." /></a>
s.t. ***θ*** is defined as our threshold

Since our image has been already transformed from RGB to gray-scale, all pixels are now in the threshold of from 0 to 255. We could get rid of background part by using [*histogram*](https://www.investopedia.com/terms/h/histogram.asp), which is the graph for representation of the distribution of colors in an image, to analyse and choose an appropriate threshold afterwards (i recommend you could take the chosen threshold from the number with the highest wave frequency).    

<p align="center">
  <img width=80% src="/histogram.png" alt="histogram">
  <div align ='center'>
    <figcaption>
    <b>Fig 3.</b> Histogram of Figure 1 (threshold = 255).
    </figcaption> 
  </div>
</p>

After that, the area with pixels valuing in `f(x,y) > threshold` are categorized as the foreground and vice versa is the background to identify the erythrocytes. In addition, we also apply another formula to extract leukocytes from the total image, which is:      

<a href="https://www.codecogs.com/eqnedit.php?latex=\inline&space;\dpi{150}&space;f(x,&space;y)=\left\{\begin{matrix}&space;255&space;&threshold_{min}&space;\leq&space;f(x,y)&space;\leq&space;threshold_{max}\\&space;0&space;&f(x,&space;y)&space;\notin&space;\[threshold_{min},threshold_{max}\]&space;\end{matrix}\right." target="_blank"><img src="https://latex.codecogs.com/gif.latex?\inline&space;\dpi{150}&space;f(x,&space;y)=\left\{\begin{matrix}&space;255&space;&\theta_{min}&space;\leq&space;f(x,y)&space;\leq&space;\theta_{max}\\&space;0&space;&f(x,&space;y)&space;\notin&space;\[\theta_{min},\theta_{max}\]&space;\end{matrix}\right." title="f(x, y)=\left\{\begin{matrix} 255 &threshold_{min} \leq f(x,y) \leq threshold_{max}\\ 0 &f(x, y) \notin \[threshold_{min},threshold_{max}\] \end{matrix}\right." /></a>

After using our proposed method, we would achieve the result as followed:
<div align='center'>
<img width=50% src="/grayscale-leukocyte.png" alt="grayscale leukocyte">
<figcaption><b>Fig 4.</b> A grayscale cellular image to be processed</figcaption>
</div>

<div align='center' id='banner' style='display: flex; justify-content: space-between'>
  <div>
    <p align="center">
      <img width=80% src="/WBCs.png" alt="White blood cells image after using threshold">
      <div align ='center'>
        <figcaption>
        <b>Fig 5.</b> Leukocytes after categorized as foreground
        </figcaption> 
      </div>
    </p>
  </div>
  <div>
    <p align="center">
      <img width=80% src="/RBC.png" alt="Red blood cells image after using threshold">
      <div align ='center'>
        <figcaption>
        <b>Fig 6.</b> Erythrocytes after categorized as foreground
        </figcaption> 
      </div>
    </p>
  </div>
</div>

Our next blog would discuss further about how to detect and count blood cells in preprocessed images.