<div align="center">
 <h1>@aw-web-design / Theme</h1>
 <p>A practical theme generator built from the ground up, designed to be used alongside (@aw-web-design/styled-system & @aw-web-design/components) but this is not required</p>
</div>

[![Theme](https://circleci.com/gh/The-Code-Monkey/Theme/tree/master.svg?style=shield&circle-token=22e572410091d1a78fa01e2d2f2c7fc563602644)](https://app.circleci.com/pipelines/github/The-Code-Monkey/Theme)

## Installation

To install theme on your repo there are two things needed and one optional.


1. install via package manager `yarn add @aw-web-design/theme`


2. add this command to your package.json `orchard.generate`

    - The generate command supports multiple brand themes being built from the same repo no need for multiple. 
    - This can be done with the --brand [brand] | -b [brand] cli option, more info to come on this in the future.


3. optional add a custom config for theme. This is optional as there is a basic theme built in.

   - outputDir is where the outputted theme will be put relative to the command ran. e.g. process.cwd()

   - iconDir is for use with @aw-web-design/components and tells it which icon library to use, currently only feather icons is supported.

   - more options will be added in the future. 

   
Basic Config:

```json
{
  "outputDir": "/src/",
  "iconDir": "feather"
}
```

