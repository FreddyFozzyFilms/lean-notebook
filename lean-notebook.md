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

# Integration With Node.js server
Once built using `npm run build` we can integrate it into the Node.js API using:

```javascript
app.use('/static', express.static(path.join(__dirname, 'public')))
```
https://expressjs.com/en/starter/static-files.html

# Code Mirror
Code mirror is used for the syntax highlighting within the code cells.
## Regex

# react-markdown
# Lean Compiler