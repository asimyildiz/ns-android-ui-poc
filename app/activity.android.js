const frame = require("tns-core-modules/ui/frame");

const superProto = androidx.appcompat.app.AppCompatActivity.prototype;
androidx.appcompat.app.AppCompatActivity.extend("org.beIN.TVActivity", {
    onCreate: function(savedInstanceState) {
        // Set the isNativeScriptActivity in onCreate (as done in the original NativeScript activity code)
        // The JS constructor might not be called because the activity is created from Android.
        this.isNativeScriptActivity = true;
        if(!this._callbacks) {
            frame.setActivityCallbacks(this);
        }
        // Modules will take care of calling super.onCreate, do not call it here
        this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), superProto.onCreate);

        // Add custom initialization logic here
    },
    onSaveInstanceState: function(outState) {
        this._callbacks.onSaveInstanceState(this, outState, superProto.onSaveInstanceState);
    },
    onStart: function() {
        this._callbacks.onStart(this, superProto.onStart);
    },
    onStop: function() {
        if (this.highlightedElement) {
            this.highlightedElement.deletePseudoClass('focused');
        }
        this._callbacks.onStop(this, superProto.onStop);
    },
    onDestroy: function() {
        this._callbacks.onDestroy(this, superProto.onDestroy);
    },
    onBackPressed: function() {
        this._callbacks.onBackPressed(this, superProto.onBackPressed);
    },
    onRequestPermissionsResult: function (requestCode, permissions, grantResults) {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined);
    },
    onActivityResult: function (requestCode, resultCode, data) {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, _super.prototype.onActivityResult);
    },
    /**
     * listens dpad key clicks
     * @param {Object} event 
     */
    dispatchKeyEvent: function(event) {
        // let's highlight the element that currently has the focus
        const tnsButton = this.getCurrentFocus();
        let keyCode = event.getKeyCode();
        switch (keyCode) {
            case android.view.KeyEvent.KEYCODE_DPAD_DOWN:
            case android.view.KeyEvent.KEYCODE_DPAD_UP:
            case android.view.KeyEvent.KEYCODE_DPAD_RIGHT:
            case android.view.KeyEvent.KEYCODE_DPAD_LEFT:
                if (tnsButton) {
                    const currentView = tnsButton['jsview'];
                    if (this.highlightedElement) {
                        this.highlightedElement.deletePseudoClass('focused');
                    }
                    if (currentView && currentView !== this.highlightedElement) {
                        const emitter = tnsButton['emitter'];
                        if (emitter) {
                            // emit an event when focus changes
                            emitter();
                        }
                        currentView.addPseudoClass('focused');
                        currentView.android.setFocusable(true);
                        currentView.android.setFocusableInTouchMode(true);
                        this.highlightedElement = currentView;
                    }
                }
                break;
            case android.view.KeyEvent.KEYCODE_BACK:
                if (this.highlightedElement) {
                    this.highlightedElement.deletePseudoClass('focused');
                }
                break;
            case android.view.KeyEvent.KEYCODE_DPAD_CENTER:
                if (tnsButton) {
                    const hasClickVisibility = tnsButton['clickVisibility'];
                    if (hasClickVisibility && this.highlightedElement) {
                        this.highlightedElement.deletePseudoClass('focused');
                    }
                }
                break;
        }
        return superProto.dispatchKeyEvent.call(this, event);
    }
});
