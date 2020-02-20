#StackOverflow error search

Searches solutions on StackOverflow for uncought errors in javascript (currently only works in browsers)

###Install
```
npm i stackoverflow-error-search
```

###How to use
Import it in entry point of your project

###Methods
- `start` enables errors searching. By default listening is enabled
- `stop` disables errors searching
- `config` to customize searching
    - **pageSize**: how much records you want to see (**default {5}**)
    - **showEmpty**: show message even if there is no results (**default {true}**)
- `enabled` returns true if searching is enabled