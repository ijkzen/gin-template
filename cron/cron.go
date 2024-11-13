package cron

import "github.com/ijkzen/gcron"

var Pool *gcron.JobPool

func init() {
	Pool = gcron.NewJobPool()

	// pool.init()
	// pool.add()

	Pool.Start()
}