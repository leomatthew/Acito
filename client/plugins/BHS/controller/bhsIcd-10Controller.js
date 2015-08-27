Meteor.subscribe("section");
Meteor.subscribe("ICD");

var select_data = [];

Template.BHSICD.events({
	'click #saveSection': function () {
        if (!$('#sectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            $('#minimizeAddNewSection').hide();
            $('#addNewSection').show();
            $('#chooseSectionName').fadeOut(500);
            Session.set('errorMessage', '');
            var sectionCode = (!$('#sectionCode').val() ) ? "-" : $('#sectionCode').val();
            var capitalizedSectionCode = sectionCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            var secName = $('#sectionName').val();
            var capitalizedSection = secName.replace(/^[a-z]/, function(m){ return m.toUpperCase() });   
            Meteor.call('insertSection', capitalizedSection,capitalizedSectionCode,"ICD");
            Session.set('BHSSuccessMessage', 'Section '+ $('#sectionName').val() + ' successfully saved');            
            $('#sectionName').val("");
            $('#sectionCode').val("");
            $('#sectionName').attr('placeholder','Section');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage',''),Session.set('BHSSuccessMessage','')
        }, 2000);	        
    },
    'click #addNewSection' : function () {
        $('#addNewSection').hide();
        $('#minimizeAddNewSection').show();
        $('#chooseSectionName').fadeIn(500);
    },
    'click #minimizeAddNewSection' : function () {
        $('#minimizeAddNewSection').hide();
        $('#addNewSection').show();
        $('#chooseSectionName').fadeOut(500);
        $('#sectionName').val("");
        $('#sectionName').attr('placeholder','Section');
        $('#sectionCode').val("");
        $('#sectionCode').attr('placeholder','Code');                   
    },
    'click #cancelSection' : function () {
        $('#minimizeAddNewSection').hide();
        $('#addNewSection').show();
        $('#chooseSectionName').fadeOut(500);
        $('#sectionName').val("");
        $('#sectionName').attr('placeholder','Section');
        $('#sectionCode').val("");
        $('#sectionCode').attr('placeholder','Code');                     
    },
    'click #saveCurrentICDPost': function () {
    	var sectionName = $('#sectionList :selected').text();
		var sectionId = $('#sectionList').val();    	
    	var icdCode = $('#ICDCode').val();
        var capitalizedIcdCode = icdCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
    	var ICDDetail = $('#ICDDetail').val();
        var capitalizedIcdDetail = ICDDetail.replace(/^[a-z]/, function(m){ return m.toUpperCase() });

		if (sectionName == "Select") {
			Session.set('errorMessage','Please select section');
		} else if(!icdCode) {
			Session.set('errorMessage','ICD Code is Required');
		} else if(!ICDDetail) {
			Session.set('errorMessage','ICD Detail is Required');
		} else {
            $('#cancelCurrentICDPost').hide()
			Meteor.call('insertICD',sectionName,sectionId,capitalizedIcdCode,capitalizedIcdDetail,Session.get('currentICDid'));
            if (Session.get('currentICDid')) {
                Session.set('BHSSuccessMessage', 'ICD '+ icdCode + ' successfully updated');               
            } else {
                Session.set('BHSSuccessMessage', 'ICD '+ icdCode + ' successfully saved');
            }            
            Meteor.setTimeout(function () {
                Session.set('BHSSuccessMessage', ''),Session.set('currentICDid',''),$('#sectionList').val("Select"),
                $('#ICDCode').val(""),$('#ICDDetail').val(""),$('#ICDCode').attr('placeholder',"ICD Code"),$('#ICDDetail').attr("placeholder",'Detail')
            }, 2600);			
		}
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);		
    },
    'click .ICD-data-row' : function () {
    	Session.set('currentICDid',this._id);
    },
    'click #cancelCurrentICDPost' : function () {
    	Session.set('currentICDid','');
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
        Meteor.call('removeSelectIcd', select_data, $('#actiondropdown').text());
    },
});


Template.BHSICD.helpers({
    'sectionList': function () {
        return section.find({type:"ICD"});
    },
    'ICDList': function() {
    	return ICD.find();
    },
    'selectedICD' : function () {
    	return ICD.findOne(Session.get('currentICDid'));    	
    },
    'noResult' : function () {
        if (ICD.find().count() == 0) {
            
        }
    }
});


Template.BHSICD.rendered = function () {
    $('#minimizeAddNewSection').hide();
    $('#chooseSectionName').hide();
};
