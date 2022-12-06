import http.server
import socketserver

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler


def calcPi(limit):  # Generator function
    """
    Prints out the digits of PI
    until it reaches the given limit
    """

    q, r, t, k, n, l = 1, 0, 1, 1, 3, 3

    decimal = limit
    counter = 0
    result2 = ""
    while counter != decimal + 1:
            if 4 * q + r - t < n * t:
                    # yield digit
                    result2 = result2 + str(n)
                    # insert period after first digit
                    if counter == 0:
                            result2 = result2 + "."
                    # end
                    if decimal == counter:
                            #print('')
                            break
                    counter += 1
                    nr = 10 * (r - n * t)
                    n = ((10 * (3 * q + r)) // t) - 10 * n
                    q *= 10
                    r = nr
            else:
                    nr = (2 * q + r) * l
                    nn = (q * (7 * k) + 2 + (r * l)) // (t * l)
                    q *= k
                    t *= l
                    l += 2
                    k += 1
                    n = nn
                    r = nr
                    print(nr)
    return result2


def main(n):  # Wrapper function
  #pi_digits = calcPi(n)
  with socketserver.TCPServer(("", PORT), Handler) as httpd:
    #print("serving at port", PORT)
    httpd.serve_forever()
  #return pi_digits

#print(main(20))
main()