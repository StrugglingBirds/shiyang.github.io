# GIT

## git command

### 克隆项目

```shell
git clone <url>
```

## git hook

### 提交工作流钩子

#### [pre-commit](#pre-commit-1)

钩子在键入提交信息前运行。 它用于检查即将提交的快照，例如，检查是否有所遗漏，确保测试运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 git commit --no-verify 来绕过这个环节。 你可以利用该钩子，来检查代码风格是否一致（运行类似 lint 的程序）、尾随空白字符是否存在（自带的钩子就是这么做的），或新方法的文档是否适当。

#### [prepare-commit-msg](#prepare-commit-msg)

钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所看到的默认信息。 该钩子接收一些选项：存有当前提交信息的文件的路径、提交类型和修补提交的提交的 SHA-1 校验。 它对一般的提交来说并没有什么用；然而对那些会自动产生默认信息的提交，如提交信息模板、合并提交、压缩提交和修订提交等非常实用。 你可以结合提交模板来使用它，动态地插入信息。

#### [commit-msg](#commit-msg)

钩子接收一个参数，此参数即上文提到的，存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。 在本章的最后一节，我们将展示如何使用该钩子来核对提交信息是否遵循指定的模板。

#### [post-commit](#post-commit)

钩子在整个提交过程完成后运行。 它不接收任何参数，但你可以很容易地通过运行 git log -1 HEAD 来获得最后一次的提交信息。 该钩子一般用于通知之类的事情。

### 钩子安装

第一步：在项目目录下执行：

```shell
git init
```  

第二步：打开.git/hooks/

```shell
cd .git/hooks
```

第三步：将.git/hooks/pre-commit.sample样例文件改为.git/hooks/pre-commit即可生效

### 钩子使用

#### #pre-commit

(此钩子中可以获取到提交的代码文件列表及对比提交的代码内容)

```javascript
// node
const { execSync } = require('child_process')

// 执行git命令，获取提交列表
const stagedFile = execSync('git diff --cached --name-only', {encoding: 'utf-8'}) // 返回字符串

// 以换行符切字符串转为提交的文件数组列表
const commitFiles = stagedFile.split('\n').filter(filepath => filepath)
```
