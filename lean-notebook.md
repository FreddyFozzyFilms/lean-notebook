# Introduction
The aim of this project is to make formal proofs easier to read and develop.

More specifically, the goal of lean-notebook is to create a Jupyter Notebook like notebook system for writing formal proofs. This means means being able to split `.lean` files into multiple code and text cells.

# Rival efforts

## **Jupyter Notebook Kernels**


Jupyter Notebook already has a kernel for COq ([demo](https://mybinder.org/v2/gh/EugeneLoy/coq_jupyter_demo/master?filepath=demo.ipynb), [repo](https://github.com/EugeneLoy/coq_jupyter)). 

COq is notoriously hard to use, whereas lean is designed from the beginning to be much more mathematician friendly. But, there is no Jupyter notebook kernel for lean.

Putting that issue aside, there is an additional problem with Jupyter notebook itself.

Jupyter Notebook does cell by cell compiling. However, when we are writing formal proofs, we would like to be able to see the tactic state (list of proven stamements and goals) at each line or even each character of the proof.

## **leanprover in Observable**

Bryan Chen has used observable notebooks as a means for creating interactive formal proof papers.

The problem with his approach is that is very cumbersome to write the lean code. This is because lean is not a native language in observable notebook (which only knows javascript, html and markdown). So, everytime a new lean code cell is added the user has to code a javascript component.
https://observablehq.com/@bryangingechen/hello-lean-prover

The primary benefit of his benefit over ours is that *observable* has better built in markdown preview and has a plethora of data visualization features.

## **format_lean**

`format_lean` turns `.lean` files into beautiful html webpages. The problem with their approach is that it is too UI centric. The user has to click a button just to see the tactic state at a point in the proof. 


In addition, if there are multiple lines of code on a single line ex: `intro h, exact q, exact p,`
 the user would be unable to see their tactic states.


In short, it would be better if the user could get their hands dirty and go through the code themselves.


https://github.com/leanprover-community/format_lean
# Inspiration

Interestingly enough, our rivals are also the primary inspiration for this project. The principal stylistic inspiration is Jupyter Notebook, but Bryan Chen's observable project was the principal technical inspiration (more details in the code mirror section).

# Integration With Node.js server
Once built using `npm run build` we can integrate it into the Node.js API using:

```javascript
app.use('/static', express.static(path.join(__dirname, 'public')))
```
https://expressjs.com/en/starter/static-files.html

# Code Mirror
Code Mirror is a javascript API that provides beautiful syntax highlighting. For the lean-notebook, Code Mirror is used for the syntax highlighting within the lean code cells and markdown text cells.

The power in Code Mirror comes in its ability to create custom language modes. Languages modes are basically define how syntax highlighting behaves for different proggramming languages. 

Bryan Chen's observable notebook already defined a custom languge mode for `lean`. Additionally, `markdown` is already a builtin language mode for codemirror. This made the code cells very easy to create.

As, for the creation of code cell components in react, we simply forked from this [code repo](https://github.com/WebDevSimplified/React-CodePen-Clone) which uses the `react-codemirror2` npm package.

If you want to improve this project, it would suggested that you create a new react project (using `npx create-react-app`) in react version 16 or 17 and with the proper node version and then copy over this projects source code files. This project uses a version of node that is ahead of the `react-codemirror2` library, resulting in many potential vulnerabilities.
## Language Integration with react-codemirror2

The following [code snippet](https://observablehq.com/@bryangingechen/hello-lean-prover@5065#CMLeanMode) from Bryan Chen's observable notebook defines the lean language mode.

This code snippet is contained inside of the `leanMode.js` file, in which a CodeMirror object is created and then the lean language mode is added to that CodeMirror object using `.defineMode` and `.defineMime`. 

>`.defineMode` describes the funtionality of the leanmode syntax highlighting

> `.defineMime` supplies some additinal metadata.

CodeMirror is simply an API, it is the `react-codemirror2` library that actually provides you with `ControlledEditor` react components.

A sample `ControlledEditor` is shown below:
```jsx
<ControlledEditor
          onBeforeChange={(editor, data, value) => {}}
          onCursorActivity={(editor) => {}}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: 'lean',
            theme: 'material',
            lineNumbers: true
          }}

          resizable={false}
/>
```

The `mode` property of the `options` object specifies what language the `ControlledEditor` component is using. Notice that the value of `mode` is a string. This is because the `CodeMirror` API stores all of its language modes internally rather than having them passed in from above.
# Markdown Rendering
> [`react-markdown`](https://www.npmjs.com/package/react-markdown) along with extensions
[`remark-math`](https://www.npmjs.com/package/remark-math) and
[`rehype-katex`](https://www.npmjs.com/package/rehype-katex) are used to create markdown rendering of text-cells.

The following code snippet fromt the `react-markdown` documentation shows how the `remarkMath` and `rehypeKatex` plugins are used to render math equations in `ReactMarkdown` components:

```jsx
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

ReactDom.render(
  <ReactMarkdown
    children={`The lift coefficient ($C_L$) is a dimensionless coefficient.`}
    remarkPlugins={[remarkMath]}
    rehypePlugins={[rehypeKatex]}
  />,
  document.body
)
```
Notice that the remarkMath and rehypeKatex objects are passed from above rather than stored internally by some sort of API object. This is because `ReactMarkdown` is a standalone react component, unlike `react-codemirror2` which relies on the `CodeMirror` API.

# Lean Compiler

>The lean compiler is run on a server which the lean-notebook calls using an API POST request. 

>The leancompiler has actually been [dockerized](https://hub.docker.com/r/leanprovercommunity/mathlib) meaning that the leancompiler server side could be hosted on a cloud service such as [heroku](https://www.heroku.com/)

<br>
All code leading up to the users cursor position are stored in a leanfile which is then compiled. 
The resultant error logs are then parsed into a tactic state.

# Take Aways

## Tooling

Every time the user changes the cursor position, we have to send the entire notebook state (up to the cursor position) to the server. If we had some way of storing only the changes to the notebook state (up to the cursor), that would make the lean-notebook scale much better for larger notebooks.

There is actually a tools that does this for text-editors called [Quill](https://quilljs.com/docs/api/). If a similar API could be created for notebook systems that would not only streamline this project but also many others.

## Generalizations

As expressed in the **rivals** section, our main gripe with Jupyter notebook is that it compiles *cell* by *cell* instead of *char* by *char*.

Jupyter notebook is a *cell* by *cell* compiling notebook that allows you to create custom kernels tailored to various proggramming languages. Their kernels consist of a `custom code editor mode` and a `compiler`.

lean-notebook could be generalized into a *char* by *char* compiling notebook that allows you to create custom server-kernels tailored to different proggraming languages. Our server-kernel would consist of a `custom code editor mode` and a `server` (which takes a cursor position of file state as input and outputs some sort of tactic state).

We think that this notebook would be called **Mecyry Notebook**. Mecury is closer to the sun and hence shines brighter than Jupiter. Our notebook would be better than Jupyter notebook, meaning that it would shine brighter.