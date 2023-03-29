import path from 'path'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import cjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
export default[
    {
        input:"./src/core/index.ts",
        output:[
            {
                file:path.resolve(__dirname,'./dist/index.esm.js'),
                format:"es"
            },
            {
                file:path.resolve(__dirname,'./dist/index.cjs.js'),
                format:"cjs"
            },
            {
                file:path.resolve(__dirname,'./dist/index.js'),
                format:"umd",
                name:"xmzx-utils"
            },
        ],
        plugins:[
            ts(),
            cjs(),
           terser({compress:{drop_console:true}})
        ]
    },
    {
        //打包声明文件
        input:"./src/core/index.ts",
        output: {
            file:path.resolve(__dirname,'./dist/index.d.ts'),
            format:"es"
        },
        plugins: [(dts.default)()]
    } 
]