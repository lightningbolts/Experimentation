#lang racket

(define (fast x y)
  (if (= y 1)
      x
      (expt x (fast x (- y 1)))))

(define (gui2 x)
  (fast x x))

