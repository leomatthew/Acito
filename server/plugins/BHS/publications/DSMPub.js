Meteor.publish('DSM', function () {
  return DSM.find();
});

Meteor.methods({
    'insertDSM': function (secId,secName,subSecId,subSecName,dsmCode,dsmDetail,currentId) {
        if (typeof DSM.findOne(currentId) === "object") {
        	DSM.update(currentId,{$set:{sectionId: secId,sectionName: secName,subSectionId: subSecId,subSectionName: subSecName,DSMCode: dsmCode,DSMDetail: dsmDetail}});        	
        	console.log('DSM ' + dsmCode + ' updated successfully');    	
        } else {
        	DSM.insert({sectionId: secId,sectionName: secName,subSectionId: subSecId,subSectionName: subSecName,DSMCode: dsmCode,DSMDetail: dsmDetail});
	        console.log('DSM ' + dsmCode + ' added successfully');        	
        }
    }
});