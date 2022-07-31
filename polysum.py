from math import pi, tan 

def polysum(n, s): 
    area = (0.25 * n * s ** 2)/(tan(pi / n)) 
    perimeter = (n * s) ** 2
    return round(area + perimeter, 4)  