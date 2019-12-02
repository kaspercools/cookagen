# COOKAGEN - A quick and dirty code generator

## First time usage
run the following commands to get started on your local environment:
``` 
    npm i
    npm run build
    // Run following command to install cookagen globally
    npm install -g 
```

If used globally you can run the command from any directory in any type of project. You simply need to provide a `cookagen.json` file which contains the environment settings.

## COOKAGEN Config
The **cookagen** config needs to contain atleast the following keys:
```
{
    "templateFolder": ".templates"
    "generators": []
}
```

## Template Folder
The Template folder parameter is a relative path definition in respect to the cookagen.json file.

## Generators
To add a generator you need to define at least the following key attributes:

```
{
    "cmd": "domain",
    "alias": "d",
    "targetFolder": "LegalRegister.Domain",
    "templateRoot": "domain",
    "templates": [
        {
            "file": "entity.tpl",
            "resFile": "{{$ENTITY}}"
        }
    ],
    "ext": "cs",
    "parseList": [
        {
            "val": "entity",
            "match": "$ENTITY"
        }
    ]
}
```

| Property     | Value                                                                                        |
|--------------|----------------------------------------------------------------------------------------------|
| cmd          | The command you wish to use to call this generator                                           |
| alias        | The alias you want to create for this generator                                              |
| targetFolder | The target folder where the generated files need to be saved                                 |
| templateRoot | The root folder for this particular generator (a folder within given templateFolder)         |
| templates    | { "file":"entity.tpl", "resFile": "{{$ENTITY}}" }  [more info in the template section](#templates)                                          |
| ext          | The file suffix (extension) that needs to be used ( you can use any file extension you like) |
| parseList    | [{"val":"entity", "match":"$ENTITY"}] [more info in the ParseList section](#parselist)                                                        |
### Templates

| Property | Value                                                               |
|----------|---------------------------------------------------------------------|
| file     | The name of the template file (relative to the tempalteRoot folder) |
| resFile  | Name of the resulting file                                          |

### ParseList

The parselist itself lists all possible input variables (command line arguments) that can be processed. 

| Property | Value                                                               |
|----------|---------------------------------------------------------------------|
| val     | The value that will be injected in the matching placeholder |
| match  | A placeholder referenced in your tpl files                                          |
