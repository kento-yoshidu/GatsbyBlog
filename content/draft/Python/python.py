from enum import Enum

class Hoge(Enum):
	OK = 1
	NG = -1

print(Hoge.NG.value)