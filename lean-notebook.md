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
## Regex

# react-markdown
# Lean Compiler