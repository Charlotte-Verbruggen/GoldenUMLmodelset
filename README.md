# GoldenUMLmodelset

The Golden UML modelset is a community-curated dataset of UML modelling exercises that are used in IS modelling education. Each exercise consists of a description, a model solution and some metadata (name, language, domain).

Exercises can be submitted via ... . The submission should at least include the following files:
- A .txt or .md file with the description,
- A .txt or .md file with the metadata,
- A file with the model solution. Supported formats are: an .md file with the model in Mermaid/PlantUML notation, CD4A

Optionally, extra material can be included such as explanation of the model solution, alternative solutions (with explanations), feedback, incorrect solutions (with explanations), runnables or generated applications / corresponding software, corresponding exercises/MC questions ...

After submission, the models is transformed into the other supported formats and the exercise is reviewed by a community member before it is published as part of the dataset.

Supported transformations:
- Mermaid <-> PlantUML
- Mermaid <-> CD4A


## Dev Notes

### Generate plantUML Images

Download a compiled plantUML JAR from [here](https://plantuml.com/download).

Replace `<model>` with the name in the dataset and execute the following:
```
java -jar plantuml.jar dataset/<Model>/plantuml.txt
```


