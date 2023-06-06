## 1. Git 下载

**官网：** https://git-scm.com/downloads

**官网速度较慢，腾讯软件中心就有，而且版本更新及时。**
https://pc.qq.com/detail/13/detail_22693.html



## 2. Git 安装

**双击安装包，一路下一步。**



## 3. 远程仓库配置

1. 远程仓库：github，国内码云，局域网自建git服务器

2. 操作步骤：（直接在远程仓库操作）
   1. **注册账户**
   2. **新建仓库**

3. 生成（配置）SSH

    1. **用户名**

       ```
       git config --global user.name "注册名"
       ```

    2. **邮箱**

       ```
       git config --global user.email "注册邮箱"
       ```

    3. **生成SSH（以有SSH可以跳过这一步）**

       ```
       ssh-keygen -t rsa -C "自己的邮箱"
       ```

    4. **SSH文件存放在C:/User/用户/.ssh下，id_rsa为私钥，id_rsa.pub为公钥。**

    5. **配置SSH**
   打开id_rsa.pub文件，全选，复制全文
   
   6. **粘贴从公钥文件中拷贝的key到远程仓库的公钥设置中**

   7. **测试SSH连接**

      ```
      ssh -T git@github.com
      ```

      按照提示输入yes，回车，提示successfully之类的就说明SSH连接正常，github上的钥匙也会变成绿色
   



## 4. 推送文件到远程仓库（图形界面篇）

1. **打开 git 操作界面**

   安装完成后，右键菜单会多两条Git操作功能
   ![img](http://ltdev.uxunsoft.com:4999/Public/Uploads/2019-07-30/5d3fb5b2cc02e.png)

   ### 打开Git GUI

   右键菜单点击Git GUI Here打开Git GUI界面
   ![img](http://ltdev.uxunsoft.com:4999/Public/Uploads/2019-07-30/5d3fb7eb2fc79.png)

   
   
2. **克隆远程仓库**  选择第二项

   ![img](http://ltdev.uxunsoft.com:4999/Public/Uploads/2019-07-30/5d3fb673835e5.png)

3. **填写url与本地路径**
   ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fb9c328355.png)

> git的地址由上面获取，点下面的小框后会复制到剪切板，可直接粘贴

![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fbde03f5c1.png)
> Target Directory会创建文件夹，如只填了hello，则会在打开Git GUI的目录下创建hello文件夹

4. **点击Clone**

   1. 克隆仓库
      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fbf86c6c06.png)
   2. 执行完后，会打开窗口
      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fbfb64ee84.png)
   3. 同时在选好的目录下会将git上的文件克隆下来
          ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fbfe10bc6e.png)

 5. **提交文件**
    1. 我们在文件夹下新建文件123.txt
       ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fd758a1967.png)
    2. 点下方的rescan按钮刷新
       ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fd7fbb5de5.png)
    3. 点击Stage Changed，将新增的文件提交到暂存区
       ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fd9f4641ee.png)
    4. 填写提交日志，用于记录本次代码提交的修改内容
     ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fda8d6d962.png)
    5. 点击Commit将变更提交到本地仓库
            ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fdaec77d1e.png)
6. 点击push将变更提交到远程仓库
        ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fdd2da5cb7.png)

> 上面可以选择提交分支

![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fde3609ed9.png)

 7. 成功提交，再来看远程仓库
    ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fdec28c079.png)

1. **修改文件**
         
       与提交一样的操作，我新弄了一个本地仓库，模拟一下多用户。修改123.txt文件

      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe0c679d33.png)

      > 点下方的rescan按钮刷新

   ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe1a4acc6a.png)

     其他步骤与上面一样即可。
      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe2428defb.png)
      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe22f3a3ff.png)

   6. **更新文件**
      
      > 从远程仓库拉取最新代码
      
      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3ffcb440262.png)
      > 拉取完后要merge，才能变更本地文件

      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3ffff5a468e.png)
      
    8. **提交时遇到冲突**

      接着回到hello1文件夹下，同样修改123.txt文件

      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe2b696c90.png)
      > 现在可看到在这个本地库中123.txt里的内容还是123.而远程仓库已经被改为321！我们改一下试试提交。

     改成12345，重复上面的提交操作

   

      ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe317b1572.png)

      > 修改后rescan刷新，提交到缓存区

   ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe36d71ddb.png)

   

      > 提交到本地仓库，都没有问题

     ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe3832172d.png)

      > 接着提交到远程仓库，发现提交失败了

     ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe3eb107b6.png)

      > 原因是远程仓库的版本已经从123的版本变更为321的版本。而你本地仓库是在123的版本操作的，你的这次提交是想将123的版本变为12345，与远程仓库的版本321不一致，无法进行本次提交。需先执行更新操作。

     ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3fe8dfaa0c8.png)
     ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d3ff47d7700d.png)

      > 此时merge，会发现报错

    ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d400e9dc83f5.png)
     ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d400eabe83da.png)
     ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d400f1ab7d20.png)

    

      > 这个时候，可以选择使用本地版本、或者使用远程仓库版本

    ![](http://ltdev.uxunsoft.com:4999/server/../Public/Uploads/2019-07-30/5d400f60961d9.png)

   



## 5. 推送文件到远程仓库（指令篇）

 1. 远程仓库已有内容时

    1. **clone远程至本地**

       ```
       git clone git@github.com:用户名/仓库名.git
       ```

    2. **clone远程至本地**

       ```
       git clone git@github.com:用户名/仓库名.git
       ```

    3. **修改拉取的文件**

    4. **add 添加到本地缓存**

       ```
       git add . 
       ```
       **也可单独添加某的文件**
       
       ```
       git add 文件名  
       ```

    5. **commit 添加注释**
    
       ```
       git commit -m “注释”
       ```
    
    6. **push 到远程仓库，这里默认 master 分支**
    
       ```
       git push -u origin master
       ```

2. 远程仓库为空时
   
   1. **本地创建仓库**
   
      ```
      mkdir 仓库名
      ```
   
   2. **进入仓库**
   
      ```
      cd 仓库名
      ```
   
   3. **初始化仓库**
   
      ```
      git init
      ```
   
   4. **添加 / 修改文件**
   
   5. **添加到缓存**
   
      ```
      git add .
      ```
   
   6. **添加注释**
   
      ```
      git commit -m "注释"
      ```
   
   7. **推到远程仓库**
   
      ```
      git push -u origin master
      ```
   
      

## 6. Git 指令

1. **分支操作**

   ```\
   git branch 分支名 创建分支
   
   git checkout -b 创建并切换到新建的分支上
   
   git checkout 分支名 切换分支
   
   git branch 查看分支列表
   
   git branch -v 查看所有分支的最后一次操作
   
   git branch -v 查看当前分支
   
   git branch -b 分支名 origin/分支名 创建远程分支到本地
   
   git branch --merged 查看别的分支和当前分支合并过的分支
   
   git branch --no-merged 查看未与当前分支合并的分支
   
   git branch -d 分支名 删除本地分支
   
   git branch -D 分支名 强行删除分支
   
   git branch origin :分支名 删除远处仓库分支
   
   git merge 分支名 合并分支到当前分支上
   ```

2. **暂存操作**

   ```
   git stash 暂存当前修改
   
   git stash apply 恢复最近的一次暂存
   
   git stash pop 恢复暂存并删除暂存记录
   
   git stash list 查看暂存列表
   
   git stash drop 暂存名(例：stash@{0}) 移除某次暂存
   
   git stash clear 清除暂存
   ```
   
3. **回退操作**

   ```
   git reset --hard HEAD^ 回退到上一个版本
   
   git reset --hard ahdhs1(commit_id) 回退到某个版本
   
   git checkout – file撤销修改的文件(如果文件加入到了暂存区，则回退到暂存区的，如果文件加入到了版本库，则还原至加入版本库之后的状态)
   git reset HEAD file 撤回暂存区的文件修改到工作区
   ```

4. **标签操作**

   ```
   git tag 标签名 添加标签(默认对当前版本)
   
   git tag 标签名 commit_id 对某一提交记录打标签
   
   git tag -a 标签名 -m ‘描述’ 创建新标签并增加备注
   
   git tag 列出所有标签列表
   
   git show 标签名 查看标签信息
   
   git tag -d 标签名 删除本地标签
   
   git push origin 标签名 推送标签到远程仓库
   
   git push origin --tags 推送所有标签到远程仓库
   
   git push origin :refs/tags/标签名 从远程仓库中删除标签
   ```

5. **其它操作 常规操作**

   ```
   git push origin test 推送本地分支到远程仓库
   
   git rm -r --cached 文件/文件夹名字 取消文件被版本控制
   
   git reflog 获取执行过的命令
   
   git log --graph 查看分支合并图
   
   git merge --no-ff -m ‘合并描述’ 分支名 不使用Fast forward方式合并，采用这种方式合并可以看到合并记录
   
   git check-ignore -v 文件名 查看忽略规则
   
   git add -f 文件名 强制将文件提交
   
   git创建项目仓库
   git init 初始化
   git remote add origin url 关联远程仓库
   git pull
   git fetch 获取远程仓库中所有的分支到本地
   ```

6. **忽略已加入到版本库中的文件**

   ```
   git update-index --assume-unchanged file 忽略单个文件
   git rm -r --cached 文件/文件夹名字 (. 忽略全部文件)
   ```

7. **取消忽略文件**

   ```
   git update-index --no-assume-unchanged file
   ```

8. **拉取、上传免密码**

   ```
   git config --global credential.helper store
   ```

9. 覆盖本地代码 

   ```
   git reset --hard origin/dev
   git fetch --all                               拉取所有更新，不同步
   
   git reset --hard origin/分支名     本地代码同步线上最新版本(会覆盖本地所有与远程仓库上同名的文件)
   
   git pull                                        再更新一次  针对第二步低概率未能完全覆盖的情况下，比如远程库有本地库
   ```

10. 选择某一版本

   ```ts
    git reset --hard  06d83efafa9c2b（版本号）
   ```

   



# 常用操作

获取远程分支变化

```shell
git fetch  ## 获取远程变化

git pull  ## 同步到本地

```

获取远程分支

```shell
git branch 分支名 origin/远程分支名		## 创建远程分支到本地

git branch dev_zoe origin/devzoe 		## 举例：在本地创建dev_zoe 分支
```

