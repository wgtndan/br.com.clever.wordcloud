/*
Copyright (c) 2015, Clever Anjos (clever@clever.com.br), Ralf Becher(irregular.bi)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
/*global define , window, Qv, jQuery, d3, $, document  */
define(["jquery", "js/qlik", "./d3.min", "./d3.layout.cloud", "./br.com.clever.wordcloud.support", "text!./styles.css"], function ($, qlik, d3) {
    'use strict';
    return {
        initialProperties: {
            version: 1.0,
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 2,
                    qHeight: 100
                }]
            }
        },
        //property panel
        definition: {
            type: "items",
            component: "accordion",
            items: {
                dimensions: {
                    uses: "dimensions",
                    min: 1,
                    max: 1
                },
                measures: {
                    uses: "measures",
                    min: 1,
                    max: 1
                },
                sorting: {
                    uses: "sorting"
                },
                addons: {
                    uses: "addons"
                },
                settings: {
                    uses: "settings",
                    items: {
                        wordCloudHeader: {
                            type: "items",
                            label: "Word Cloud Params",
                            items: {
                                Orientations: {
                                    ref: "Orientations",
                                    label: "Orientations",
                                    type: "number",
                                    defaultValue: 2,
                                    min: 2,
                                    max: 10
                                },
                                RadStart: {
                                    ref: "RadStart",
                                    label: "Start Angle",
                                    type: "number",
                                    defaultValue: -90,
                                    min: -90,
                                    max: 90
                                },
                                RadEnd: {
                                    ref: "RadEnd",
                                    label: "End Angle",
                                    type: "number",
                                    defaultValue: 90,
                                    min: -90,
                                    max: 90
                                },
                                MaxSize: {
                                    ref: "MaxSize",
                                    label: "Font Max Size",
                                    type: "integer",
                                    defaultValue: 100,
                                    min: 10,
                                    max: 200
                                },
                                MinSize: {
                                    ref: "MinSize",
                                    label: "Font Min Size",
                                    type: "integer",
                                    defaultValue: 20,
                                    min: 10,
                                    max: 200
                                },
                                WordPadding: {
                                    ref: "WordPadding",
                                    label: "Word Padding",
                                    type: "integer",
                                    defaultValue: 3,
                                    min: 1,
                                    max: 20
                                },
                                Scale: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Scale",
                                    ref: "Scale",
                                    options: [{
                                        value: "log",
                                        label: "Log"
                                        }, {
                                        value: "linear",
                                        label: "Linear"
                                    }],
                                    defaultValue: "linear"
                                },
                                MultiSelect: {
                                    type: "boolean",
                                    component: "switch",
                                    label: "Enable Multiple Selections on Wordcloud",
                                    ref: "multiselect",
                                    options: [{
                                        value: true,
                                        label: "On"
                                    }, {
                                        value: false,
                                        label: "Off"
                                    }],
                                    defaultValue: false
                                }
                            }
                        },
                        wordColorHeader: {
                            type: "items",
                            label: "Word Cloud Colors",
                            items: {
                                ColorMethod: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Color Method",
                                    ref: "ColorMethod",
                                    options: [{
                                        value: "ColorScale",
                                        label: "D3 Color Scale"
                                    }, {
                                        value: "ColorCustomRange",
                                        label: "Custom Color Range"
                                    }, {
                                        value: "ColorCustomSet",
                                        label: "4 Specific Colors"
                                    }],
                                defaultValue: "ColorScale"
                                },
                                ScaleColor: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Scale Color",
                                    ref: "ScaleColor",
                                    options: [{
                                        value: "category10",
                                        label: "category10"
                                        }, {
                                        value: "category20",
                                        label: "category20"
                                        }, {
                                        value: "category20b",
                                        label: "category20b"
                                        }, {
                                        value: "category20c",
                                        label: "category20c"
                                        }],
                                    defaultValue: "category20",
                                    show : function(data) {
                                        if (data.ColorMethod == "ColorScale") {
                                            return true;
                                        }
                                    }
                                },
                                customRangeFrom: {
                                    type: "string",
                                    expression: "none",
                                    label: "From",
                                    defaultValue: "#8c8c8c",
                                    ref: "colorFrom",
                                    show : function(data) {
                                        if (data.ColorMethod == "ColorCustomRange") {
                                            return true;
                                        }
                                    }
                                },
                                customRangeTo: {
                                    type: "string",
                                    expression: "none",
                                    label: "To",
                                    defaultValue: "#044d95",
                                    ref: "colorTo",
                                    show : function(data) {
                                        if (data.ColorMethod == "ColorCustomRange") {
                                            return true;
                                        }
                                    }
                                },
                                customColor1: {
                                    type: "string",
                                    expression: "none",
                                    label: "Color 1 (High Value)",
                                    defaultValue: "#ccff99",
                                    ref: "customColor1",
                                    show : function(data) {
                                        if (data.ColorMethod == "ColorCustomSet") {
                                            return true;
                                        }
                                    }
                                },
                                customColor2: {
                                    type: "string",
                                    expression: "none",
                                    label: "Color 2",
                                    defaultValue: "#80bfff",
                                    ref: "customColor2",
                                    show : function(data) {
                                        if (data.ColorMethod == "ColorCustomSet") {
                                            return true;
                                        }
                                    }
                                },
                                customColor3: {
                                    type: "string",
                                    expression: "none",
                                    label: "Color 3",
                                    defaultValue: "#ffb84d",
                                    ref: "customColor3",
                                    show : function(data) {
                                        if (data.ColorMethod == "ColorCustomSet") {
                                            return true;
                                        }
                                    }
                                },
                                customColor4: {
                                    type: "string",
                                    expression: "none",
                                    label: "Color 4 (Low Value)",
                                    defaultValue: "#eb99ff",
                                    ref: "customColor4",
                                    show : function(data) {
                                        if (data.ColorMethod == "ColorCustomSet") {
                                            return true;
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        },
        snapshot: {
            canTakeSnapshot: true
        },
        paint: function ($element, layout) {

            var id = "wordcloud_" + layout.qInfo.qId;
            var _this = this;

            $('<div />').attr("id", id)
                .width($element.width())
                .height($element.height())
                .appendTo($($element).empty());

            var words = {};
            // if(layout.ColorMethod == "expression"){
            //     words = layout.qHyperCube.qDataPages[0].qMatrix.map(function (row) {
            //         return {
            //             text: row[0].qText,
            //             value: row[1].qNum,
            //             label: row[1].qText,
            //             element: row[0].qElemNumber,
            //             color:
            //         };
            //     });
            // }else{
                words = layout.qHyperCube.qDataPages[0].qMatrix.map(function (row) {
                    return {
                        text: row[0].qText,
                        value: row[1].qNum,
                        label: row[1].qText,
                        element: row[0].qElemNumber
                    };
                });
            // }

            var app = qlik.currApp(this);
            app.getList("CurrentSelections", function (reply) {
                console.log('reply: ' + reply);
                var wordSelections = reply.qSelectionObject.qSelections.filter(function (e) {
                    return e.qField == layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
                });
                console.log('wordSelections: ' + wordSelections);
                var wordsSelected = [];
                if (wordSelections.length > 0) {
                    wordsSelected = wordSelections[0].qSelectedFieldSelectionInfo.map(function (e) {
                console.log('e.qName: ' +e.qName);
                        return e.qName;
                    });
                }
                console.log('wordsSelected: ' +wordsSelected);
            });

            var cloud = d3.wordcloud.id(id).width($element.width()).height($element.height()).customRandom(customRandom);
            cloud.go(words, layout, _this);
            // keep mouse cursor arrow instead of text select (auto)
            $("#" + id).css('cursor', 'default');

            /*
JavaScript random numbers with custom seed for fixed word cloud layout

Author: Michal Budzynski:
Source: http://michalbe.blogspot.de/2011/02/javascript-random-numbers-with-custom_23.html
*/
            function customRandom(nseed) {
                var seed,
                    constant = Math.pow(2, 13) + 1,
                    prime = 1987,
                    //any prime number, needed for calculations, 1987 is my favorite:)  
                    maximum = 1000;
                //maximum number needed for calculation the float precision of the numbers (10^n where n is number of digits after dot)  
                if (nseed) {
                    seed = nseed;
                }
                if (seed == null) {
                    //before you will correct me in this comparison, read Andrea Giammarchi's text about coercion http://goo.gl/N4jCB  
                    seed = (new Date()).getTime();
                    //if there is no seed, use timestamp     
                }
                return {
                    next: function () {
                        while (seed > constant) seed = seed / prime;
                        seed *= constant;
                        seed += prime;
                        var ret = seed % maximum / maximum;
                        return ret;
                    }
                }
            }
        }
    };
});