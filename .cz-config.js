/**自定义提示**/

module.exports = {
    types: [
        { value: 'feature', name: 'feature:  增加新功能' },
        { value: 'bug', name: 'bug:      测试反馈bug列表中的bug号' },
        { value: 'fix', name: 'fix:      修复bug' },
        { value: 'ui', name: 'ui:       更新UI' },
        { value: 'docs', name: 'docs:     文档变更' },
        { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
        { value: 'perf', name: 'perf:     性能优化' },
        {
            value: 'refactor',
            name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
        },
        { value: 'release', name: 'release:  发布' },
        { value: 'deploy', name: 'deploy:   部署' },
        { value: 'test', name: 'test:     增加测试' },
        {
            value: 'chore',
            name: 'chore:    构建过程或辅助工具的变动(更改配置文件)',
        },
        { value: 'revert', name: 'revert:   回退' },
        { value: 'build', name: 'build:    打包' },
        { value: 'other', name: 'other:    其他' },
    ],
    scopes: [],
    // override the messages, defaults are as follows
    messages: {
    type: "选择一种你的提交类型:",
    //scope: "选择一个scope (可选):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "简短说明(最多72个字):",
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue，例如：#12, #34(可选):\n",
     confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
    },
    allowCustomScopes: true,
    // skip any questions you want
    skipQuestions: ['scope','body','breaking', 'footer'],
    subjectLimit: 72,
};
