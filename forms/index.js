//import in caolan forms
const forms = require('forms');
//const { widgets } = require('forms/lib/forms');

//create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

const bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};



//create a function that will
//create a forms object
const createProductForm = (categories,tags) => {
    //the object in the parameter
    //is the form definition
    return forms.create({
        'name':fields.string({
            required:true,
            errorAfterField:true

        }),
        'cost':fields.string({
            required:true,
            errorAfterField:true,
            validators:[validators.min(0),validators.integer()]
        }),
        'description':fields.string({
            required:true,
            errorAfterField:true
        }),
        'location':fields.string({
            required:true,
            errorAfterField:true
        }),
        'category_id':fields.string({
            label:'Category',
            required:true,
            errorAfterField:true,
            widget:widgets.select(),// use the checkbox
            choices: categories
        }),
        'tags':fields.string({
            required:true,
            errorAfterField:true,
            widget:widgets.multipleSelect(),// use the checkbox
            choices: tags

        }),
        'image_url':fields.string({
            widget:widgets.hidden()
        })



    })
}

const createRegistrationForm = () => {
    return forms.create({
        'username': fields.string({
            required: true,
            errorAfterField: true,

            cssClasses: {
                label: ['form-label']
            }
        }),
        'email': fields.email({
            widget:widgets.email(),
            required: true,
            errorAfterField: true,
            validators:[validators.email()],
            cssClasses: {
                label: ['form-label']
            }
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'confirm_password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            validators: [validators.matchField('password'),validators.minlength(8),]
        })
    })
}

const createLoginForm = () => {
    return forms.create({
        'email':fields.string({
            widget:widgets.email(),
            required:true,
            errorAfterField:true,
            validators:[validators.email()]
        }),
        
        
       
        'password': fields.password({
            required: true,
            errorAfterField: true
            //cssClasses: {label: ['form-label']}
        })
    })
    
}
const createSearchForm = function(categories,tags){
  return forms.create({
    'name':fields.string({
        required: false,
        errorAfterField:true
    }),
    'category_id':fields.string({
        required:false,
        errorAfterField:true,
        widget:widgets.select(),
        choices:categories
    }),
    'tags':fields.string({
        required:false,
        errorAfterField:true,
        widget:widgets.multipleSelect(),
        choices:tags
    })
    
    // }),
    // 'min_cost':fields.number({
    //     required:false,
    //     errorAfterField:true,
    //     widget:widgets.number()
    // }),
    // 'max_cost':fields.number({
    //     required:false,
    //     errorAfterField:true,
    //     widget:widgets.number()

    // })
  })
}

//exports
module.exports = {createProductForm,createRegistrationForm,createLoginForm,createSearchForm,bootstrapField};