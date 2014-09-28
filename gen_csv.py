import csv
import string
import random

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


with open("input.csv", "w") as f:
     writer = csv.writer(f, delimiter=',')
     header = ['fname', 'lname', 'uid', 'phone', 'address']
     writer.writerow(header)
     p1 = 0
     p2 = 0
     p3 = 0
     for i in range(1, 101):
         fname = id_generator(3, string.lowercase)   
         lname = id_generator(3, string.lowercase)
         uid = i
         phone = id_generator(3, string.digits) + "-" + id_generator(3, string.digits) + "-" + id_generator(4, string.digits)
         address = id_generator(10, string.lowercase + string.digits + " ")
         row = [fname, lname, uid, phone, address]
         writer.writerow(row)	
