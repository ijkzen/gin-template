package bean

type Response[T any] struct {
	ErrorCode    int `json:"errCode"`
	ErrorMessage string `json:"errMessage"`
	Data         T `json:"data"`
}
