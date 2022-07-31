#Problem 1

def split(word):
    return [char for char in word]

s = 'aeiuououoi28434'
def vowelcounter(s, count):
  l = split(s)
  if len(l) == 0:
    print("Number of vowels:", count)
    quit()
  else:
    if l[0] == "a" or l[0] == "e" or l[0] == "i" or l[0] == "o" or l[0] == "u":
      return vowelcounter(s[1:], count + 1)
    else:
      return vowelcounter(s[1:], count) 

print(vowelcounter(s, 0))
