# br.com.clever.wordcloud
Qlik Sense Word Cloud extension
This extension intends to cover the need of including word clouds into Qlik Sense

![alt tag](https://cloud.githubusercontent.com/assets/9040310/5868637/8c9dc184-a293-11e4-8bfb-1308a1aa1fa9.PNG)

![Qlik Sense Word Cloud](WordCloudSelection.gif)

### Settings

**Dimensions:**

1. Word

**Measures:**

1. Word Count expression
2. Word Color expression (optional)

Example with these expressions:

**Word Count:**

```
Num(Count({1} [Word]),'0 occurences')
```

**Word Color:**
```
If(Count({1} [Word]) > 2, Green(), LightGray())
```


![Qlik Sense Word Cloud Coloring](WordColoring.png)
