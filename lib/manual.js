"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var dot = exports.dot = function dot(prop) {
    return function (o) {
        return o[prop]();
    };
};

var dot1 = exports.dot1 = function dot1(prop) {
    return function (val) {
        return function (o) {
            return o[prop](val);
        };
    };
};
var dot2 = exports.dot2 = function dot2(prop) {
    return function (val1) {
        return function (val2) {
            return function (o) {
                return o[prop](val1, val2);
            };
        };
    };
};
var dot3 = exports.dot3 = function dot3(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (o) {
                    return o[prop](val1, val2, val3);
                };
            };
        };
    };
};
var dot4 = exports.dot4 = function dot4(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (o) {
                        return o[prop](val1, val2, val3, val4);
                    };
                };
            };
        };
    };
};
var dot5 = exports.dot5 = function dot5(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (val5) {
                        return function (o) {
                            return o[prop](val1, val2, val3, val4, val5);
                        };
                    };
                };
            };
        };
    };
};
var dotN = exports.dotN = function dotN(prop) {
    return function (vs) {
        return function (o) {
            return o[prop].apply(o, _toConsumableArray(vs));
        };
    };
};

var side = exports.side = function side(prop) {
    return function (o) {
        return dot(prop)(o), o;
    };
};
var side1 = exports.side1 = function side1(prop) {
    return function (val1) {
        return function (o) {
            return dot1(prop)(val1)(o), o;
        };
    };
};
var side2 = exports.side2 = function side2(prop) {
    return function (val1) {
        return function (val2) {
            return function (o) {
                return dot2(prop)(val1)(val2)(o), o;
            };
        };
    };
};
var side3 = exports.side3 = function side3(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (o) {
                    return dot3(prop)(val1)(val2)(val3)(o), o;
                };
            };
        };
    };
};
var side4 = exports.side4 = function side4(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (o) {
                        return dot4(prop)(val1)(val2)(val3)(val4)(o), o;
                    };
                };
            };
        };
    };
};
var side5 = exports.side5 = function side5(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (val5) {
                        return function (o) {
                            return dot5(prop)(val1)(val2)(val3)(val4)(val5)(o), o;
                        };
                    };
                };
            };
        };
    };
};

var sideN = exports.sideN = function sideN(prop) {
    return function (vs) {
        return function (o) {
            return dotN(prop)(vs)(o), o;
        };
    };
};

exports.default = {
    dot: dot, dot1: dot1, dot2: dot2, dot3: dot3, dot4: dot4, dot5: dot5, dotN: dotN,
    side: side, side1: side1, side2: side2, side3: side3, side4: side4, side5: side5, sideN: sideN
};