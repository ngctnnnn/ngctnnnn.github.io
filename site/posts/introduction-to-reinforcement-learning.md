---

title: An introduction to Reinforcement Learning
date: 2022-02-13
author: Tan Ngoc Pham
gravatar: 6c1ae5231dcadf6b4297a6ddf6315478?s=80
linkedin: 'ngctnnnn'
--- 
Besides traditional data-based methods on Machine Learning, e.g. Clustering or Maximum Likelihood Estimation, Reinforcement Learning is a family in which tiny (or even no) data is required to do the training and testing phase. In this post, I would give a minor introduction on Reinforcement Learning, its basic concepts and methods.

---
## Table of contents
- 1. [Introduction](#:~:text=1.%20What%20is%20Reinforcement%20Learning)
- 2. [Principal (mathematical) concepts of Reinforcement Learning](#:~:text=2.%20Principal%20(mathematical)%20concepts%20of%20Reinforcement%20Learning) 
  - a. [Transition & Reward](#:~:text=a.%20Transition%20and%20Reward)
  - b. [Stochastic & Deterministic Policy](#:~:text=b.%20Policy)
  - c. [State-Value & Action-Value Function](#:~:text=c.%20State%2DValue%20and%20Action%2DValue%20Function)
- 3. [A literature on preliminary approaches in Reinforcement Learning](#:~:text=3.%20A%20literature%20on%20preliminary%20approaches%20in%Reinforcement%20Learning)
  - a. [Dynamic Programming](#:~:text=a.%20Dynamic%20Programming)
  - b. [Q-Learning](#:~:text=b.%20Q%2DLearning)
- 4. [Conclusions](#:~:text=4.%20Conclusions)
---

## 1. What is Reinforcement Learning
Let say you want to help Pac-man on the game of Pac-man achieve <ins>the best score</ins> among <ins>different rounds and difficulties</ins>. However, you do not know surely how to play the game optimally and all you can do is to <ins>give Pac-man the instructions</ins> about the game only. On learning to find the best way to play the game with a maximum score, Pac-man has to <ins>play the game continuously, continuously, and continuously</ins>. That is the most basic understanding on what Reinforcement Learning looks like. 
    <p align="center">
      <img width=50% src="https://i.pinimg.com/originals/4a/f9/7b/4af97be15a1edae3f1b61cdb0a60d30a.gif " alt="illustration">
    </p>


Mathematically, we could denote Pac-man as **an agent** and the game as **the environment**:
- One <ins>random strategy</ins> to play the Pac-man game as **a policy** (**π ∈ Π**).
- One <ins>position of Pac-man at a specific time</ins> as **a state** (**s ∈ S**).
- An <ins>event that Pac-man moves</ins> forward (or backward of left or right) as **an action** (<b>a ∈ A</b>).
- A <ins>score that Pac-man received</ins> after taking an action as **the reward** (**r ∈ R**).
    <p align="center">
      <img width=80% src="https://lilianweng.github.io/lil-log/assets/images/RL_illustration.png" alt="illustration">
      <div align ='center'>
        <b> Fig 1.</b>  An illustration on Reinforcement Learning 
      </div>
    </p>

The ultimate goal of Reinforcement Learning is to find an optimal policy <b>π<sup>*</sup></b> which gives the agent a maximum reward <b>r<sup><span>&#42;</span></sup></b> on any diverse environments. 

## 2. Principal (mathematical) concepts of Reinforcement Learning
### a. Transition and Reward
Dummies' reinforcement learning algorithms often require a model for the agent to learn and infer. A model is a descriptor in which our agent would contact with the environment and receive respective solution feedbacks. Two most contributing factors to receive accurate feedbacks on how the agent performs are **transition probability function (P)** and **reward function (R)**.

The <ins>transition probability function</ins> **P**, as it is called, records the probability of transitioning from state **s** to **s’** after taking action and get a reward **r** at time **t**.

<p align='center'>
<b>P</b>(<b>s'</b>, <b>r</b> | <b>s</b>, <b>a</b>) = <b>p</b>[<b>S</b><sub><b>t+1</b></sub> = <b>s'</b>, <b>R</b><sub><b>t+1</b></sub> = <b>r</b> | <b>S</b><sub><b>t</b></sub> = <b>s</b>, <b>A</b><sub><b>t</b></sub> = <b>a</b>]
</p>

The equation could be understood as ***"the transition probability of state s to s' to get a reward r after taking action a equals to the conditional probability (p) of getting a reward of r after changing state from s to s' and taking an action a"***. 

And the <ins>transition state function</ins> could be defined as:

<p align='center'>
<b>P<sub>ss', a</sub></b> = <b>P</b>(<b>s' </b>|<b>s</b>,<b> a</b>) = <b><span>&#8721;</span><sub>r ∈ R</sub> P</b>(<b>s'</b>, <b>r</b> | <b>s</b>, <b>a</b>) 
</p>

The reward achieved on taking a new action **a'** is demonstrated using <ins>a reward function</ins> **R** and equals to the expected reward after taking an action **a** in the state **s**.

<p align='center'>
<b>R</b>(<b>s</b>, <b>a</b>) = <b>𝔼</b>[<b>R<sub>t + 1</sub></b> | <b>S<sub>t</sub></b> = <b>s</b>, <b>A<sub>t</sub></b> = <b>a</b>] = <b><span>&#8721;</span><sub>r ∈ R</sub></b>(<b>r</b>) x <b><span>&#8721;</span><sub>s' ∈ S</sub>P</b>(<b>s', r</b> | <b>s, a</b>) 


</p>

### b. Policy
A policy **π(<span>&#183;</span>)** is a mapping from a state **s** to its corresponding action **a** according to a specific strategy to take a suitable move toward the current state of our agent. A policy could be deterministic or stochastic, as which demonstrated:
- <b><ins>Stochastic policy</ins></b>: given a random state **s**, there is only one action **a** which always get the maximum reward <b>r<sup>*</sup></b>.
<p align='center'>
<b>π</b>(<b>s</b>) = <b>a</b>
</p>
- <b><ins>Deterministic policy</ins></b>: given a random state **s**, the optimal action to get the highest reward is distributed over a probability distribution over all appropriate actions.
<p align='center'>
<b>π</b>(<b>a | s</b>) = <b>P</b><sub><b>π</b></sub>[<b>A</b> = <b>a</b> | <b>S</b> = <b>s</b>]
</p>

### c. State-Value and Action-Value Function
Value function, generally, is used as <ins>a metric to measure how good a state is and how high a reward we could achieve</ins> by staying in a state or taking an action. 

Let denote **G** as the <b>total reward</b> that our agent would take, starting from time **t**:
    <p align="center">
        <b>G<sub>t</sub></b> = <b>R<sub>t+1</sub></b> + <b>R<sub>t+2</sub></b> + ... = <b><span>&#8721;</span></b><sub><b>k</b> = <b>0 →</b><b><span>&#8734;</span></b></sub><b>(R</b><sub><b>t + k + 1</b></sub><b>)</b>
    </p>

However, in reality, <ins>a reward would be more appetizing in the present than it is in the future</ins> (imagine which decision would you make if you are allowed to choose between receiving 100 bucks now or 100 bucks in 10 more years). It is, thus, a must to propose a coefficient of **γ ∈ [0; 1]** to penalize rewards in the future times. The above equation would be rewritten as follows
    <p align="center">
        <b>G<sub>t</sub></b> = <b>γR<sub>t+1</sub></b> + <b>γ<sup>2</sup>R<sub>t+2</sub></b> + ... = <b><span>&#8721;</span></b><sub><b>k</b> ∈ [<b>0</b>;<b><span>&#8734;</span></b>)</sub><b>(γ<sup>k</sup> R</b><sub><b>t + k + 1</b></sub><b>)</b>
    </p>

#### Action-Value function
The <ins>Action-Value value</ins> (Q-value) is the expected total reward return of a **state-action pair** at a given time **t** and following policy <b>π</b>:
<p align='center'>
<b>Q<sub>π</sub></b>(<b>s</b>, <b>a</b>) = <b>𝔼<sub>π</sub></b>[<b>G<sub>t</sub></b> | <b>S<sub>t</sub></b> = <b>s</b>, <b>A<sub>t</sub></b> = <b>a</b>] 
</p>

#### State-Value function
The <ins>State-Value</ins> value of a state **s** is the expected total reward return if we are in state **s** at time **t**
<p align='center'>
<b>V<sub>π</sub></b>(<b>s</b>) = <b>𝔼<sub>π</sub></b>[<b>G<sub>t</sub></b> | <b>S<sub>t</sub></b> = <b>s</b>] 
</p>

On stochastic policy, <ins>the relationship between Action-Value and State-Value</ins> is demonstrated as:
<div align='center'>
<p>
<b>V<sub>π</sub></b>(<b>s</b>) = <b><span>&#8721;</span><sub>a ∈ A</sub></b> [<b>π</b>(<b>a</b> | <b>s</b>) * <b>Q<sub>π</sub></b>(<b>s</b>, <b>a</b>)] 
</p>
<p>
<b>Q<sub>π</sub></b>(<b>s</b>, <b>a</b>) = <b><span>&#8721;</span><sub>s' ∈ S</sub> </b>[<b>P</b>(<b>s'</b> | <b>s</b>, <b>a</b>) [<b>R</b>(<b>s</b>, <b>a</b>, <b>s'</b>) + <b>γV<sub>π</sub></b>(<b>s'</b>)]]
</p>
</div>

#### Optimal value and policy
By iterating around State-Value and Action-Value function, we could get the maximum return of the State-Value
<p align='center'>
<b>V<sub><span>&#42;</span></sub></b>(<b>s</b>) = <b>max<sub>π</sub></b>{<b>V<sub>π</sub></b>(<b>s</b>), <b>Q<sub><span>&#42;</span></sub></b>(<b>s</b>, <b>a</b>)} = <b>max<sub>π</sub></b>[<b>Q<sub>π</sub></b>(<b>s</b>, <b>a</b>)] 
</p>

The optimal policy would be the argmax from the optimal policy from the aforementioned maximum return of the State-Value

<p align='center'>
<b>π<sub>*</sub></b> = argmax<sub><b>π</b></sub>{<b>V<sub>π</sub></b>(<b>s</b>) <b>π<sub><span>&#42;</span></sub></b>}
</p>

## 3. A literature on preliminary approaches in Reinforcement Learning
In this section, I would drive you through the very initial solution for Reinforcement Learning
### a. Dynamic Programming
Dynamic Programming is the first thought coming into Computer Scientists when Reinforcement Learning had just appeared as a successive of previous mathematics foundations such as Bellman Equations [[Bellman (1959)](https://link.springer.com/referenceworkentry/10.1007/978-0-387-30164-8_71)] and Markov Decision Processes [[Puterman (1994)](https://dl.acm.org/doi/10.5555/528623)]. There are a great number of DP-based and DP-inspired algorithms to deal with Reinforcement Learning. There lie two most highlighted algorithms when mentioned about DP in RL which are <b><ins>Policy Iteration</ins></b> and <b><ins>Value Iteration</ins></b>. 

Both algorithms are DP algorithms based on Bellman Equations which aimed to find an optimal policy <b>π<sub>&#42;</sub></b> in a Reinforcement Learning environment using <ins>one-step look-ahead strategy</ins>.

| Policy Iteration | Value Iteration | 
| :---: | :---: |
| Faster | Slower |
| Fewer iterations | More iterations | 
| Guaranteed to converge |  Guaranteed to converge |
| Algorithm is more <b>sophisticated</b> | Algorithm is more <b>trouble-free</b> | 
| Start with <b>a random policy</b> | Start with <b>a random value function</b> |
| <ins>Cheaper</ins> computational costs | <ins>More expensive</ins> computational costs | 

<p align='center'>
<b>Table 1. </b>A minor comparison between Policy Iteration and Value Iteration.
</p>

#### Policy Iteration
In policy iteration, one fixed policy is utilized firstly. Then, the algorithm would traverse through iterations, on every iteration, the policy is evaluated and updated gradually until the convergence.
```python
def policy_iteration(env, max_iters, gamma):
    # Intialize a random policy
    policy = np.zeros(env.observation_space.n, dtype=np.int)
    for i in range(len(policy)):
        import random
        policy[i] = random.randint(0, 3)

    for i in range(max_iters):
        policy_stable = True 

        # Evaluate the present policy
        v_values =  policy_evaluation(env, 
                                      max_iters=max_iters, 
                                      gamma=gamma, 
                                      policy=policy)

        # Update the policy
        new_policy = policy_improvement(env, 
                                        gamma=gamma, 
                                        v_val=v_values, 
                                        policy=policy)

        # Check convergence
        if np.all(np.array_equiv(policy, new_policy)): 
            policy_stable = True
            print(f'Converged at {i}-th iteration')
            break
        else:
            policy_stable = False
        policy = new_policy.copy()
    return policy
```

#### Value Iteration
Value Iteration, on the other hand, begins with <ins>a selected value function</ins> and iterates over that value function. Value Iteration undergoes a heavier computing process by taking a maximum over the utility function for <ins>all possible actions</ins>. And subsequently, Value Iteration has a tendency to take more iterations before fully converged compared to the Policy one.

```python
def value_iteration(env, max_iters, gamma):
    v_values = np.zeros(env.observation_space.n)

    for i in range(max_iters):
        prev_v_values = np.copy(v_values)

        # Compute the value for state
        for state in range(env.observation_space.n):
            q_values = []
            # Compute the q-value for each action
            for action in range(env.action_space.n):
                q_value = 0
                # Loop through each possible outcome
                for prob, next_state, reward, done in env.P[state][action]:
                    q_value += prob * (reward + gamma * prev_v_values[next_state])
                
                q_values.append(q_value)
            
            # Select the best action
            best_action = np.argmax(q_values)
            v_values[state] = q_values[best_action]
        
        # Check convergence
        if np.all(np.isclose(v_values, prev_v_values)):
            print(f'Converged at {i}-th iteration.')
            break
    
    return v_values
```

### b. Q-Learning
Q-Learning is <ins>a <b>model-free</b> reinforcement learning algorithm</ins> to learn the quality of action **a** to tell the agent which actions to execute at a certain state **s**. It does not require a model of a certain environment. It can handle dynamically environmental problems and achieve rewards without any adaptations. The development of Q-Learning is actually a breakthrough in the early days of reinforcement learning.

The interesting point in Q-Learning is the independence of the current policy to choose the second action <b>a<sub>t+1</sub></b>. It, essentially, estimates <b>Q<sub><span>&#42;</span></sub></b> among the best Q-values, but it does not matter which action leads to this maximum Q-value and in the next step, this algorithm does not have to follow that policy.

<div align="center">
    <img width=80% src="/q-learning.png" alt="q-learning">
    <div align ='center'>
        Pseudo code for Updating Q-Value <a href="https://github.com/DTA-UIT/Deep-Q-Network/blob/main/report/Deep%20Q%20Network.pdf">[Tan Ngoc Pham et al. (2020)]</a>
    </div>
</div>


## 4. Conclusions
- Throughout this blog, I have brought to you <ins>the most preliminary concepts</ins> on what Reinforcement Learning looks like, its mathematical fundamental and some of the algorithms to deal with Reinforcement Learning problems.
- Further construction in Reinforcement Learning and more intensive algorithms surrounding would be settled on later posts on this blog.