---
title: Leukocyte classification to predict diseases (Part 2)
date: 2021-09-23
author: Dzung Tri Bui 
gravatar: 9d7fdd037b40f9d989d82eac5c97dd33?s=80 
linkedin: 'BTrDung'

---
Data analysis on number of blood cells, which are white blood cells and red blood cells, per a certain blood volume could help us observe our medical situation. In this blog, we introduce a faster method to recognize disease via the number of leukocytes.

---
#### Table of contents
- [Part 1](https://ngctnnnn.github.io/posts/computer-vision-for-leukocyte-prediction.html)
    - 1. [Introduction](#1-introduction)
    - 2. [Dataset and data preprocessing](#2-dataset-and-data-preprocessing)
    - 3. [Foreground and background segmentation technique](#3-foreground-and-background-segmentation-technique)            
- [Part 2](https://ngctnnnn.github.io/posts/computer-vision-for-leukocyte-prediction-2.html)
    - 4. [Edge detection with Canny method](#4-edge-detection-with-Canny-method)
    - 5. [Hough transformation to identify blood cells borderlines](#5-hough)
    - 6. [References](#6-references)
---

#### 4. Edge detection using Canny method

This method uses both high and low as 2 separated thresholds. The high one would be used firstly to find the starting point of the edge. After that, we determine the path direction of the border based on consecutive pixels having a greater value in comparison of the low. Points with the values less than the low threshold are removed only. Tiny borders will be selected if they are associated with large (easy to see) borders. The Canny procedure is demonstrated as follows:

- **Step 1**: Use a Gaussian filter to smoothen the image. This step is meant to reduce the gradient of pixels while moving from one pixel to another and make the image smoother than the original.

- **Step 2**: Calculate the gradient of the contour of the smoothed image. Computing the gradient is mainly to construct a function to redefine the slope as well as the increasing and decreasing trend of a certain pixel.

- **Step 3**: Remove the non-maxima points. As a side note, we will choose the pixels that are most likely to be considered the highest edge by relying on the gradient calculation in step 2. When a pixel has not reached its peak, we won't evaluate that pixel as an edge.

- **Step 4**: The final step is to remove the values that are less than the threshold level. Should you observe an image carefully, there are many values after calculating the gradient that will be selected as the maximum value. However, the maximum value here is only local maximum and only a few points are considered as global maximum. Therefore, we will remove some regions in which the local maximum value is lower than the allowable threshold (the threshold value will depend on the type of model to choose more appropriate).

This method is considered as more superior to other methods because it is less affected by noises and it is also able to detect weak edges. On the other hand, if the threshold is chosen too low, the boundary will be incorrect, or if the threshold is chosen too high, much of the important information about the boundary will be discarded. Based on the predefined threshold level, it will decide which points belong to the true boundary or not to the boundary. The lower the threshold level, the more edges are detected (but also noise and false edges appear). Conversely, if the threshold level is set higher, the fuzzy borders may be lost, or the borders will be broken.

#### 5. Hough transformation to identify blood cells borderlines    

Hough transformation is one of the most basic methods for feature extraction in image processing, and especially one of its capabilities is to find and detect circles in images (even imperfect circles).

This method mainly relies on the parameter accumulator after being added up (called “voting”) to get the maximum values. We will identify objects that are supposed to be circular in image with the following formula:

<!-- TODO: INSERT formula -->
<p align="center">
<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{150}&space;r^2&space;=&space;(x&space;-&space;a)^2&space;&plus;&space;(y&space;-&space;b)^2" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{150}&space;r^2&space;=&space;(x&space;-&space;a)^2&space;&plus;&space;(y&space;-&space;b)^2" title="r^2 = (x - a)^2 + (y - b)^2" /></a>
</p>

s.t. **r** is radius of circle, `(a, b)` is the circle's center.       

The **x**, **y** values only move in the range `|r - a| ≤ x ≤ |r + a|` and |`r - b| ≤ y ≤ |r + b|` so that the above formula is satisfied. The implementation of the algorithm to 'voting' the positions will be like the setting in determining the circle as above. Here we perform 'voting' on a 3D matrix with parameters **r**, **a**, **b**.

<div align='center' id='banner' style='display: flex; justify-content: space-between'>
  <div>
    <p align="center">
      <img width=80% src="/CircleHoughTransform1.png" alt="Simulate two circles with difference sizes">
      <div align ='center'>
        <figcaption>
        <b>Fig 5.</b>  
        Simulate two circles 
        </figcaption> 
        <figcaption>with difference sizes</figcaption>
      </div>
    </p>
  </div>
  <div>
    <p align="center">
      <img width=80% src="/CircleHoughTransform2.png" alt="Cumulative table of 2 parameters x, y with fixed r">
      <div align ='center'>
        <figcaption>
        <b>Fig 6.</b> Cumulative table of 2 parameters x, y
        </figcaption> 
        <figcaption> with fixed r</figcaption>
      </div>
    </p>
  </div>
</div>
<div align='center'>
<b>Fig 5,6.</b> Simulating the process of determining a circle using the Hough transform
</div>



For ease of visualization, we draw two small circles. Our task is to help the computer determine the center of two circles. Pay attention to the circle highlighted in blue and you will see that they have a smaller radius than the radius of the green circle. We have estimated the radius distance of the blue circle to be `r = 20 pixels`.     

So, for each pixel that is said to be the edge (with the image on the edge being colored both blue or green), then proceed to draw a new circle with the center at the position in the cell under consideration - call `x = position_row position` and `y = column_position`.    

After obtaining the three values of **x**, **y** and **r**, the two values **a** and **b** can be deduced easily as follows:

```python
PI = 3.14159265358979323846264338327950
for t in range(361): 
    b = y - r * np.sin(t*PI/180) 
    a = x - y * np.cos(t*PI/180) 
    vote[a, b] += 1 
```
As above, we will select the threshold value and take the positions vote`[a, b] > threshold`. The higher the threshold value is, the more likely it is to be a perfect circle. However, when the threshold value is too low, we are not sure that it is a circle (maybe even a small curve). In practice, it is virtually impossible to determine the radius in a fixed way, even if it is a human or a program with the best perception. So, when we practice in practice, we choose **r** in some interval `[m, n]`.
This means that the voting array will increase from **2D** to **3D** as `[a, b, r]`.

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