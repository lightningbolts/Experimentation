# Hangman game
#

# -----------------------------------
# Helper code
# You don't need to understand this helper code,
# but you will have to know how to use the functions
# (so be sure to read the docstrings!)

import random
import string

WORDLIST_FILENAME = "words.txt"

def loadWords():
    """
    Returns a list of valid words. Words are strings of lowercase letters.
    
    Depending on the size of the word list, this function may
    take a while to finish.
    """
    print("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    # wordlist: list of strings
    wordlist = line.split()
    print("  ", len(wordlist), "words loaded.")
    return wordlist

def chooseWord(wordlist):
    """
    wordlist (list): list of words (strings)

    Returns a word from wordlist at random
    """
    return random.choice(wordlist)

# end of helper code
# -----------------------------------

# Load the list of words into the variable wordlist
# so that it can be accessed from anywhere in the program
wordlist = loadWords()

def split(word):
    return [char for char in word]

def isWordGuessed(secretWord, lettersGuessed):
    '''
    secretWord: string, the word the user is guessing
    lettersGuessed: list, what letters have been guessed so far
    returns: boolean, True if all the letters of secretWord are in lettersGuessed;
      False otherwise
    '''
    # FILL IN YOUR CODE HERE...
    secretWordArr = split(secretWord)
    #print(secretWordArr)
    return set(secretWordArr) <= set(lettersGuessed)
      
secretWord = 'apple' 
lettersGuessed = ['b', 's', 'p', 'p', 'l', 'e']
#print(isWordGuessed(secretWord, lettersGuessed))

def getGuessedWord(secretWord, lettersGuessed):
    '''
    secretWord: string, the word the user is guessing
    lettersGuessed: list, what letters have been guessed so far
    returns: string, comprised of letters and underscores that represents
      what letters in secretWord have been guessed so far.
    '''
    # FILL IN YOUR CODE HERE...
    result = ""
    secretWordArr = split(secretWord)
    for elem in secretWordArr:
      if elem in lettersGuessed:
        result = result + elem
      else:
        result = result + "_ "
    return result
secretWord = 'apple' 
lettersGuessed = ['e', 'i', 'k', 'p', 'r', 's']
#print(getGuessedWord(secretWord, lettersGuessed))

def getAvailableLetters(lettersGuessed):
    '''
    lettersGuessed: list, what letters have been guessed so far
    returns: string, comprised of letters that represents what letters have not
      yet been guessed.
    '''
    # FILL IN YOUR CODE HERE...
    result = ""
    alphabet = string.ascii_lowercase
    alphabetArr = split(alphabet)
    arr = []
    for elem in alphabetArr:
      if elem in lettersGuessed:
        arr.append(elem)
    for elem in alphabetArr:
      if elem in arr:
        result
      else:
        result += elem
    return result

lettersGuessed = ['e', 'i', 'k', 'p', 'r', 's']
print(getAvailableLetters(lettersGuessed))

def letterInWord(secretWord, letter):
  return letter in secretWord

def hangman(secretWord):
    '''
    secretWord: string, the secret word to guess.

    Starts up an interactive game of Hangman.

    * At the start of the game, let the user know how many 
      letters the secretWord contains.

    * Ask the user to supply one guess (i.e. letter) per round.

    * The user should receive feedback immediately after each guess 
      about whether their guess appears in the computers word.

    * After each round, you should also display to the user the 
      partially guessed word so far, as well as letters that the 
      user has not yet guessed.

    Follows the other limitations detailed in the problem write-up.
    '''
    # FILL IN YOUR CODE HERE...
    lettersGuessed = []
    mistakesMade = 0
    print("Welcome to the game Hangman!")
    print("I am thinking of a word that is", len(secretWord), "letters long.")
    while mistakesMade < 8:
      availableLetters = getAvailableLetters(lettersGuessed)
      print("-----------")
      print("You have", 8 - mistakesMade, "guesses left.")
      print("Available letters:", availableLetters)
      guess = input("Please guess a letter: ")
      lettersGuessed.append(guess)
      if isWordGuessed(secretWord, lettersGuessed) == True:
        print("Good guess:", getGuessedWord(secretWord, lettersGuessed))
        print("-----------")
        print("Congratulations, you won!")
        break
      else:
        if lettersGuessed[len(lettersGuessed) - 1] in lettersGuessed[0:len(lettersGuessed) - 1]:
          print("Oops! You've already guessed that letter:", getGuessedWord(secretWord, lettersGuessed))
        elif letterInWord(secretWord, lettersGuessed[len(lettersGuessed) - 1]):
          print("Good guess:", getGuessedWord(secretWord, lettersGuessed))
        else:
          print("Oops! That letter is not in my word:", getGuessedWord(secretWord, lettersGuessed))
          mistakesMade += 1
    print("-----------")
    print("Sorry, you ran out of guesses. The word was", secretWord)
          



# When you've completed your hangman function, uncomment these two lines
# and run this file to test! (hint: you might want to pick your own
# secretWord while you're testing)

secretWord = chooseWord(wordlist).lower()
#secretWord = "else"
hangman(secretWord)
