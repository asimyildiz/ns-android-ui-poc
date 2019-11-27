class NavigationHelper {

    static findRule(screenName, widgetName, activeWidgetName, key) {
        return NavigationHelper.rules[screenName] && NavigationHelper.rules[screenName][widgetName || screenName] 
            && NavigationHelper.rules[screenName][widgetName || screenName][activeWidgetName];
    }    

    static applyRule(screenName, widgetName, activeWidget) {
        if (screenName && widgetName && activeWidget && activeWidget.id) {
            const rule = NavigationHelper.findRule(screenName, widgetName, activeWidget.id);
            if (rule) {
                rule["down"] && (activeWidget.android.nextFocusDown = rule["down"]);
                rule["up"] && (activeWidget.android.nextFocusUp = rule["up"]);
                rule["left"] && (activeWidget.android.nextFocusLeft = rule["left"]);
                rule["right"] && (activeWidget.android.nextFocusRight = rule["right"]);
            }
        }                
    }
    
    static createNavigationRules() {
        NavigationHelper.rules = {
            "home": {
                "menu": {
                    "search": {
                        "down": "home",                        
                        "right": "home_list"
                    }
                },
                "home": {
                    "home_list": {                        
                        "left": "home"
                    },
                    "movie_list": {
                        "left": "movie"
                    }
                }
            },            
        };
    }
}

export default NavigationHelper;
