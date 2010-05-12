alloy.extend({
	uiSettings: {},
	uiSetup: function(settings) {
		alloy.uiSettings = alloy.extend(alloy.uiSettings, settings);
	}
});
alloy.theme = function(config) {
	alloy.uiSetup(config);
};
alloy.each(["2DMatrix", "3DMatrix", "activityIndicator", "alertDialog", "animation", "button", "buttonBar", "coverFlowView", 
			"emailDialog", "imageView", "label", "optionDialog", "picker", "pickerColumn", "pickerRow", "progressBar", "scrollView", 
			"scrollableView", "searchBar", "slider", "switch", "tab", "tabGroup", "tabbedBar", "tableView", "tableViewRow", "tableViewSection", 
			"textArea", "textField", "toolbar", "view", "webView", "window"], function(i, name, method) {
			
			method = "create"+alloy.ucFirst(name);
			alloy[name] = function(opts, defname) {
				defname = defname ? defname : name;
				var defaults = alloy.uiSettings[defname] || {},
					settings = alloy.extend({}, defaults, opts);
									
				switch (name) {
					case "button":
						return Ti.UI.createButton(settings);
					case "switch":
						return Ti.UI.createSwitch(settings);
					case "textField":
						return Ti.UI.createTextField(settings);
					case "imageView":
						return Ti.UI.createImageView(settings);
					default:
						return Ti.UI[method](settings);
				}
			};
});

