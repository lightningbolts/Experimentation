import math
from math import floor

def guesser():
  low = 0
  high = 100
  guess = None
  direction = None
  print("Please think of a number between 0 and 100!")
  while direction != "c":
    guess = math.floor((low + high) / 2)
    print("Is your secret number", str(guess) + "?")
    direction = input("Enter 'h' to indicate the guess is too high. Enter 'l' to indicate the guess is too low. Enter 'c' to indicate I guessed correctly. ")
    if direction == "c":
      print("Game over. Your secret number was:", str(guess))
    elif direction == "h":
      high = guess
    elif direction == "l":
      low = guess
    else:
      print("Sorry, I did not understand your input.")
      
guesser()