# 命令

- npm version patch
  先执行 npm run preversion，ts 检查、jest 单元测试通过后，再升级修订版本号
- npm publish
  先执行 npm run prepare，再发布包到 npm

## URLQueryParserUtils

获取 location.href 中问号后所带的参数

```typescript
import { URLQueryParserUtils } from '@sdp.nd/eb-utils'
const { auth } = URLQueryParserUtils.resolveQuery('auth')
```
