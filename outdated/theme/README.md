<div align="center">
 <h1>@techstack / Theme</h1>
 <p>A practical theme generator built from the ground up, designed to be used alongside (@techstack/styled-system & @techstack/components) but this is not required</p>
</div>

## Installation

To install theme on your repo there are two things needed and one optional.


1. install via package manager `yarn add @techstack/theme`


2. add this command to your package.json `orchard.generate`

    - The generate command supports multiple brand themes being built from the same repo no need for multiple. 
    - This can be done with the --brand [brand] | -b [brand] cli option, more info to come on this in the future.


3. optional add a custom config for theme. This is optional as there is a basic theme built in.

   - outputDir is where the outputted theme will be put relative to the command ran. e.g. process.cwd()

   - iconDir is for use with @techstack/components and tells it which icon library to use, currently only feather icons is supported.

   - more options will be added in the future. 

   
Basic Config:

```json
{
  "outputDir": "/src/",
  "iconDir": "feather"
}
```

