'use strict';

process.exit(1);

//  @dep ifFunction
//  @dep bind

// --- 'nieuw' ones fit really well into final part of laat, by the way.

if (obj.speak) obj.speak();

whenOk__(bindTry(obj, 'speak'), invoke);

whenOk__(bindTry(obj, 'speak'), function (x) {
    return x();
});

bindTry(obj, 'speak') | whenOk(invoke);
whenBind(obj, 'speak') | invoke;
invokeWhenBind(obj, 'speak');
whenBindInvoke(obj, 'speak');
invokeIfCan(obj, 'speak');
whenCanInvoke(obj, 'speak'); // no

bindTry(obj, 'speak') | invokeIfOk;

if (undefined.parseFormData) formData = undefined.parseFormData(formData);
// first make immutable:

if (undefined.parseFormData) newFormData = undefined.parseFormData(formData);

// const newFormData = invokeIfCan (this, 'parseFormData', formData, ... else ??)

var newFormData_1 = bindTry(undefined, 'parseFormData') | ifOk(invoke, function () {
    return formData;
});

var newFormData_2 = [undefined, 'parseFormData'] | whenBind(invoke1(formData));

// nooo
// const newFormData = bindTry (this, 'parseFormData') | ifOk (
//     invoke,
//     < formData
// )

var newFormData_3 = bindTry(undefined, 'parseFormData') | invoke1IfOk(formData);

if (undefined.model) {
    undefined.model.set(undefined.serializeForm());
}

bindTry(undefined, 'model') | whenOk(function (it) {
    return it.set(undefined.serializeForm());
});

bindTry(undefined, 'model') | whenOk(dot1('set', undefined.serializeForm()));

/*
if (this.startupCallback) {
    this.startupCallback();
}

this.startupCallback
| ifOk (callOn (this))

this.startupCallback
| ifOk (call (this))

ifOk__ (
    this.startupCallback,
    f => f.call (this),
)

ifOk__ (
    this.startupCallback,
    callOn (this),
)

ifOk__ (
    this.startupCallback,
    call (this),
)

ifOk__ (
    this.startupCallback,
    bind (this) >> call,
)

this.startupCallback
| ifOk (f => f.call (this))

'startupCallback'
| ifHasOn (this, call)

'startupCallback'
| ifBind (this, call)

invokeIfHas (this, 'startupCallback')
invoke1IfHas (this, 'startupCallback', 10)

ifBind (this, 'startupCallback', call)

*/

/*
 * invokeIfCanElse
 * if (canBind
function getSelection() {
        let txt = (window.getSelection)
        ? window.getSelection()
        : document.selection.createRange().text;

}

function getSelection() {
    const txt = 'getSelection' | window | ifBind (
        invoke,
        () => document.selection.createRange().text,
    )

    const gebonden = bind (window, 'getSelection')
    const txt = gebonden | ifOk (
        invoke,
        () => document.selection.createRange().text,
    )

    const txt = gebonden | invokeIfOkElse (
        () => document.selection.createRange().text,
    )

    const txt = [window, 'getSelection'] | ifBind (
        invoke,
        () => document.selection.createRange().text,
    )

    const txt =
        bind (window, 'getSelection')
        | ifOk (
            invoke,
            () => document.selection.createRange().text,
        )

// have to decide whether bind fails or returns undefined.
// probably fails. (see bind hard test)
//

in racket, one-armed if is when.



		isValidPgn:function(pgn) {
		    var pattern = new RegExp(/^[\d]{8,9}$/g); // 8-9 digits

		    if (!pattern.test(pgn)) {
				return false;
			}

			var total = 0;
			pgn.split('').forEach(function(elem, index, array) {
		    	if (index === array.length - 1) {
		    		total += -1 * parseInt(elem);
		    	} else {
		    		total += (array.length - index) * parseInt(elem);
		    	}
			});

		    return total % 11 === 0; // 'elfproef'
		},
		serializeForm:function(){
			var $disabledFields = $("*[disabled]",this.el);
			$disabledFields.removeAttr("disabled");

			var formData = $('form',this.$el).serializeObject();

			$disabledFields.attr("disabled","disabled");

			if(this.parseFormData){
				formData = this.parseFormData(formData);
			}
			return formData;
		},

// --- flagsYes ('outSplit', 'sync')
const flagsYes = (...args) => args
    | map (x => [x, true])
    | fromPairs

// might need a form for cond with no target (see tests)

*/