package main

import "fmt"

func main() {
	var a = 10
	if a < 20 {
		fmt.Printf("a小于10\n")
	} else {
		fmt.Printf("a大于或等于20\n")
	}
	for i := 0; i < 10; i++ {
		fmt.Printf("i 的值为: %d\n", i)
	}
}
