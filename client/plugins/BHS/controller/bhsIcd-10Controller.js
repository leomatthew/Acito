Meteor.subscribe("section");
Meteor.subscribe("ICD");

Template.BHSICD.events({
	'click #saveSection': function () {
        if (!$('#sectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            Session.set('errorMessage', '');
            Meteor.call('insertSection', $('#sectionName').val());
        }
    },
    'click #addNewSection' : function () {
        $('#chooseSectionName').fadeIn(500);
    },
    'click #saveSection' : function () {
        $('#chooseSectionName').fadeOut(500);
    },
});


Template.BHSICD.helpers({
    'sectionList': function () {
        return section.find();
    },
});

Template.BHSICD.rendered = function () {
    $('#chooseSectionName').hide();
};