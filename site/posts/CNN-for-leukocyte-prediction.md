---
title: Leukocyte classification to predict diseases
date: 2021-09-22
author: Dzung Tri Bui, Tan Ngoc Pham
gravatar: 9d7fdd037b40f9d989d82eac5c97dd33?s=80 
linkedin: 'BTrDung'

---
Data analysis on number of blood cells, which are white blood cells and red blood cells in details, per a certain blood volume could help us observe our medical situation. In this blog, we introduce a faster method to recognize disease via the number of leukocytes.

---
#### Table of contents

---
#### 1. Introduction

While blood cells (WBC), also known as *leukocytes*, are produced in the bone marrow and composed of nuclei and cytoplasm. WBCs are divided into five groups: basophil, eosinophil, lymphocyte, monocyte and neutrophil. Leukocytes protects the body against infectious disease and foreign substance, constitute an important part of the immune system. 4.1e9 to 11.1e9 units in one liter of a healthy adult human is the normal number of WBCs in a blood is 4,500 to 11,000 WBCs per microliter and a drop in a blood is 7,000 to 25,000.     

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

Before diving in details, let make an overview about the image mentioned below.    

<p align="center">
  <img src="https://webpath.med.utah.edu/jpeg5/HEME005.jpg" alt="basophil">
  <div algin ='center'>
    <figcaption>
    <b>Fig 2.</b> 
    The basophil in the centre has a multi-lobed nucleus</figcaption> 
    <figcaption>
    and numerous coarse, dark blue granules in the cytoplasm.
    </figcaption>
  </div>
</p>

<!-- After being preprocessed with a specialized technique, we could realizing that there are two important information of which the WBCs often have darker color and generally larger than the RBCs. The goal of fore- and background segmenting is to get two sub-images containing information about WBC and RBC. And we can do that by considering the first different factor about the WBCs and the RBCs color.  -->
<!-- 
A basic technique learning computer vision is threshold method.  -->

#### 4. Edge detection using Canny method



#### 5. Hough transform to identify blood cells borderlines    



#### 6. References
[1] L. Chandrasekar and G. Durga. Implementation of hough transform for image processing applications. In 2014 International Conference on Communication and Signal Processing, pages 843–847, 2014. *doi: 10.1109/ICCSP.2014.6949962*.    

[2] J. Illingworth and J. Kittler. The adaptive hough transform. IEEE Transactions on Pattern Analysis and Machine Intelligence, PAMI-9(5):690–698, 1987. *doi: 10.1109/TPAMI.1987.4767964*.      

[3] H. Kang, D.-Y. Kang, J.-S. Park, and S. W. Ha. Vgg19-based classification of amyloid pet image in patients with mci and ad. In 2018 International Conference on Computational Science and Computational Intelligence (CSCI), pages 1442–1443, 2018. *doi: 10.1109/CSCI46756.2018.00281*.     

[4] T. Kaur and T. K. Gandhi. Automated brain image classification based on vgg-16 and transfer learning. In 2019 International Conference on Information Technology (ICIT), pages 94–98, 2019. *doi: 10.1109/ICIT48102.2019.00023*.    

[5] S. Liu and W. Deng. Very deep convolutional neural network based image classification using small training sample size. In 2015 3rd IAPR Asian Conference on Pattern Recognition (ACPR), pages 730–734, 2015. *doi: 10.1109/ACPR.2015.7486599*.      

[6] Raghu, N. Sriraam, Y. Temel, S. V. Rao, and P. L. Kubben. A convolutional neural network based framework for classification of seizure types. In 2019 41st Annual International Conference of the IEEE Engineering in Medicine and Biology Society (EMBC), pages 2547–2550, 2019. *doi: 10.1109/EMBC.2019.8857359*.      

[7] M. Raman and H. Aggarwal. Study and comparison of various image edge detection techniques. *International Journal of Image Processing, 3, 03 2009*.    

[8] M. Shaha and M. Pawar. Transfer learning for image classification. In 2018 Second International Conference on Electronics, Communication and Aerospace Technology (ICECA), pages 656–660, 2018. *doi: 10.1109/ICECA.2018.8474802*.      

[9] S. Singh and R. Singh. Comparison of various edge detection techniques. In 2015 2nd International Conference on Computing for Sustainable Global Development (INDIACom), pages 393–396, 2015.      

[10] L. Wen, X. Li, X. Li, and L. Gao. A new transfer learning based on vgg-19 network for fault diagnosis. In 2019 IEEE 23rd International Conference on Computer Supported Cooperative Work in Design (CSCWD), pages 205–209, 2019. *doi: 10.1109/CSCWD.2019.8791884*.     

[11] H. Ye, G. Shang, L. Wang, and M. Zheng. A new method based on hough transform for quick line and circle detection. In 2015 8th International Conference on Biomedical Engineering and Informatics (BMEI), pages 52–56, 2015. *doi: 10.1109/BMEI.2015.7401472*.         

[12] R. M. Yousaf, H. A. Habib, H. Dawood, and S. Shafiq. A comparative study of various edge detection methods. In 2018 14th International Conference on Computational Intelligence and Security (CIS), pages 96–99, 2018. *doi: 10.1109/CIS2018.2018.00029*.      

[13] Rezatofighi, S.H., Soltanian-Zadeh, H.: Automatic recognition of  five types of white blood cells in peripheral blood. Computerized Medical Imaging and Graphics 35(4) (2011) 333--343.    