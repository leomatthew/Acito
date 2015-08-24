Meteor.subscribe("codingRules");

var select_data = [];

Template.BHSCodingRules.events({
	'click #saveCurrentCodingRules' : function() {
		var code = $('#codingRulesCode').val();
		var guideline = $('#codingRulesGuideline').val();
		var definition = $('#codingRulesDefinition').val();
			if(!code) {
				Session.set('errorMessage','Code Reference is Required');
			} else if(!guideline) {
				Session.set('errorMessage','Coding and Documentation Guideline is Required');
			} else if (!definition) {
				Session.set('errorMessage','Coding and Guideline Definition is Required');
			} else {
				Meteor.call('insertCodingRules', code, guideline, definition, Session.get('currentCodingRulesid'));
				Session.set('BHSSuccessMessage', 'CodeRules Successfully Saved');
				Meteor.setTimeout(function () {
	                Session.set('BHSSuccessMessage', ''),$('#codingRulesCode').val(""),$('#codingRulesGuideline').val(""),
	                $('#codingRulesDefinition').val(""), Session.set('currentCodingRulesid','');
            	}, 2000);  
			}
			Meteor.setTimeout(function () {
            	Session.set('errorMessage','')
        	}, 2000);
	},
	'click .CodingRules-data-row' : function() {
		Session.set('currentCodingRulesid',this._id);
	},
	'click .cancelCurrentId' : function () {
    	Session.set('currentCodingRulesid','');
    },
    'click .menuitem2': function (event) {
        $('#actiondropdown').text($(event.target).text());
    },
    'click #checkbox': function (event) {
        var selectcheck = event.target.checked;
        if (selectcheck == true) {
            select_data.push(this._id);
        } else {
            var index = select_data.indexOf(this._id);
            select_data.splice(index, 1);
        }
    },
    'click #apply': function () {
        Meteor.call('removeSelectCodingRules', select_data, $('#actiondropdown').text());
    },
    // 'click .next' : function() {
    // 	if(Session.get('codingRulesCount')>3){
	   // 		Session.set('numberOfCount',Session.get('numberOfCount')+3);
   	// 	}
    // },
    // 'click .previous' : function() {
    // 		Session.set('numberOfCount',Session.get('numberOfCount')-3);
    // },
});

Template.BHSCodingRules.helpers({
	'codingRulesList': function () {
        return codingRules.find({});
    },
    'selectedCodingRules' : function () {
    	return codingRules.findOne(Session.get('currentCodingRulesid'));        
    },
   //  'codingRulesLimit' : function() {
   //  	return codingRules.find({},{limit: Session.get('numberOfCount')});
   //  },
   //  'codingRulesCount' : function() {
   //    Session.set('codingRulesCount',codingRules.find().count());
   // }
});

Template.BHSCodingRules.rendered = function () {
	// Session.set('numberOfCount', 3);
}

Template.adminTop.helpers({
	'BHSErrorMsg' : function() {
		return Session.get('errorMessage');
	},
	'BHSSuccessMessage' : function() {
		return Session.get('BHSSuccessMessage');		
	}
});