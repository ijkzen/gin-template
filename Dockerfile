FROM 192.168.31.100:2002/ijkzen/build:v0.8 AS builder

WORKDIR /build

COPY . /build/

RUN cd /build/web && \
    npm install -g pnpm && \
    pnpm install && \
    pnpm build && \
    rm -rf /build/static/front && \
    mkdir /build/static/front && \
    cp -r /build/web/dist/browser/* /build/static/front && \
    cd /build && \
    apk add --no-cache gcc musl-dev && \
    CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -a -tags netgo -ldflags '-s -w -extldflags "-static"' -o main . && \
    apk add --no-cache upx && \
    upx --lzma main

FROM 192.168.31.100:2002/ijkzen/base:v0.8

WORKDIR /app

COPY --from=builder /build/main /app/main

RUN chmod +x /app/main

CMD [ "/app/main" ]