# AGENTS.md - Development Guide for gin-template

## Project Overview
Go backend template using Gin framework with SQLite/GORM, JWT authentication, WebSocket support, and Zap logging.
Frontend (Angular) located in `web/` directory, compiled to `static/`.

## Build & Run Commands

### Build
```bash
go build -o gin-template .
```

### Run
```bash
go run main.go
# Server starts on port 4007
```

### Run Single Test
```bash
go test -v ./package/path -run TestName
# Example: go test -v ./api/user -run TestChangePassword
```

### Run All Tests
```bash
go test ./...
```

### Run Tests with Coverage
```bash
go test -cover ./...
```

### Lint (install golangci-lint first)
```bash
golangci-lint run
```

### Format Code
```bash
go fmt ./...
goimports -w .
```

### Tidy Dependencies
```bash
go mod tidy
```

## Code Style Guidelines

### Imports
- Standard library imports first, then third-party, then local project imports
- Each group separated by blank line
- Use relative imports from module root: `github.com/ijkzen/gin-template/...`
- Always use `goimports` to auto-sort and clean imports

Example:
```go
import (
    "os"
    "path/filepath"
    "sync"

    "github.com/gin-gonic/gin"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"

    "github.com/ijkzen/gin-template/bean"
    "github.com/ijkzen/gin-template/middleware"
    "github.com/ijkzen/gin-template/service/database/dao"
)
```

### Formatting
- Follow `gofmt` standards (tabs for indentation)
- Run `go fmt ./...` before committing
- Max line length: 120 characters
- Use `gofumpt` for stricter formatting (optional)

### Naming Conventions
- **Packages**: lowercase, no underscores (e.g., `user`, `websocket`)
- **Structs**: PascalCase (e.g., `ChangePasswordRequest`, `User`)
- **Functions**: PascalCase for exported, camelCase for unexported
- **Variables**: camelCase, descriptive names
- **Constants**: PascalCase or ALL_CAPS for true constants
- **Interfaces**: suffix with "-er" (e.g., `Listener`, `Reader`)
- **DAO**: suffix with "Dao" (e.g., `UserDao`, `ArticleDao`)

### Types
- Use Go 1.23+ features appropriately
- Prefer generics for reusable response types: `Response[T any]`
- Use pointer receivers for methods that modify state
- Define request/response structs with JSON and binding tags
```go
type ChangePasswordRequest struct {
    OldPassword string `json:"oldPassword" binding:"required"`
    NewPassword string `json:"newPassword" binding:"required"`
}
```

### Error Handling
- Always check errors explicitly
- Use `err != nil` pattern
- Wrap errors with context using `fmt.Errorf("...: %w", err)`
- Log errors with Zap logger: `log.Logger.Error(err.Error())`
- Return appropriate HTTP status codes (400, 401, 500, etc.)

Standard error response pattern:
```go
c.JSON(500, bean.Response[string]{
    ErrorCode:    500,
    ErrorMessage: "Failed to get user information",
})
return
```

### Logging
- Use Zap logger from `service/log`
- `log.Logger.Info/Error/Warn/Debug` for structured logging
- `log.SugarLogger` for printf-style logging
- Include context in log messages

### Database (GORM)
- Use DAO pattern for database operations
- Protect writes with mutex: `database.DbMutex.Lock()`
- Models embed `gorm.Model` for standard fields (ID, CreatedAt, UpdatedAt, DeletedAt)
- Use struct tags for JSON and GORM

### API Handlers
- Define request structs with `binding` tags for validation
- Use `c.BindJSON()` for JSON parsing
- Return consistent response format: `bean.Response[T]`
- Include `ErrorCode`, `ErrorMessage`, and `Data` fields

Success response:
```go
c.JSON(200, bean.Response[string]{
    ErrorCode: 0,
    Data:      "Password updated successfully",
})
```

### Middleware
- Register in `middleware.Middleware()`
- Use Recovery, Zap logging, and CORS by default
- JWT auth via `github.com/appleboy/gin-jwt/v2`
- Get current user: `middleware.GetCurrentUser(c)`

### Project Structure
```
api/           # HTTP handler functions
  |-- cron    # Manual cron task triggers
  |-- front   # Serve frontend static files
  |-- statsviz# Profiling visualization
  |-- user    # User-related endpoints
  |-- websocket # WebSocket endpoints
bean/          # Response/request structs
cron/          # Scheduled task implementations
middleware/    # Gin middleware
router/        # Route definitions
service/       # Business logic
  |-- database # GORM models, DAOs
  |-- log      # Zap logger setup
  |-- version  # Environment detection
  |-- websocket# WebSocket management
static/        # Compiled frontend files
web/           # Angular frontend source
```

## Copilot Instructions (from .github/copilot-instructions.md)
- Backend: Gin framework, Frontend: Angular (in web/)
- Key directories: api (endpoints), bean (entities), cron (tasks), middleware, router, service
- Database uses SQLite with GORM
- WebSocket support via gorilla/websocket

## Important Notes
- Go version: 1.23.0 (toolchain: 1.24.4)
- Main entry: `main.go` - sets up Gin engine on port 4007
- JWT token expires in 30 days
- Admin user auto-created on first run with random password
- Statsviz enabled for profiling at `/debug/statsviz`
- Pprof enabled for performance profiling at `/debug/pprof`
- Release mode: set environment to `RELEASE=true` or use `-ldflags` during build
