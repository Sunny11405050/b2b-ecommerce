$(document).on('click', '.customSettings', function(){
    // console.log('customSettings');
    var rightsidebar = $('#rightsidebar').attr('class');
    if(rightsidebar==='right-sidebar'){
        $('body').css('overflow','auto')
    }
    else{
        // $('#salesdata').css({'overflow':'auto', 'height':'100vh'})
        $('body').css('overflow','hidden')
    }
})
$(document).on('click', '.overlay', function(){
    $('body').css('overflow','auto');
})