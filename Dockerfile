FROM 192.168.31.100:5000/golang:1.21.4 AS builder

WORKDIR /build

COPY . /build/

RUN go env -w GOPROXY=http://192.168.31.100:4012,direct; CGO_ENABLED=0 go build -trimpath -ldflags "-s -w"  main.go

FROM 192.168.31.100:5000/debian:stable-slim

WORKDIR /app

EXPOSE 4007

COPY --from=builder /build/main /app/main

RUN chmod +x /app/main

CMD [ "/app/main" ]