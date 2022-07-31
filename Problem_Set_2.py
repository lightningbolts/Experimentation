#Problem 1
from functools import update_wrapper


def remaining_balance(balance, annualInterestRate, monthlyPaymentRate, count):
  if count == 0:
    return round(balance, ndigits=2)
  else:
    unpaid_balance = balance - monthlyPaymentRate * balance
    new_balance = unpaid_balance + annualInterestRate / 12.0 * unpaid_balance
    return remaining_balance(new_balance, annualInterestRate, monthlyPaymentRate, count - 1)
#print(remaining_balance(42, 0.2, 0.04, 12))

#Problem 2
def minimum_payment(balance, annualInterestRate, minimum_monthly_payment, count, balance2):
  fixed_balance = balance2
  if count == 0:
    if balance <= 0:
      return minimum_monthly_payment
    else:
      return minimum_payment(fixed_balance, annualInterestRate, minimum_monthly_payment + 10, 12, balance2)
  else:
    unpaid_balance = balance - minimum_monthly_payment
    new_balance = unpaid_balance + annualInterestRate / 12.0 * unpaid_balance
    return minimum_payment(new_balance, annualInterestRate, minimum_monthly_payment, count - 1, balance2)
#print(minimum_payment(4773, 0.2, 0, 12, 4773))

#Problem 3
def tolerance(balance):
  return balance >= -0.001 and balance <= 0

def minimum_payment_fast(balance, annualInterestRate, lower_bound, upper_bound, count, balance2):
  fixed_balance = balance2
  mid = (lower_bound + upper_bound) / 2
  if count == 0:
    if tolerance(balance):
      return round(mid, ndigits=2) 
    elif balance > 0:
      return minimum_payment_fast(fixed_balance, annualInterestRate, mid, upper_bound, 12, balance2)
    else:
      return minimum_payment_fast(fixed_balance, annualInterestRate, lower_bound, mid, 12, balance2)
  else:
    unpaid_balance = balance - mid
    new_balance = unpaid_balance + annualInterestRate / 12.0 * unpaid_balance
    return minimum_payment_fast(new_balance, annualInterestRate, lower_bound, upper_bound, count - 1, balance2)
b = 999999
ai = 0.18
lower = b / 12
upper = (b * (1 + ai / 12) ** 12) / 12
print(minimum_payment_fast(b, ai, lower, upper, 12, b))