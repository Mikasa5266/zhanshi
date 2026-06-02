# 合作客户 Logo 资源说明

生成时间：2026-06-02（Asia/Shanghai）

## 目录

- `/partners/logos/`：正式用于页面展示的 logo 文件。
- `/partners/partners.json`：合作客户清单，包含中文名、英文名、分组、特色信息、logo 路径、来源与可信度。
- `/partners/logos-preview.png`：当前 logo 文件预览图。
- `/partners/_candidates/`：检索/下载过程中的候选资源，便于后续替换核查。

## logoConfidence 含义

- `official`：官网公开 logo，可直接优先使用。
- `official-related`：官网公开相关体系标识，非客户独立站标。
- `group`：未找到客户独立公开 logo，使用上级集团官方标识。
- `official-likely`：公开官网标识，机构对应关系需业务侧再确认。
- `text-fallback`：未找到稳定公开 logo，已生成文字占位，建议向客户获取正式授权 logo。

## 使用建议

前端可直接读取 `/partners/partners.json`，按 `category` 分组展示：

- `military-research`：军工/科研用户
- `testing-agency`：测评机构
- `enterprise`：企业用户

正式上线前，建议业务侧优先替换 `text-fallback` 和 `group` 项，尤其是研究所、地方测评中心这类公开独立 logo 不稳定或不可见的客户。
