# AngularTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Coding Standards

本项目遵循 [Angular Style Guide](https://angular.dev/style-guide) 官方代码规范，主要包含以下规范：

### 1. 命名规范

- **文件命名**：使用短横线分隔（kebab-case），例如 `change-password-dialog.component.ts`
- **目录命名**：避免使用缩写，使用完整的单词，例如 `change-password/` 而非 `changepw/`
- **类命名**：使用大驼峰命名（PascalCase），例如 `ChangePasswordDialogComponent`

### 2. 依赖注入

优先使用 `inject()` 函数而非构造函数参数注入：

```typescript
// ✅ 推荐
export class MyComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
}

// ❌ 避免
export class MyComponent {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
}
```

### 3. 类成员可见性

- 仅在模板中使用的成员使用 `protected`
- 公开的 API 保持 `public`（默认）
- 完全私有的成员使用 `private`

```typescript
export class MyComponent {
  // 依赖注入 - private
  private http = inject(HttpClient);
  
  // 模板使用的属性 - protected
  protected isLoading = false;
  protected userName = '';
  
  // 公开方法 - public
  save() { }
}
```

### 4. 属性排序

类成员应按以下顺序组织：

1. 注入的依赖（Angular 相关属性）
2. Inputs 和 Outputs
3. 模板使用的属性（protected）
4. 公共方法
5. 生命周期钩子

### 5. Observable 属性

使用 `readonly` 修饰符防止 Observable 被重新赋值：

```typescript
export class MyService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  readonly data$ = this.dataSubject.asObservable();
}
```

### 6. 文件结构

- 一个文件一个概念（组件、指令、服务）
- 相关文件放在一起（`.ts`, `.html`, `.scss`）
- 按功能区域组织目录结构
