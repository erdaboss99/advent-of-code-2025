package utils

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

const INPUT_DIR = "inputs"

func GetInput(day int) string {
	inputFile := filepath.Join(INPUT_DIR, fmt.Sprintf("day%02d.txt", day))

	if _, err := os.Stat(inputFile); err == nil {
		content, _ := os.ReadFile(inputFile)
		return string(content)
	}

	fmt.Printf("Fetching input for day %d...\n", day)
	sessionToken := os.Getenv("SESSION")

	url := fmt.Sprintf("https://adventofcode.com/2025/day/%d/input", day)
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Cookie", fmt.Sprintf("session=%s", sessionToken))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	_ = os.MkdirAll(INPUT_DIR, os.ModePerm)
	_ = os.WriteFile(inputFile, body, os.ModePerm)

	return string(body)
}
