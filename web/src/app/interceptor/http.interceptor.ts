import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 如果是完整URL,不做处理
  if (req.url.startsWith('http')) {
    return next(req);
  }

  let newReq = req.clone({
    url: environment.apiUrl + req.url
  });

  // 如果请求包含 /api 前缀,添加token
  if (req.url.includes('/api')) {
    const token = authService.getToken();
    if (token) {
      newReq = newReq.clone({
        headers: newReq.headers.set('Authorization', `Bearer ${token}`)
      });
    }
  }

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 如果是401错误且不是登录或刷新token请求
      if (error.status === 401
        && !req.url.includes('/login')
        && !req.url.includes('/refresh_token')) {

        if (authService.isTokenExpired()) {
          // token过期,尝试刷新
          return authService.refreshToken().pipe(
            switchMap(success => {
              if (success) {
                // 刷新成功,重试原请求
                const token = authService.getToken();
                const retryReq = newReq.clone({
                  headers: newReq.headers.set('Authorization', `Bearer ${token}`)
                });
                return next(retryReq);
              } else {
                // 刷新失败,跳转登录
                authService.logout();
                router.navigate(['/']);
                return throwError(() => error);
              }
            })
          );
        } else {
          // token无效,退出登录
          authService.logout();
          router.navigate(['/']);
        }
      }
      return throwError(() => error);
    })
  );
};
