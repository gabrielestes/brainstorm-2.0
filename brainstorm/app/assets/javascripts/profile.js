$('.profile-container').on('click', 'img.edit', function() {
    $('.edit-info, .profile-container').addClass('active');
    $('.user-info').addClass('inactive');
});
$('.profile-container').on('click', 'img.save', function() {
    $('form').submit();
    $('.edit-info').removeClass('active');
    $('.user-info').removeClass('inactive');
});
