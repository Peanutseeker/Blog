---
title: Higher order functions in python
description: Notes for CS61A Lecture 4
pubDate: Jul 20 2025
heroImage: ../../assets/blog-placeholder-3.jpg
---

>[TIP] Significance
>A very essential insight into writing pythonic pythons


#### Properties of Python functions
**<mark>Insight: you can pass and return functions just like variables</mark>**

You do not need to identify variable types for python codes when defining functions.

Also you can return multiple variables at your will, regardless of types and numbers

## Functions as objects in python

**<mark>Essentially, in python, functions are not designated machines for specific tasks. They are flexible tools that can be passed, assigned and even created</mark>**

**<mark>This method matches the dynamic and abstraction feature of python programming, ensuring generalizability and robustness</mark>**

#### Functions as arguments

Similar to function pointers in C++, but you only need to give the name instead of restricting its type, far more convenient than cpp.
Acts like templates in C++ but with functions, indicating generalizability
```python
def summation(n, term):
    total, k = 0, 1
    while k <= n:
        total, k = total + term(k), k + 1
    return total

def cube(x):
    return x*x*x

def sum_cubes(n):
    return summation(n, cube)

result = sum_cubes(3)

```

#### General Functions
**<mark>You can design a general function performing a specific intent regardless of the specific type of task you are currently tackling.</mark>**

For example, you define this specific function for elements
```python
def improve(update, close, guess=1):
    while not close(guess):
        guess = update(guess)
    return guess
```

You can apply this to calculating the golden ratio: 
```python

def improve(update, close, guess=1):
    while not close(guess):
        guess = update(guess)
    return guess

def golden_update(guess):
    return 1/guess + 1

def square_close_to_successor(guess):
    return approx_eq(guess * guess,
                     guess + 1)

def approx_eq(x, y, tolerance=1e-3):
    return abs(x - y) < tolerance

phi = improve(golden_update,
              square_close_to_successor)

```
The general functions like `improve` are called first-class functions that frame the top workflow for your solution. They can use subordinate functions as tools and even create functions by compounding tool functions.

This enables you to write your code in a top-down approach, framing the workflow first then implementing the task-specific details. 

Furthermore, the framework determined by first-class functions can be adapted to similar problems with different tool functions, promoting readability and code-reuse.

**<mark>Further, when implementing gradient descent, you pass the cost function as gradient, and write the gradient descent function as a general function</mark>**

#### Nested functions

You can design functions inside functions to match the specific requirement for arguments in higher-order functions

Eg: Square root calculation
```python
def average(x, y):
    return (x + y)/2

def improve(update, close, guess=1):
    while not close(guess):
        guess = update(guess)
    return guess

def approx_eq(x, y, tolerance=1e-3):
    return abs(x - y) < tolerance

def sqrt(a):
    def sqrt_update(x):
        return average(x, a/x)
    def sqrt_close(x):
        return approx_eq(x * x, a)
    return improve(sqrt_update, sqrt_close)

result = sqrt(256)
```

**<mark>This matches the feature of module development, enclosing every operation in specifically one function to improve comprehensibility</mark>**

### <mark>Returning functions</mark>

You can define a compound function in Python as:
```python
def compose1(f, g):
        def h(x):
            return f(g(x))
        return h
```
**<mark>Notice that locally defined functions maintain their parent environment when they are returned. This is called a closure.</mark>**

```python
def square(x):
    return x * x

def successor(x):
    return x + 1

def compose1(f, g):
    def h(x):
        return f(g(x))
    return h

def f(x):
    """Never called."""
    return -x

square_successor = compose1(square, successor)
result = square_successor(12)
```

In the example above, the function f and g are defined inside the compose1 function, and should be destroyed after returning h (marked as the end for compose1's life cycle). However, in order to have the function h operate successfully, **<mark>python will package the functions f, g, and h together and return this whole package</mark>**

Therefore, the function "square successor" means a package including the definition of h and the environment this construction of h depends on(whereas f refers to the function "square" and g refers to the function "successor"). In this way, the two functions can be called inside the function h.

#### Application: Newton's method
Intent: figure out an approximation for one solution to `f(x)=0` in an interval `[a,b]`

Workflow:
A loop where $x_n=x_{n-1}-f(x_{n-1})/f'(x_{n-1}) \text{ where f' is denoted as function "df"}$ Ends until $|f(x)|<error$

Therefore apply the high-order functions of `improve` and `approx_eq`.
We only need to define the `close` and `update` function specific for newton approximation
```python
def newton_update(f, df):
        def update(x):
            return x - f(x) / df(x)
        return update

def improve(update, close, guess=1):
    while not close(guess):
        guess = update(guess)
    return guess

def approx_eq(x, y, tolerance=1e-3):
    return abs(x - y) < tolerance

def find_zero(f, df):
        def near_zero(x):
            return approx_eq(f(x), 0)
        return improve(newton_update(f, df), near_zero)
```

For square root approximation:
```python
def square_root_newton(a):
        def f(x):
            return x * x - a
        def df(x):
            return 2 * x
        return find_zero(f, df)
```

### Currying and functional programming
**<mark>Core idea: transforming functions with multiple parameters into series of single-argument functions</mark>**

Advantage of currying: **Making tailored versions for functions that need to be applied frequently**
For example, the following code derives the tailored function(`double`, `triple`) from the two-argument function `multiply`, which promotes code-reuse.
```python
def multiply(a, b):
    return a * b

# 使用柯里化来创建专用函数
def multiply_curried(a):
    def inner(b):
        return a * b
    return inner

# 现在，我们可以轻松创建专用版本
double = multiply_curried(2)  # double 是一个已经"记住" a=2 的新函数
triple = multiply_curried(3)  # triple 是一个已经"记住" a=3 的新函数

# 直接使用这些专用函数，代码更清晰
print(f"5 翻倍是: {double(5)}")      # 输出: 5 翻倍是: 10
print(f"5 的三倍是: {triple(5)}")  # 输出: 5 的三倍是: 9  (抱歉，这里应该是15)
print(f"8 翻倍是: {double(8)}")      # 输出: 8 翻倍是: 16

# 你仍然可以完成一次性调用
print(f"2 乘以 10 是: {multiply_curried(2)(10)}") # 输出: 2 乘以 10 是: 20
```

Explanation for `multiply_curried(2)(10)`:
First call the outside function `multiply curried(2)`, where x is assigned as 2. It returned the package consisting function `inner` and the parameter `x` as 2
Secondly, `multiply_curried(2)(10)` is the same as `inner(10)` where `x` is assigned as 2. Thus, it returns 20.

Additionally, you can uncurry a function
```python
def curry2(f):
        """Return a curried version of the given two-argument function."""
        def g(x):
            def h(y):
                return f(x, y)
            return h
        return g

def uncurry2(g):
        """Return a two-argument version of the given curried function."""
        def f(x, y):
            return g(x)(y)
        return f
```

### Lambda Functions
**<mark>Essence of lambda functions: constructing functions without specific names for temporary tasks</mark>**

Comprehend lambda functions as follows:
lambda  x  :  f(g(x))
="A function that    takes x    and returns     f(g(x))"
Often just consists of a single return code.
```python
names = ["Alice", "Bob", "Charlie", "David"]

# 正常做法：需要先定义一个完整的函数
def get_last_letter(name):
    return name[-1]
names.sort(key=get_last_letter)
print(names) # 输出: ['David', 'Bob', 'Alice', 'Charlie']

# 使用 lambda "便利贴" 的做法：
names = ["Alice", "Bob", "Charlie", "David"] # 重置列表

# 直接在需要的地方写一张 "便利贴" 函数
# "key" 参数需要一个函数，我们就地写一个 lambda 给他
names.sort(key=lambda name: name[-1]) 

print(names) # 输出: ['David', 'Bob', 'Alice', 'Charlie']
```

### <mark>Decorators</mark>

A vivid illustration for decorators are coats(or plugins) for functions, adding extra behavior before and after they're called

An easy example is adding a timer to a slow function.

Original function:
```python
import time

def slow_operation():
    """一个需要执行一段时间的核心任务"""
    print("开始执行核心任务...")
    time.sleep(2) # 模拟耗时操作
    print("核心任务执行完毕！")
    return "任务完成"
```
Timer:
```python
def timer_decorator(func):
    # func 就是传进来的核心人物 (slow_operation)
    def wrapper(*args, **kwargs): # "wrapper" 是穿上外套后的新人物
        start_time = time.time()
        print("【计时开始】")
        
        result = func(*args, **kwargs) # 让核心人物执行他原来的任务
        
        end_time = time.time()
        print(f"【计时结束】任务耗时: {end_time - start_time:.2f} 秒")
        return result
    return wrapper # 返回这个穿好外套的新人物

```

An elegant way of applying the decorator:
```python
@timer_decorator
def slow_operation_with_timer():
    """一个需要执行一段时间的核心任务"""
    print("开始执行核心任务...")
    time.sleep(2)
    print("核心任务执行完毕！")
    return "任务完成"

"""
This chunk is equivalent to:
slow_operation_with_timer = timer_decorator(slow_operation_with_timer)
"""

# 现在调用这个函数时，它已经自动穿上了 "计时" 外套
result_text = slow_operation_with_timer()
print(f"最终结果: {result_text}")
```

More examples:
**<mark>A logging decorator for debugging:</mark>**
```python
import functools
import datetime

def log_activity(func):
    """一个简单的日志装饰器，记录函数调用信息。"""
    
    # functools.wraps 是一个“装饰器的装饰器”
    # 它的作用是将被装饰函数的元信息(如__name__, __doc__)复制到 wrapper 函数上
    # 如果没有它，我们装饰过的 add 函数就会“假装”自己叫 wrapper
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # *args, **kwargs 让 wrapper 可以接收任意参数，使其变得通用
        
        print(f"[{datetime.datetime.now()}] --- 调用函数 '{func.__name__}' ---")
        print(f"传入参数: args={args}, kwargs={kwargs}")
        
        # 调用原始函数
        result = func(*args, **kwargs)
        
        print(f"函数返回: {result}")
        print(f"[{datetime.datetime.now()}] --- 函数 '{func.__name__}' 执行完毕 ---")
        
        return result
    return wrapper

# --- 应用装饰器 ---

@log_activity
def add(x, y):
    """这是一个计算两个数之和的函数。"""
    return x + y

@log_activity
def greet(name, greeting="Hello"):
    """这是一个生成问候语的函数。"""
    return f"{greeting}, {name}!"

# --- 调用被装饰的函数 ---
print("--- 开始调用 add 函数 ---")
add(5, 3)
print("\n" + "="*40 + "\n")
print("--- 开始调用 greet 函数 ---")
greet("Alice", greeting="Hi")

# 检查函数的元信息是否被保留
print(f"\n函数 add 的名字是: {add.__name__}")
print(f"函数 add 的文档是: {add.__doc__}")
```
Caching for recursive functions:
```python
import functools
import time

def memoize(func):
    """一个缓存函数结果的装饰器。"""
    cache = {} # 缓存字典，作为闭包的一部分被 wrapper 捕获
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # 创建一个可哈希的键，这里为了简单只考虑位置参数
        # 注意：如果参数包含列表等不可哈希类型，这里会报错
        key = args
        if key not in cache:
            print(f"缓存未命中，正在计算 {func.__name__}{key}...")
            # 如果结果不在缓存中，则调用函数计算，并存入缓存
            cache[key] = func(*args, **kwargs)
        else:
            print(f"缓存命中！直接返回 {func.__name__}{key} 的结果。")
            
        return cache[key]
    return wrapper

# --- 应用装饰器 ---

@memoize
def fibonacci(n):
    """一个计算斐波那契数的（低效）递归函数。"""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# --- 调用 ---
print("--- 第一次调用 fibonacci(8) ---")
start_time = time.perf_counter()
result = fibonacci(8)
end_time = time.perf_counter()
print(f"结果: {result}, 耗时: {end_time - start_time:.6f} 秒")

print("\n" + "="*40 + "\n")

print("--- 第二次调用 fibonacci(8) ---")
# 因为所有子问题（如 fibonacci(7), fibonacci(6)...）都已被缓存，这次会非常快
start_time = time.perf_counter()
result = fibonacci(8)
end_time = time.perf_counter()
print(f"结果: {result}, 耗时: {end_time - start_time:.6f} 秒")
```