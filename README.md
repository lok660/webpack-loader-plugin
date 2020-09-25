# webpack-loader-plugin
write self loader and plugin

![img](https://user-gold-cdn.xitu.io/2019/8/1/16c4b3417efc25c2?imageslim)



## webpack基本流程

1. `webpack` 在拿到配置文件后，将文件的配置传给一个 `Compiler` 对象，由这个对象 `run` 来处理对应的打包逻辑
2. `Compiler` 主要做的就是两件事，**递归创建依赖关系** 和 **生成打包后的文件**
3. 在创建依赖关系的过程中，需要将模块的源码转成 ast，然后再遍历这个 ast node, 在遍历的过程中修改源码，最后再生成源码返回，此时返回的是一个修改过后的模板，用 `ejs` 渲染
4. 模板本身就是 IIFE(立即执行函数)，也就是一个闭包，它通过这个函数去递归的执行对应模块的源码，直到最后输出结果
5. 在解析 `loader` ，越靠后的越先执行。`loader` 本质上也是解析对应的 `loader` 源码执行的产物，不同的地方在于**`loader`中的参数即源码 `source` 是一个接着一个传递下去的**，即 `loader` 之间是有一个传承的关系，他们的参数是相关联的。所以 `loader` 作为加载器，它的目的就是 **加载代码 -> 修改代码 -> 执行代码**
6. 在解析 `plugin` 时，本质上就是通过 `webpack` 暴露出来的事件，`plugin` 监听这些事件，在截获到这些事件的时候就可以做事情了。主要利用了**发布订阅**这样的一种设计模式



## loader

`loader` 一个最基本的认识就是 `loader` 就是一个 **函数**，一旦有模块被 `import` 或者 `require` 时它就会去拦截这些模块的源码，对其进行改造，然后输出到另一个模块中，循环往复，最终迭代到入口文件中，形成最终的代码
所以它的本质在于对代码的 **拼凑** 和 **转换**，其中用的比较多的库是 `loaderUtils`，这个工具库在写 `loader` 时必用，需要注意。





[Webpack 源码研究]: https://juejin.im/post/6844903903675285511#heading-7
[Webpack源码探究打包流程，萌新也能看懂]: https://juejin.im/post/6844903728735059976#heading-9
[tapable简单实现]: https://github.com/zgfang1993/blog/issues/41

