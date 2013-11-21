var path = require('path');

servers.Route.augment({
    initializeAssets: function(parent, app) {
        this.assets.vendor = this.assets.vendor || [];
        this.assets.vendor.push(require.resolve('../assets/js/json2'));
        this.assets.vendor.push(require.resolve('../assets/js/jquery.jscrollpane'));
        this.assets.vendor.push(require.resolve('../assets/js/jquery.mousewheel'));
        this.assets.vendor.push(require.resolve('../assets/js/mwheelIntent'));
        this.assets.vendor.push(require.resolve('../assets/js/hoverIntent'));
        this.assets.vendor.push(require.resolve('../assets/js/jquery.dropdown'));
        this.assets.vendor.push(require.resolve('../assets/js/jquery.dropdownPlain'));
        this.assets.vendor.push(require.resolve('../assets/js/jquery-ui'));
//        this.assets.vendor.push(require.resolve('../assets/js/jquery-ui-1.10.0.custom.min'));
        this.assets.vendor.push(require.resolve('f_underscore/f_underscore'));
        this.assets.vendor.push(require.resolve('../assets/js/socket.io'));
        this.assets.vendor.push(require.resolve('../assets/js/parsley'));
		this.assets.vendor.push(require.resolve('../assets/js/bootstrap.min'));
        parent.call(this, app);

    }
});

