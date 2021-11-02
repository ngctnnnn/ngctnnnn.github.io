---
title: An introduction to Genetic Algorithm 
date: 2021-09-30
author: Bui Tri Dung
gravatar:  
linkedin: 'btrdung'

--- 


# Introduction 

In this research, we will discuss about a variety of population methods that involve optimization using a collection of design points, called individuals. In a real life, when we have to find the minimum of any $f(x)$ function, we usually try to find $x_0$ value such that $f(x_0)$ has minimum value by using gradient, derivative, brute forces... 

Assume that we want to find x value such that $f(x) = 2x^2$ has a minimum value. According to the traditional method, we should find $f'(x) = 4x$ and make it equal to zero, so we can say that $x = 0$ is the best solution for f(x) which has a minimum value. 

# Preparation for building a sGA

## Initial population

However, what happends if the computer can not available in getting derivative. Now, we will discuss about a population method. A population method is started with an initial population - as descent methods require an initial desgin point. In some cases, the individuals of population should be large enough to increase probability in processing of find the best solution (the reason why will be discuss in late). 

```python
import numpy as np 

#  Ref: https://numpy.org/doc/stable/reference/random/generated/numpy.random.normal.html  

mu, sigma = 0, 10
pop = np.random.normal(mu, sigma, 50000)
```
 
We can create a population which individuals are followed normal distribution. For each individual has a fitness value of its. To have a clearly sight, we will visualise how fitness values are individuals?

<p align="center">
  <img src="./../public/individual_in_fx_simple_floating_number.png" alt="Algorithm about GA"/>
</p> 

Since we created population by normal distribution, we can see that almost individuals will stand near to 0. In next step, our goal is how we can get a next generation which has better than the current generation. 

In a real nature, every animals or humans have their own genetic code. Starting with this point, we can propose for each individual has their own genetic code, represented in 32-bit binary. The first $a$ bits for interger part and the remaining $b$ bits for fractional part. Because it is not easy when represent in floating number, so we will assume that we are solving in integer number. The visialise should be become to: 

<p align="center">
  <img src="./../public/individual_in_fx_simple_integer_numer.png" alt="Algorithm about GA"/>
</p> 

Now, we just consider about fractional part but we still keep the representation of genetic code of individual in 32-bit binary. Example: 


| Individual | Binary representation (32-bit)| 
| -- | -- | 
| 32 | 0000 0000 0000 0000 0000 0000 0010 0000 |
| 25 | 0000 0000 0000 0000 0000 0000 0001 1001 |
| 195 | 0000 0000 0000 0000 0000 0000 1100 0011 |
| 159325 | 0000 0000 0000 0110 0110 1110 0101 1101 |

## Rank and selection
As we mentioned above, our goal to get next generation is better than current generation by pass on their gens to the next generation. But the first thing we need to do is the population should be filted by removing a half lowest fitness of the number of individuals in population. Then, the next generation has more probability to create a new generation increasing fitness than current generation. Example:

| Individual | Binary representation (32-bit)| Status |
| -- | -- | -- |
| 32 | 0000 0000 0000 0000 0000 0000 0010 0000 | Removed |
| 25 | 0000 0000 0000 0000 0000 0000 0001 1001 | Removed |
| 195 | 0000 0000 0000 0000 0000 0000 1100 0011 | Kept |
| 159325 | 0000 0000 0000 0110 0110 1110 0101 1101 | Kept |

## Crossover 


After filtering the population, we will go to a crossover step. 

<p align="center">
  <img src="./../public/EAPROCESS.svg" alt="Algorithm about GA"/>
</p> 



At each generation, the chromosomes of the fitter individuals are passed on to the next generation after undergoing the genetic operations of crossover and mutation.