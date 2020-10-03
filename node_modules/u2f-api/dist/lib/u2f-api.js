'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var generated_google_u2f_api_1 = require("./generated-google-u2f-api");
// Feature detection (yes really)
// For IE and Edge detection, see https://stackoverflow.com/questions/31757852#31757969
// and https://stackoverflow.com/questions/56360225#56361977
var isBrowser = (typeof navigator !== 'undefined') && !!navigator.userAgent;
var isSafari = isBrowser && navigator.userAgent.match(/Safari\//)
    && !navigator.userAgent.match(/Chrome\//);
var isEDGE = isBrowser && /(Edge\/)|(edg\/)/i.test(navigator.userAgent);
var isIE = isBrowser && /(MSIE 9|MSIE 10|rv:11.0)/i.test(navigator.userAgent);
var _backend = null;
function getBackend() {
    if (_backend)
        return _backend;
    var supportChecker = new Promise(function (resolve, reject) {
        function notSupported() {
            resolve({ u2f: null });
        }
        if (!isBrowser)
            return notSupported();
        if (isSafari)
            // Safari doesn't support U2F, and the Safari-FIDO-U2F
            // extension lacks full support (Multi-facet apps), so we
            // block it until proper support.
            return notSupported();
        var hasNativeSupport = (typeof window.u2f !== 'undefined') &&
            (typeof window.u2f.sign === 'function');
        if (hasNativeSupport)
            return resolve({ u2f: window.u2f });
        if (isEDGE || isIE)
            // We don't want to check for Google's extension hack on EDGE & IE
            // as it'll cause trouble (popups, etc)
            return notSupported();
        if (location.protocol === 'http:')
            // U2F isn't supported over http, only https
            return notSupported();
        if (typeof MessageChannel === 'undefined')
            // Unsupported browser, the chrome hack would throw
            return notSupported();
        // Test for google extension support
        generated_google_u2f_api_1.chromeApi.isSupported(function (ok) {
            if (ok)
                resolve({ u2f: generated_google_u2f_api_1.chromeApi });
            else
                notSupported();
        });
    })
        .then(function (response) {
        _backend = response.u2f ? supportChecker : null;
        return response;
    });
    return supportChecker;
}
exports.ErrorCodes = {
    OK: 0,
    OTHER_ERROR: 1,
    BAD_REQUEST: 2,
    CONFIGURATION_UNSUPPORTED: 3,
    DEVICE_INELIGIBLE: 4,
    TIMEOUT: 5
};
exports.ErrorNames = {
    "0": "OK",
    "1": "OTHER_ERROR",
    "2": "BAD_REQUEST",
    "3": "CONFIGURATION_UNSUPPORTED",
    "4": "DEVICE_INELIGIBLE",
    "5": "TIMEOUT"
};
function makeError(msg, err) {
    var code = err != null ? err.errorCode : 1; // Default to OTHER_ERROR
    var type = exports.ErrorNames[('' + code)];
    var error = new Error(msg);
    error.metaData = { type: type, code: code };
    return error;
}
function isSupported() {
    return getBackend()
        .then(function (backend) { return !!backend.u2f; });
}
exports.isSupported = isSupported;
function _ensureSupport(backend) {
    if (!backend.u2f) {
        if (location.protocol === 'http:')
            throw new Error("U2F isn't supported over http, only https");
        throw new Error("U2F not supported");
    }
}
function ensureSupport() {
    return getBackend()
        .then(_ensureSupport);
}
exports.ensureSupport = ensureSupport;
function arrayify(value) {
    if (value != null && Array.isArray(value))
        return value;
    return value == null
        ? []
        : Array.isArray(value)
            ? value.slice() : [value];
}
function register(registerRequests, signRequests, timeout) {
    var _registerRequests = arrayify(registerRequests);
    if (typeof signRequests === 'number' && typeof timeout === 'undefined') {
        timeout = signRequests;
        signRequests = [];
    }
    var _signRequests = arrayify(signRequests);
    return getBackend()
        .then(function (backend) {
        _ensureSupport(backend);
        var u2f = backend.u2f;
        return new Promise(function (resolve, reject) {
            function callback(response) {
                if (response.errorCode)
                    reject(makeError("Registration failed", response));
                else {
                    delete response.errorCode;
                    resolve(response);
                }
            }
            var appId = _registerRequests[0].appId;
            u2f.register(appId, _registerRequests, _signRequests, callback, timeout);
        });
    });
}
exports.register = register;
function sign(signRequests, timeout) {
    var _signRequests = arrayify(signRequests);
    return getBackend()
        .then(function (backend) {
        _ensureSupport(backend);
        var u2f = backend.u2f;
        return new Promise(function (resolve, reject) {
            var _a;
            function callback(response) {
                if (response.errorCode)
                    reject(makeError("Sign failed", response));
                else {
                    delete response.errorCode;
                    resolve(response);
                }
            }
            var appId = _signRequests[0].appId;
            var challenge = _signRequests[0].challenge;
            var registeredKeys = (_a = []).concat.apply(_a, _signRequests
                .map(function (_a) {
                var version = _a.version, keyHandle = _a.keyHandle, appId = _a.appId;
                return arrayify(keyHandle)
                    .map(function (keyHandle) {
                    return ({ version: version, keyHandle: keyHandle, appId: appId });
                });
            }));
            u2f.sign(appId, challenge, registeredKeys, callback, timeout);
        });
    });
}
exports.sign = sign;
//# sourceMappingURL=u2f-api.js.map