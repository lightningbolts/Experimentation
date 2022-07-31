def gcdIter(a, b):
  '''
  a, b: positive integers  
  returns: a positive integer, the greatest common divisor of a & b.
    '''
  # Your code here
    
  count = 1
  result = 1
  while count <= min(a, b):
    print(count)
    if a % count == 0 and b % count == 0:
      print(a, b)
      print(count, "Meets condition")
      result = count
    count += 1
  return result

print(gcdIter(45, 180))