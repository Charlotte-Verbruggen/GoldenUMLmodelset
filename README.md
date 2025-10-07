# GoldenUMLmodelset

The Golden UML modelset is a community-curated dataset of UML modelling cases that are used in IS modelling education. Each case consists of a description, a model solution and some metadata (name, language, domain).

Cases can be submitted via pull request or issues on Github, or via a [Google form](https://forms.gle/Y4QmXKC5DueQE9u99). 


## Dev Notes

### Generate plantUML Images

Download a compiled plantUML JAR from [here](https://plantuml.com/download).

Replace `<model>` with the name in the dataset and execute the following:
```
java -jar plantuml.jar dataset/<Model>/plantuml.txt
```


