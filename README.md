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

Example with these expressions:

*Word Count:*

```
Num(Count({1} [Word]),'0 occurences')
```

**Word Cloud Params:**

*Orientations*

The number of orientations that should be utilised for display. Has a minimum of two, if only a single orientation is required then set the Start and End angle values to the same 

*Start Angle*

The lowest angle of text to be utilised in the range

*End Angle*

The highest angle of text to be utilised in the range

*Font Max Size*

The highest text size to be utilised in the range, typically for the highest value

*Font Min Size*

The lowest text size to be utilised in the range, typically for the lowest value

*Word Padding*

The space between words, can help to clarify the visulisation

*Scale*

The scaling method of the visualisation

*Enable Multiple Selections*

A switch to enable multiple selections for filtering purposes when On. If Off then selections on the Field are replaced, rather than additional to existing selections for that Field.

**Word Cloud Colors**

*Color Method*
Different colouring methods are available:
1. D3 Color Scale - Use a predefined D3 Coloring Scale
1. Custom Color Range - Define two colors to act as a range based upon your measure
1. 4 Specific Colors - A set of 4 colors can be defined with values from high (Color 1) to low (Color 4)

**Still To Do**

- Bring back functionality for Expression based colouring

