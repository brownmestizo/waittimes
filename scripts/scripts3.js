
window.onload = function () {

    //Better to construct options first and then pass it as a parameter
    var options = {
        axisY:{
            title: "",
            tickLength: 0,
            lineThickness: 0,
            gridThickness: 0,
            margin: 0,
            valueFormatString:" ",
            maximum: 20,
        },        
        data: [              
        {
            type: "column",
            color: "#DADADA",
            dataPoints: [
                { label: "6:00",  y: 5  },
                { label: " ", y: 8  },
                { label: "8:00", y: 14  },
                { label: " ",  y: 18  },
                { label: "10:00",  y: 20  },
                 { label: " ",  y: 19  },
                { label: "12:00",  y: 18  },  
                { label: " ",  y: 17  },
                { label: "14:00",  y: 16  },
                { label: " ",  y: 14  },
                { label: "16:00",  y: 12  },
                { label: " ",  y: 11  },
                { label: "18:00",  y: 10  },
                { label: " ",  y: 9  },
                { label: "20:00",  y: 8  },
                { label: " ",  y: 7  },
                { label: "22:00",  y: 6  },
                { label: " ",  y: 5  },
                { label: "24:00",  y: 5  },
                { label: " ",  y: 5  },
                { label: "2:00",  y: 4  },
                { label: " ",  y: 3  },
                { label: "4:00",  y: 3  },      
            ]
        }
        ]
    };
    
    $("#chartContainer").CanvasJSChart(options);
    }
    