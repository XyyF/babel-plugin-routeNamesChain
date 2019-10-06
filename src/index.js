export default function (babel) {
    const {types: t} = babel;
    return {
        name: 'elfin-routeNamesChain',
        visitor: {
            MemberExpression: {
                exit(path) {
                    if (!path.hub) return
                    const {file} = path.hub
                    const {node} = path
                    // 是以属性调用的形式使用 RouteNamesChain.xxx
                    if (!t.isIdentifier(path.node.object, {name: 'RouteNamesChain'})) return
                    let result = ''
                    const property = node.property
                    // 是否自定义了 RouteNamesChain 变量
                    if (file.scope.getBinding('RouteNamesChain') || !property) return
                    let preParent = null
                    let parent = path
                    // 要由大写字母开头
                    while (parent && t.isIdentifier(parent.node.property) && /^[A-Z].*/.test(parent.node.property.name)) {
                        result += `${parent.node.property.name}-`
                        preParent = parent
                        parent = parent.findParent((temp) => temp.isMemberExpression())
                    }
                    if (preParent) {
                        preParent.replaceWith(t.stringLiteral(result.slice(0, -1)))
                    }
                },
            },
        }
    };
}
