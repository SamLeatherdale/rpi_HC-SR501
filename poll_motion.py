import RPi.GPIO as GPIO
import time

print(GPIO.RPI_INFO)

GPIO.setmode(GPIO.BCM)

PIR_PIN = 18
CNT = 0
SINGLE = True

for i in range(2, 22):
	if not SINGLE or i == PIR_PIN:
		print(i)
		GPIO.setup(i, GPIO.IN)

print("PIR Module Test (CTRL+C to exit)")
time.sleep(2)
print("Ready")


while True:
	for i in range(2, 22):
		if not SINGLE or i == PIR_PIN:
			input = GPIO.input(i)
			if input:
				CNT = CNT + 1
				print("Motion Detected: {} #{}".format(i, str(CNT)))
	time.sleep(1)
