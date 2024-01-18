package version

import "os"

func IsRelease() bool {
	return os.Getenv("release") != ""
}