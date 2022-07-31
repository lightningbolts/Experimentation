from re import X

def exp(x, y):
  return x ** y

def fast(x, y):
  if y == 1:
    return x
  else:
    return exp(x, fast(x, y - 1))

def gui2(x):
  return fast(x, x)
#print(gui2(3))

def slow(x, y):
  if y == 1:
    return x
  else:
    return mul(x, slow(x, y - 1))

def mul(x, y):
  return x * y

def gui3(x):
  return slow(x, x)
print(gui3(12))
