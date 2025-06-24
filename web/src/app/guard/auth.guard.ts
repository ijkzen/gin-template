import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { ToastService } from "../service/toast.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toastService = inject(ToastService);

    // 检查是否已登录且token未过期
    if (!authService.isTokenExpired() && authService.getToken()) {
        return true;
    }

    // 未登录或token过期,跳转到首页
    toastService.showToast('请先登录');
    router.navigate(['/']);
    return false;
}; 