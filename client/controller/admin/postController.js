/*

 Created by LingaRaja.

 Has the events to redirect a new post page.

 */
Template.posts.events({
    'click #addNewPost': function () {
        $(location).attr('href','posts/add');
    },
    'click .post': function () {
        Session.set('selectedPostId', this._id);
        Router.go("/admin/posts/edit");
    },
    'click #searchPost' : function () {
        Meteor.call('searchPost',$('#queryString').val());
        Router.go("/admin/posts");        
    }
});

/*

 Created by LingaRaja.

 Has the functionality to add a new post and publish the post.

 */
Template.addNewPost.events({
    'click #savePost' : function () {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        Meteor.call('insertPostData',$('#postName').val(),$('#postContent').val(),tag,Meteor.users.findOne(Meteor.userId()).username);
        Router.go("/admin/posts");
    },
    'click #publishPost' : function () {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        Meteor.call('publishPostData',$('#postName').val(),$('#postContent').val(),tag,Meteor.users.findOne(Meteor.userId()).username);
        Router.go("/admin/posts");        
    },
    'click #updatePost' : function() {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        Meteor.call('updatePostData',Session.get('selectedPostId'),$('#postName').val(),$('#postContent').val(),tag,Meteor.users.findOne(Meteor.userId()).username);
        Router.go("/admin/posts");        
    },
    'click #moveBin' : function() {
        Meteor.call('binPostData',Session.get('selectedPostId')); 
        Router.go("/admin/posts");               
    },
    'click #restorePost' : function() {
        Meteor.call('unbinPostData',Session.get('selectedPostId'));
        Router.go("/admin/posts");
    },
    'click #removePost' : function() {
        Meteor.call('removePostData',Session.get('selectedPostId')); 
        Router.go("/admin/posts");               
    }
});


/*

 Created by LingaRaja.

 Has the heplper to find all the post published by the server.

 */
Meteor.subscribe("Posts");

Template.posts.helpers({
    'postList': function() {
        return Posts.find();
    },
    'queryString': function() {
        return $('#queryString').val();
    }
});

Template.addNewPost.helpers({
    'showSelectedPost': function(){
        return Posts.findOne(Session.get('selectedPostId'));
    }
});