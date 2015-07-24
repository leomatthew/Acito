//Generated by S.Leo Matthew
//using "orion generate routes"

Router.route('/admin', function () {
  this.render('adminLogin');
});
Router.route('/admin/dashboard', function() {
  this.render('dashBoard');
});
Router.route('/admin/posts', function() {
  this.render('posts');
});
Router.route('/admin/pages', function() {
    this.render('pages');
});

Router.route('/admin/media', function() {
    this.render('media');
});
Router.route('/admin/posts/add', function () {
    this.render('addNewPost');
});

Router.route('/admin/posts/add_new_media', function () {
    this.render('add_new_media');
});
