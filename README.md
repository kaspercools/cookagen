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
