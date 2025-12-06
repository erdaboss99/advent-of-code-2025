package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"

	"erdaboss99/advent-of-code/2025/go/days"
	"erdaboss99/advent-of-code/2025/go/utils"
)

func main() {
	godotenv.Load()

	if len(os.Args) < 2 {
		fmt.Println("Usage: go run . <day_number|create>")
		os.Exit(1)
	}

	if os.Args[1] == "create" {
		utils.CreateDay()
		return
	}

	day, err := strconv.Atoi(os.Args[1])
	if err != nil {
		fmt.Printf("Invalid day argument: %s\n", os.Args[1])
		os.Exit(1)
	}

	callDay(day)
}

func callDay(day int) {
	fmt.Println("Day", day)
	switch day {
	case 1:
		days.Day01()
	default:
		fmt.Println("Day not implemented")
	}
}
