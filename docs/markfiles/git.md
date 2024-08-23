# GIT Hooks

## git command基本操作

### 初始化git

```shell
git init
```

### 克隆项目

```shell
git clone <url>

# 克隆指定分支
git clone -b <branch> <url>

# 例如
git clone https://github.com/git/git.git

git clone -b master https://github.com/git/git.git
```

### 查看本地/远程仓库分支

```shell
# 本地仓库所有分支
git branch

# 远程仓库所有分支
git branch -r

# 本地和远程所有分支
git branch -a
```

### 查看仓库状态

```shell
git status

# 例如：修改了vue.config.js
> git status

On branch guizhou-gb/develop-shiy-s
Your branch is up to date with 'origin/guizhou-gb/develop-shiy-s'.     

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   vue.config.js

no changes added to commit (use "git add" and/or "git commit -a")
```

### 暂存文件

```shell
# 暂存单个文件
git add <file>

# 暂存所有文件
git add .

# 暂存指定文件
git add <file1> <file2> <file3>
```

### 提交代码

*最常见的用法如下所示：如果没有 `-m` 参数，会进入 vi 编辑模式，然后写入提交信息，最后输入`:wq`保存并退出。*

- -m 提交信息
- -a 跳过add操作
- -am 跳过add操作简写
- --amend 修改提交信息

```shell
# 提交所有暂存文件，将进入vi 编辑器编辑提交信息
git commit

# 提交所有暂存文件，直接提交到本地仓库
git commit -m "commit message"

# 提交所有文件，不需要暂存文件直接提交到本地仓库
git commit -a -m "commit message"

# 提交指定文件
git commit -m "commit message" <file1> <file2> <file3>

# 跳过add 操作
git commit -am "commit message"

# 改写提交信息
git commit --amend -m "commit message"
```

### 查看当前分支提交记录

- -p：显示提交的补丁（具体更改内容）
- --oneline：以简洁的一行格式显示提交信息
- --graph：以图形化方式显示分支和合并历史
- --decorate：显示分支和标签指向的提交

```shell
git log
```

例如：

```shell
> git log
commit 48a61456da0af412f07684b0cdeb4bc085672cf2 (HEAD -> develop, origin/develop)
Author: StrugglingBirds <shiyanggreat@163.com>
Date:   Fri Feb 18 20:55:25 2022 +0800

    Update develop.yml

commit fa654a2ef67b8cdb6adaa183925a0e66a8201b9f
Author: StrugglingBirds <shiyanggreat@163.com>
Date:   Fri Feb 18 18:18:54 2022 +0800

    修改配置文件
```

### 从远程仓库拉取代码到本地仓库

- 可以跨分支拉取合并远程代码到本地仓库，git pull是git fetch + git merge的简写。
- origin [远程分支名]:[本地分支名]可省略（默认当前远程分支拉取到当前的本地分支）

```shell
git pull origin [远程分支名]:[本地分支名]
```

### 推送本地仓库到远程仓库

```shell
git push origin [远程分支名]:[本地分支名]
```

如果本地版本与远程版本有差异，但又要强制推送可以使用 --force 参数：

```shell
git push origin [远程分支名] --force
```

删除远程分支

```shell
git push origin --delete <branch name>
```

### 代码回滚

代码commit后，git会生成一个代码快照，且git会生成一个hash串即 commit id

#### git reset

```shell
# 回退到上一个版本
git reset --hard HEAD^

# 回退到指定版本
git reset --hard <commit id>
```

git reset通常用于撤销本地的提交或调整分支历史，特别是在需要清理历史或恢复到某个状态时。由于它可能修改或删除提交历史，因此在使用时需要特别谨慎。

#### git revert

```shell
git revert <commit id>
```

git revert 用于撤销一个或多个提交。 它会创建一个新的提交，该提交将撤销指定的提交，是指定提交的逆操作，并且保留其他提交记录。

[后端元宇宙【Git进阶命令-revert】](https://zhuanlan.zhihu.com/p/676266979)

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
