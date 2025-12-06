package utils

import (
	"fmt"
	"os"
	"strings"
	"time"
)

const (
	MAIN_GO_FILE     = "main.go"
	TEMPLATE_GO_PATH = "days/template.go"
)

func CreateDay() {
	today := time.Now().Day()
	dayStr := fmt.Sprintf("%02d", today)
	dayFile := fmt.Sprintf("days/day%s.go", dayStr)

	if _, err := os.Stat(dayFile); err == nil {
		fmt.Printf("Day %s already exists\n", dayStr)
		os.Exit(1)
	}

	template, err := os.ReadFile(TEMPLATE_GO_PATH)
	if err != nil {
		panic(err)
	}

	dayCode := string(template)
	dayCode = strings.ReplaceAll(dayCode, "_TEMPLATE_", fmt.Sprintf("_%s_", dayStr))
	dayCode = strings.ReplaceAll(dayCode, "Day00", fmt.Sprintf("Day%s", dayStr))
	dayCode = strings.ReplaceAll(dayCode, "GetInput(0)", fmt.Sprintf("GetInput(%d)", today))

	err = os.WriteFile(dayFile, []byte(dayCode), 0644)
	if err != nil {
		panic(err)
	}

	err = updateMainGoSwitch(today, dayStr)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Created %s and updated main.go\n", dayFile)
}

func updateMainGoSwitch(day int, dayStr string) error {
	mainContent, err := os.ReadFile(MAIN_GO_FILE)
	if err != nil {
		return err
	}

	mainStr := string(mainContent)

	newCase := fmt.Sprintf("\tcase %d:\n\t\tdays.Day%s()", day, dayStr)

	defaultCase := "\tdefault:\n\t\tfmt.Println(\"Day not implemented\")"
	replacement := newCase + "\n" + defaultCase

	updatedMain := strings.Replace(mainStr, defaultCase, replacement, 1)

	return os.WriteFile(MAIN_GO_FILE, []byte(updatedMain), 0644)
}
